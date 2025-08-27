"""
News filtering and processing engine.
"""
import re
import logging
from typing import List, Dict, Set
from difflib import SequenceMatcher
from models import Article, Sentiment, NewsCategory
from config import CATEGORY_KEYWORDS, KEYWORD_WEIGHTS, SENTIMENT_KEYWORDS, SIMILARITY_THRESHOLD

logger = logging.getLogger(__name__)

class NewsFilter:
    """Handles filtering and processing of news articles."""
    
    def __init__(self):
        self.processed_articles: List[Article] = []
        self.duplicate_groups: List[List[Article]] = []
    
    def calculate_relevance_score(self, article: Article) -> float:
        """Calculate relevance score based on keyword frequency and importance."""
        score = 0.0
        text_content = f"{article.title} {article.content}".lower()
        
        # Get category-specific keywords
        category_keywords = CATEGORY_KEYWORDS.get(article.category, {})
        
        # Score based on keyword matches
        for priority, keywords in category_keywords.items():
            weight = KEYWORD_WEIGHTS.get(priority, 1.0)
            for keyword in keywords:
                # Count occurrences of keyword
                matches = len(re.findall(rf'\b{re.escape(keyword.lower())}\b', text_content))
                score += matches * weight
        
        # Bonus for title keywords
        title_lower = article.title.lower()
        for priority, keywords in category_keywords.items():
            weight = KEYWORD_WEIGHTS.get(priority, 1.0)
            for keyword in keywords:
                if keyword.lower() in title_lower:
                    score += weight * 1.5  # Title keywords are more important
        
        # Normalize score by content length
        if len(article.content) > 0:
            score = score / (len(article.content) / 100)  # Normalize per 100 characters
        
        return round(score, 2)
    
    def analyze_sentiment(self, article: Article) -> Sentiment:
        """Analyze sentiment of the article content."""
        text_content = f"{article.title} {article.content}".lower()
        
        positive_score = 0
        negative_score = 0
        
        # Count positive keywords
        for keyword in SENTIMENT_KEYWORDS['positive']:
            positive_score += len(re.findall(rf'\b{re.escape(keyword.lower())}\b', text_content))
        
        # Count negative keywords
        for keyword in SENTIMENT_KEYWORDS['negative']:
            negative_score += len(re.findall(rf'\b{re.escape(keyword.lower())}\b', text_content))
        
        # Determine sentiment
        if positive_score > negative_score:
            return Sentiment.POSITIVE
        elif negative_score > positive_score:
            return Sentiment.NEGATIVE
        else:
            return Sentiment.NEUTRAL
    
    def calculate_similarity(self, article1: Article, article2: Article) -> float:
        """Calculate similarity between two articles."""
        # Compare titles
        title_similarity = SequenceMatcher(None, article1.title.lower(), article2.title.lower()).ratio()
        
        # Compare content (first 200 characters for efficiency)
        content1 = article1.content[:200].lower()
        content2 = article2.content[:200].lower()
        content_similarity = SequenceMatcher(None, content1, content2).ratio()
        
        # Weighted average (titles are more important)
        similarity = (title_similarity * 0.7) + (content_similarity * 0.3)
        
        return similarity
    
    def detect_duplicates(self, articles: List[Article]) -> List[List[Article]]:
        """Detect duplicate articles based on similarity."""
        duplicate_groups = []
        processed_indices = set()
        
        for i, article1 in enumerate(articles):
            if i in processed_indices:
                continue
                
            duplicate_group = [article1]
            processed_indices.add(i)
            
            for j, article2 in enumerate(articles[i+1:], i+1):
                if j in processed_indices:
                    continue
                    
                similarity = self.calculate_similarity(article1, article2)
                if similarity >= SIMILARITY_THRESHOLD:
                    duplicate_group.append(article2)
                    processed_indices.add(j)
            
            if len(duplicate_group) > 1:
                duplicate_groups.append(duplicate_group)
        
        return duplicate_groups
    
    def remove_duplicates(self, articles: List[Article]) -> List[Article]:
        """Remove duplicate articles, keeping the highest scoring one from each group."""
        duplicate_groups = self.detect_duplicates(articles)
        self.duplicate_groups = duplicate_groups
        
        # Create set of articles to remove
        articles_to_remove = set()
        for group in duplicate_groups:
            # Sort by relevance score and keep the highest
            group.sort(key=lambda x: x.relevance_score, reverse=True)
            best_article = group[0]
            
            # Mark others for removal
            for article in group[1:]:
                articles_to_remove.add(id(article))
                logger.info(f"Removing duplicate article: '{article.title}' (similar to '{best_article.title}')")
        
        # Return filtered list
        filtered_articles = [article for article in articles if id(article) not in articles_to_remove]
        return filtered_articles
    
    def filter_by_keywords(self, articles: List[Article], keywords: List[str]) -> List[Article]:
        """Filter articles that contain specific keywords."""
        if not keywords:
            return articles
        
        filtered_articles = []
        keywords_lower = [kw.lower() for kw in keywords]
        
        for article in articles:
            text_content = f"{article.title} {article.content}".lower()
            
            # Check if any keyword is present
            for keyword in keywords_lower:
                if keyword in text_content:
                    filtered_articles.append(article)
                    break
        
        return filtered_articles
    
    def filter_by_category(self, articles: List[Article], categories: List[NewsCategory]) -> List[Article]:
        """Filter articles by category."""
        if not categories:
            return articles
        
        return [article for article in articles if article.category in categories]
    
    def filter_by_source(self, articles: List[Article], sources: List[str]) -> List[Article]:
        """Filter articles by news source."""
        if not sources:
            return articles
        
        return [article for article in articles if article.source in sources]
    
    def process_articles(self, articles: List[Article], 
                        keyword_filter: List[str] = None,
                        category_filter: List[NewsCategory] = None,
                        source_filter: List[str] = None,
                        remove_duplicates: bool = True) -> List[Article]:
        """Process articles through the complete filtering pipeline."""
        
        logger.info(f"Starting processing of {len(articles)} articles")
        
        # Apply filters
        filtered_articles = articles.copy()
        
        if keyword_filter:
            filtered_articles = self.filter_by_keywords(filtered_articles, keyword_filter)
            logger.info(f"After keyword filtering: {len(filtered_articles)} articles")
        
        if category_filter:
            filtered_articles = self.filter_by_category(filtered_articles, category_filter)
            logger.info(f"After category filtering: {len(filtered_articles)} articles")
        
        if source_filter:
            filtered_articles = self.filter_by_source(filtered_articles, source_filter)
            logger.info(f"After source filtering: {len(filtered_articles)} articles")
        
        # Calculate relevance scores and sentiment
        for article in filtered_articles:
            article.relevance_score = self.calculate_relevance_score(article)
            article.sentiment = self.analyze_sentiment(article)
            article.processed = True
        
        # Remove duplicates if requested
        if remove_duplicates:
            filtered_articles = self.remove_duplicates(filtered_articles)
            logger.info(f"After duplicate removal: {len(filtered_articles)} articles")
        
        # Sort by relevance score
        filtered_articles.sort(key=lambda x: x.relevance_score, reverse=True)
        
        self.processed_articles = filtered_articles
        logger.info("Article processing completed")
        
        return filtered_articles