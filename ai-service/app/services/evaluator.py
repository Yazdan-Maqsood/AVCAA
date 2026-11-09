from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class AnswerEvaluator:
    def evaluate(self, question: str, student_answer: str, code_context: str):
        """Evaluates the answer against the code context"""
        
        # 1. Semantic Similarity (Simplified)
        # In real world, use Sentence-BERT embeddings here
        similarity_score = self._calculate_similarity(student_answer, code_context)
        
        # 2. Keyword Matching
        keywords = self._extract_keywords(code_context)
        keyword_hits = sum(1 for kw in keywords if kw.lower() in student_answer.lower())
        keyword_score = min(100, (keyword_hits / max(len(keywords), 1)) * 100) if keywords else 50
        
        # 3. Combine scores
        final_score = (similarity_score * 0.3) + (keyword_score * 0.7)
        
        # 4. Generate Feedback
        feedback = "Your answer looks decent."
        if final_score < 40:
            feedback = "Your answer is not consistent with your code. Please explain your logic more clearly."
        elif final_score > 80:
            feedback = "Excellent! You clearly understand your implementation."

        return {
            "score": round(final_score, 2),
            "feedback": feedback,
            "is_consistent": final_score > 50
        }

    def _calculate_similarity(self, text1: str, text2: str) -> float:
        vectorizer = TfidfVectorizer(stop_words='english')
        try:
            tfidf = vectorizer.fit_transform([text1, text2])
            return cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0] * 100
        except ValueError:
            return 0.0

    def _extract_keywords(self, code: str) -> list:
        # Simple keyword extraction from code (e.g., variable names)
        import re
        words = re.findall(r'\b[a-zA-Z_]\w*\b', code)
        # Filter out common Python keywords
        keywords = [w for w in set(words) if w not in ['def', 'for', 'while', 'if', 'else', 'return', 'import', 'class']]
        return keywords[:10]