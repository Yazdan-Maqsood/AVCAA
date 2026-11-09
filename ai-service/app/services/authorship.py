import math
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class AuthorshipVerifier:
    def __init__(self):
        # In a real system, you'd load CodeBERT embeddings here
        # For this MVP, we'll use a heuristic + TF-IDF approach
        pass

    def calculate_ai_probability(self, code: str) -> float:
        """
        Heuristic to detect AI-generated code based on patterns.
        AI code often has:
        - Very descriptive variable names
        - Perfect indentation
        - Fewer comments relative to complexity
        """
        score = 50.0 # Base score
        
        # 1. Check for overly generic names
        generic_ai_names = ["result", "data", "temp", "value", "item", "response"]
        for name in generic_ai_names:
            if name in code:
                score += 5.0
                
        # 2. Check for lack of comments
        lines = [l for l in code.split('\n') if l.strip()]
        comments = [l for l in lines if l.strip().startswith('#') or l.strip().startswith('//')]
        
        if len(lines) > 20 and len(comments) == 0:
            score += 15.0
            
        # 3. Check for AI-like patterns (e.g. try-except blocks without reason)
        if "try:" in code and "except Exception" in code:
            score += 10.0
            
        # Cap at 95%
        return min(score, 95.0)

    def calculate_similarity(self, code1: str, code2: str) -> float:
        """Cosine similarity between two code snippets"""
        vectorizer = TfidfVectorizer(token_pattern=r"(?u)\b\w+\b")
        try:
            tfidf = vectorizer.fit_transform([code1, code2])
            return cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0] * 100
        except ValueError:
            return 0.0