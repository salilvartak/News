"""
News aggregation system models and core data structures.
"""
from datetime import datetime
from typing import List, Dict, Optional
from enum import Enum

class Sentiment(Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"

class NewsCategory(Enum):
    TOP_STORIES = "Top Stories"
    FINANCE = "Finance"
    TECHNOLOGY = "Technology"
    WORLD_NEWS = "World News"
    POLITICS = "Politics"
    HEALTH = "Health"

class Article:
    """Represents a news article with all relevant metadata."""
    
    def __init__(self, title: str, source: str, publication_date: datetime, 
                 content: str, category: NewsCategory, keywords: List[str], 
                 url: str = ""):
        self.title = title
        self.source = source
        self.publication_date = publication_date
        self.content = content
        self.category = category
        self.keywords = keywords
        self.url = url
        self.relevance_score = 0.0
        self.sentiment = Sentiment.NEUTRAL
        self.processed = False
    
    def __str__(self) -> str:
        return f"{self.title} - {self.source} ({self.publication_date.strftime('%Y-%m-%d')})"
    
    def __repr__(self) -> str:
        return f"Article(title='{self.title}', source='{self.source}', category='{self.category.value}')"
    
    def to_dict(self) -> Dict:
        """Convert article to dictionary for serialization."""
        return {
            'title': self.title,
            'source': self.source,
            'publication_date': self.publication_date.isoformat(),
            'content': self.content,
            'category': self.category.value,
            'keywords': self.keywords,
            'url': self.url,
            'relevance_score': self.relevance_score,
            'sentiment': self.sentiment.value,
            'processed': self.processed
        }

class NewsSource:
    """Represents a news source with its characteristics."""
    
    def __init__(self, name: str, reliability_score: float, categories: List[NewsCategory]):
        self.name = name
        self.reliability_score = reliability_score  # 0.0 to 1.0
        self.categories = categories
        self.articles_fetched = 0
    
    def __str__(self) -> str:
        return f"{self.name} (Reliability: {self.reliability_score})"
    
    def can_provide_category(self, category: NewsCategory) -> bool:
        """Check if this source provides articles for a given category."""
        return category in self.categories