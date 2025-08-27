"""
Magazine compilation and output generation.
"""
import logging
from typing import List, Dict
from datetime import datetime
from collections import defaultdict
from models import Article, NewsCategory, Sentiment
from config import HTML_TEMPLATE, MAX_SUMMARY_LENGTH, ARTICLES_PER_SECTION

logger = logging.getLogger(__name__)

class MagazineCompiler:
    """Compiles filtered articles into a structured magazine format."""
    
    def __init__(self):
        self.sections: Dict[NewsCategory, List[Article]] = defaultdict(list)
        self.section_summaries: Dict[NewsCategory, str] = {}
    
    def organize_by_category(self, articles: List[Article]) -> Dict[NewsCategory, List[Article]]:
        """Organize articles by category and limit per section."""
        sections = defaultdict(list)
        
        for article in articles:
            if len(sections[article.category]) < ARTICLES_PER_SECTION:
                sections[article.category].append(article)
        
        # Sort articles within each category by relevance score
        for category in sections:
            sections[category].sort(key=lambda x: x.relevance_score, reverse=True)
        
        self.sections = sections
        return sections
    
    def generate_section_summary(self, articles: List[Article]) -> str:
        """Generate a 2-3 sentence summary for a section."""
        if not articles:
            return "No articles available for this section."
        
        # Get top articles for summary
        top_articles = articles[:3]
        
        # Extract key themes from top articles
        key_topics = []
        total_positive = sum(1 for a in articles if a.sentiment == Sentiment.POSITIVE)
        total_negative = sum(1 for a in articles if a.sentiment == Sentiment.NEGATIVE)
        
        for article in top_articles:
            # Extract first sentence or key phrase from title
            title_words = article.title.split()[:8]  # First 8 words
            key_topics.append(' '.join(title_words))
        
        # Construct summary
        if len(articles) == 1:
            summary = f"Featured story: {articles[0].title}."
        else:
            summary = f"This section covers {len(articles)} stories including developments in "
            summary += f"{', '.join(key_topics[:2])}."
            
            if total_positive > total_negative:
                summary += " Overall sentiment is positive with promising developments."
            elif total_negative > total_positive:
                summary += " Several challenges and concerns are highlighted."
            else:
                summary += " Coverage presents balanced perspectives on current events."
        
        # Trim to max length
        if len(summary) > MAX_SUMMARY_LENGTH:
            summary = summary[:MAX_SUMMARY_LENGTH-3] + "..."
        
        return summary
    
    def compile_magazine(self, articles: List[Article]) -> Dict:
        """Compile articles into magazine format."""
        logger.info("Starting magazine compilation")
        
        # Organize articles by category
        sections = self.organize_by_category(articles)
        
        # Generate section summaries
        for category, section_articles in sections.items():
            self.section_summaries[category] = self.generate_section_summary(section_articles)
        
        # Create magazine structure
        magazine = {
            'title': 'Daily News Digest',
            'date': datetime.now().strftime('%B %d, %Y'),
            'total_articles': len(articles),
            'sections': {}
        }
        
        # Add sections in priority order
        section_priority = [
            NewsCategory.TOP_STORIES,
            NewsCategory.FINANCE,
            NewsCategory.TECHNOLOGY,
            NewsCategory.WORLD_NEWS,
            NewsCategory.POLITICS,
            NewsCategory.HEALTH
        ]
        
        for category in section_priority:
            if category in sections:
                magazine['sections'][category.value] = {
                    'summary': self.section_summaries[category],
                    'articles': [article.to_dict() for article in sections[category]],
                    'article_count': len(sections[category])
                }
        
        logger.info(f"Magazine compilation completed with {len(sections)} sections")
        return magazine
    
    def format_console_output(self, magazine: Dict) -> str:
        """Format magazine content for console display."""
        output = []
        output.append("=" * 80)
        output.append(f"📰 {magazine['title'].upper()}")
        output.append(f"📅 {magazine['date']}")
        output.append(f"📊 Total Articles: {magazine['total_articles']}")
        output.append("=" * 80)
        
        for section_name, section_data in magazine['sections'].items():
            output.append("")
            output.append(f"🔹 {section_name.upper()}")
            output.append("-" * 40)
            
            # Section summary
            output.append(f"📝 Summary: {section_data['summary']}")
            output.append("")
            
            # Articles
            for i, article_data in enumerate(section_data['articles'], 1):
                sentiment_emoji = {
                    'positive': '😊',
                    'negative': '😟',
                    'neutral': '😐'
                }
                
                output.append(f"{i}. {article_data['title']}")
                output.append(f"   📰 Source: {article_data['source']} | "
                            f"🎯 Relevance: {article_data['relevance_score']:.2f} | "
                            f"{sentiment_emoji[article_data['sentiment']]} {article_data['sentiment'].title()}")
                output.append(f"   📄 {article_data['content'][:150]}...")
                if article_data['keywords']:
                    output.append(f"   🔑 Keywords: {', '.join(article_data['keywords'][:5])}")
                output.append("")
        
        output.append("=" * 80)
        return '\n'.join(output)
    
    def format_html_output(self, magazine: Dict) -> str:
        """Format magazine content as HTML."""
        content_parts = []
        
        # Header
        content_parts.append('<div class="header">')
        content_parts.append(f'<h1>📰 {magazine["title"]}</h1>')
        content_parts.append(f'<div class="date">{magazine["date"]} | Total Articles: {magazine["total_articles"]}</div>')
        content_parts.append('</div>')
        
        # Sections
        for section_name, section_data in magazine['sections'].items():
            content_parts.append('<div class="section">')
            content_parts.append(f'<h2 class="section-title">🔹 {section_name}</h2>')
            
            # Section summary
            content_parts.append(f'<div class="summary">{section_data["summary"]}</div>')
            
            # Articles
            for article_data in section_data['articles']:
                content_parts.append('<div class="article">')
                
                # Title and meta
                content_parts.append(f'<div class="article-title">{article_data["title"]}</div>')
                content_parts.append(
                    f'<div class="article-meta">'
                    f'📰 {article_data["source"]} | '
                    f'📅 {datetime.fromisoformat(article_data["publication_date"]).strftime("%B %d, %Y %H:%M")}'
                    f'<span class="relevance-score">Score: {article_data["relevance_score"]:.2f}</span>'
                    f'</div>'
                )
                
                # Content
                content_parts.append(f'<div class="article-content">{article_data["content"]}</div>')
                
                # Tags
                if article_data['keywords']:
                    content_parts.append('<div class="tags">')
                    for keyword in article_data['keywords'][:5]:
                        content_parts.append(f'<span class="tag">{keyword}</span>')
                    
                    # Sentiment tag
                    sentiment = article_data['sentiment']
                    content_parts.append(f'<span class="tag sentiment-{sentiment}">{sentiment.title()}</span>')
                    content_parts.append('</div>')
                
                content_parts.append('</div>')  # Close article
            
            content_parts.append('</div>')  # Close section
        
        return HTML_TEMPLATE.format(
            date=magazine['date'],
            content=''.join(content_parts)
        )
    
    def export_magazine(self, magazine: Dict, format_type: str = 'console') -> str:
        """Export magazine in specified format."""
        if format_type == 'html':
            return self.format_html_output(magazine)
        else:
            return self.format_console_output(magazine)