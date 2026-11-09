import json
import random
import re

from openai import OpenAI, OpenAIError

from app.core.config import settings
from app.core.logger import logger
from app.services.ast_parser import CodeParser


class VivaGenerator:
    def __init__(self):
        self.parser = CodeParser()
        self.client = None

        if settings.OPENAI_API_KEY and settings.OPENAI_API_KEY != "dummy_key_if_not_set":
            client_options = {"api_key": settings.OPENAI_API_KEY}
            if settings.OPENAI_API_BASE:
                client_options["base_url"] = settings.OPENAI_API_BASE
            self.client = OpenAI(**client_options)

    def generate_questions(
        self,
        code: str,
        analysis_data: dict = None,
        num: int = 3,
        language: str = "python",
    ) -> list:
        if num < 1 or num > 3:
            raise ValueError("num must be between 1 and 3")

        language = (language or "python").lower()
        structure = self.parser.extract_structure(code, language)
        if self.client:
            try:
                return self._generate_with_llm(code, language, structure, num)
            except (OpenAIError, ValueError, KeyError, TypeError) as error:
                logger.warning("LLM viva generation failed; using code-aware fallback: %s", error)
        else:
            logger.info("OPENAI_API_KEY is not configured; using code-aware viva questions")

        return self._generate_fallback(structure, num)

    def _generate_with_llm(self, code: str, language: str, structure: dict, num: int) -> list:
        prompt = self._build_prompt(code, language, structure, num)
        response = self.client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9,
        )
        content = response.choices[0].message.content
        if not content:
            raise ValueError("LLM returned an empty response")

        cleaned_content = re.sub(r"^```(?:json)?\s*|\s*```$", "", content.strip(), flags=re.IGNORECASE)
        try:
            payload = json.loads(cleaned_content)
        except json.JSONDecodeError:
            match = re.search(r"\[[\s\S]*\]|\{[\s\S]*\}", cleaned_content)
            if not match:
                raise ValueError("LLM response did not contain JSON questions")
            payload = json.loads(match.group(0))

        if isinstance(payload, list):
            questions = payload
        elif isinstance(payload, dict):
            questions = payload.get("questions")
        else:
            raise ValueError("LLM response must be a JSON array or object")
        if not isinstance(questions, list):
            raise ValueError("LLM response must contain a questions array")

        required_difficulties = ["Basic", "Intermediate", "Advanced"][:num]
        normalized_questions = []
        seen_texts = set()
        for difficulty in required_difficulties:
            matching_questions = [
                question
                for question in questions
                if isinstance(question, dict)
                and str(question.get("difficulty", "")).lower() == difficulty.lower()
            ]
            for question in matching_questions:
                text = question.get("text")
                if not isinstance(text, str) or not text.strip():
                    continue
                normalized_text = re.sub(r"\W+", "", text).lower()
                if normalized_text in seen_texts:
                    continue
                seen_texts.add(normalized_text)
                normalized_questions.append(
                    {
                        "text": text.strip(),
                        "difficulty": difficulty,
                        "topic": str(question.get("topic") or "Code comprehension"),
                    }
                )
                break

        if len(normalized_questions) != num:
            raise ValueError("LLM did not return one distinct question per difficulty")
        return normalized_questions

    def _generate_fallback(self, structure: dict, num: int) -> list:
        functions = structure.get("functions", [])
        classes = structure.get("classes", [])
        function_name = self._extract_name(functions[0], "function") if functions else None
        class_name = self._extract_name(classes[0], "class") if classes else None

        basic_questions = []
        if function_name:
            basic_questions.append(
                {
                    "text": f"What is the main responsibility of `{function_name}` in this code?",
                    "topic": "Functions",
                }
            )
        if class_name:
            basic_questions.append(
                {"text": f"What role does the `{class_name}` class play in this implementation?", "topic": "Classes"}
            )
        basic_questions.extend(
            [
                {"text": "Walk through the main execution path and explain how its result is produced.", "topic": "Program flow"},
                {"text": "What inputs does this code expect, and what output or side effect does it produce?", "topic": "Inputs and outputs"},
                {"text": "Which part of this implementation is most important to its overall behavior, and why?", "topic": "Code comprehension"},
            ]
        )

        intermediate_questions = []
        if structure.get("loops_count", 0):
            intermediate_questions.extend(
                [
                    {"text": "How many times can the loop execute, and what determines when it stops?", "topic": "Loops"},
                    {"text": "How would the work performed by the loop change as the input grows?", "topic": "Complexity"},
                ]
            )
        if structure.get("conditionals_count", 0):
            intermediate_questions.append(
                {"text": "How do the conditional branches affect the result for different inputs?", "topic": "Conditionals"}
            )
        if function_name:
            intermediate_questions.append(
                {"text": f"How would you test `{function_name}` with both typical and boundary inputs?", "topic": "Testing"}
            )
        intermediate_questions.extend(
            [
                {"text": "Trace one representative input through the code and explain the key state changes.", "topic": "Execution trace"},
                {"text": "What assumption does this implementation make that could cause an incorrect result?", "topic": "Correctness"},
                {"text": "Which part of the code would be hardest to maintain, and how would you simplify it?", "topic": "Maintainability"},
            ]
        )

        advanced_questions = [
            {"text": "How would you change this implementation to handle empty or malformed inputs safely?", "topic": "Edge cases"},
            {"text": "How would you redesign this code if the input size became much larger?", "topic": "Scalability"},
            {"text": "What is the main performance bottleneck here, and how could you measure and improve it?", "topic": "Performance"},
            {"text": "What could fail if this code runs concurrently, and how would you prevent it?", "topic": "Concurrency"},
            {"text": "How would you reduce the coupling in this implementation without changing its behavior?", "topic": "Architecture"},
        ]

        question_groups = [basic_questions, intermediate_questions, advanced_questions]
        difficulties = ["Basic", "Intermediate", "Advanced"]
        selected = []
        seen_texts = set()

        for difficulty, candidates in zip(difficulties[:num], question_groups[:num]):
            candidates = candidates.copy()
            random.shuffle(candidates)
            question = next(
                (
                    candidate
                    for candidate in candidates
                    if candidate["text"].lower() not in seen_texts
                ),
                None,
            )
            if question is None:
                raise ValueError(f"No unique fallback question available for {difficulty}")
            seen_texts.add(question["text"].lower())
            selected.append({**question, "difficulty": difficulty})

        return selected

    @staticmethod
    def _extract_name(declaration: str, kind: str) -> str:
        if kind == "function":
            patterns = (r"\bdef\s+([A-Za-z_]\w*)", r"\bfunction\s+([A-Za-z_$][\w$]*)", r"\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=")
        else:
            patterns = (r"\bclass\s+([A-Za-z_]\w*)",)

        for pattern in patterns:
            match = re.search(pattern, declaration)
            if match:
                return match.group(1)
        return declaration.strip()[:50]

    @staticmethod
    def _build_prompt(code: str, language: str, structure: dict, num: int) -> str:
        return f"""
You are an examiner creating a viva for the specific student code below.
Write exactly {num} distinct, code-specific questions. Do not reuse generic canned questions.
Use these difficulty levels in order: {", ".join(["Basic", "Intermediate", "Advanced"][:num])}.
Each question must refer to an actual function, class, condition, loop, data flow, or behavior visible in the code.
Questions must test different concepts and must not be paraphrases of one another.
Return only a JSON array with objects containing "text", "difficulty", and "topic".

Language: {language}
Parsed code structure: {json.dumps(structure, ensure_ascii=True)}
Student code:
```{language}
{code[:6000]}
```
"""
