import { Article, NewsCategory, Magazine, MagazineSection, Sentiment } from '../types/news';

export class MagazineCompiler {
  private readonly ARTICLES_PER_SECTION = 5;
  private readonly MAX_SUMMARY_LENGTH = 150;
  
  organizeByCategory(articles: Article[]): Record<NewsCategory, Article[]> {
    const sections: Record<NewsCategory, Article[]> = {} as Record<NewsCategory, Article[]>;
    
    // Initialize all categories
    Object.values(NewsCategory).forEach(category => {
      sections[category] = [];
    });
    
    // Group articles by category
    articles.forEach(article => {
      if (sections[article.category].length < this.ARTICLES_PER_SECTION) {
        sections[article.category].push(article);
      }
    });
    
    // Sort articles within each category by relevance score
    Object.keys(sections).forEach(category => {
      sections[category as NewsCategory].sort((a, b) => b.relevanceScore - a.relevanceScore);
    });
    
    return sections;
  }
  
  generateSectionSummary(articles: Article[]): string {
    if (articles.length === 0) {
      return "No articles available for this section.";
    }
    
    const topArticles = articles.slice(0, 3);
    const totalPositive = articles.filter(a => a.sentiment === Sentiment.POSITIVE).length;
    const totalNegative = articles.filter(a => a.sentiment === Sentiment.NEGATIVE).length;
    
    let summary = '';
    
    if (articles.length === 1) {
      summary = `Featured story: ${articles[0].title}.`;
    } else {
      const keyTopics = topArticles.map(article => 
        article.title.split(' ').slice(0, 8).join(' ')
      );
      
      summary = `This section covers ${articles.length} stories including developments in ${keyTopics.slice(0, 2).join(', ')}.`;
      
      if (totalPositive > totalNegative) {
        summary += " Overall sentiment is positive with promising developments.";
      } else if (totalNegative > totalPositive) {
        summary += " Several challenges and concerns are highlighted.";
      } else {
        summary += " Coverage presents balanced perspectives on current events.";
      }
    }
    
    if (summary.length > this.MAX_SUMMARY_LENGTH) {
      summary = summary.substring(0, this.MAX_SUMMARY_LENGTH - 3) + "...";
    }
    
    return summary;
  }
  
  compileMagazine(articles: Article[]): Magazine {
    const sections = this.organizeByCategory(articles);
    const magazineSections: Record<string, MagazineSection> = {};
    
    // Section priority order
    const sectionPriority = [
      NewsCategory.TOP_STORIES,
      NewsCategory.FINANCE,
      NewsCategory.TECHNOLOGY,
      NewsCategory.WORLD_NEWS,
      NewsCategory.POLITICS,
      NewsCategory.HEALTH
    ];
    
    sectionPriority.forEach(category => {
      if (sections[category] && sections[category].length > 0) {
        magazineSections[category] = {
          summary: this.generateSectionSummary(sections[category]),
          articles: sections[category],
          articleCount: sections[category].length
        };
      }
    });
    
    return {
      title: 'Daily News Digest',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      totalArticles: articles.length,
      sections: magazineSections
    };
  }
}