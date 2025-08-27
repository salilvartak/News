import { Article, NewsCategory, Sentiment } from '../types/news';

interface KeywordWeights {
  high_priority: number;
  medium_priority: number;
  low_priority: number;
}

interface CategoryKeywords {
  high_priority: string[];
  medium_priority: string[];
  low_priority: string[];
}

const KEYWORD_WEIGHTS: KeywordWeights = {
  high_priority: 3.0,
  medium_priority: 2.0,
  low_priority: 1.0
};

const CATEGORY_KEYWORDS: Record<NewsCategory, CategoryKeywords> = {
  [NewsCategory.FINANCE]: {
    high_priority: ['federal reserve', 'interest rates', 'stock market', 'cryptocurrency', 'banking'],
    medium_priority: ['investment', 'economy', 'inflation', 'GDP', 'earnings'],
    low_priority: ['trading', 'currency', 'bonds', 'commodities', 'financial']
  },
  [NewsCategory.TECHNOLOGY]: {
    high_priority: ['artificial intelligence', 'quantum computing', 'breakthrough', 'innovation'],
    medium_priority: ['startup', 'tech stocks', 'cybersecurity', 'data breach', 'automation'],
    low_priority: ['software', 'hardware', 'internet', 'digital', 'computing']
  },
  [NewsCategory.WORLD_NEWS]: {
    high_priority: ['climate summit', 'global agreement', 'international', 'trade war'],
    medium_priority: ['european union', 'trade agreement', 'diplomatic', 'treaty'],
    low_priority: ['foreign', 'international', 'global', 'worldwide', 'overseas']
  },
  [NewsCategory.TOP_STORIES]: {
    high_priority: ['breaking', 'historic', 'milestone', 'unprecedented'],
    medium_priority: ['major', 'significant', 'important', 'critical'],
    low_priority: ['news', 'report', 'update', 'announcement', 'development']
  },
  [NewsCategory.HEALTH]: {
    high_priority: ['breakthrough', 'clinical trials', 'medical breakthrough', 'cure'],
    medium_priority: ['treatment', 'healthcare', 'research', 'study'],
    low_priority: ['medical', 'health', 'wellness', 'patient', 'hospital']
  },
  [NewsCategory.POLITICS]: {
    high_priority: ['presidential election', 'campaign', 'voting', 'legislation'],
    medium_priority: ['political', 'government', 'policy', 'congress'],
    low_priority: ['politician', 'party', 'debate', 'poll', 'candidate']
  }
};

const SENTIMENT_KEYWORDS = {
  positive: [
    'breakthrough', 'success', 'growth', 'improvement', 'achievement', 'milestone',
    'recovery', 'promising', 'optimistic', 'surge', 'rally', 'gains', 'progress'
  ],
  negative: [
    'crisis', 'decline', 'collapse', 'threat', 'risk', 'concern', 'breach',
    'disruption', 'volatility', 'uncertainty', 'headwinds', 'challenges', 'problems'
  ]
};

export class NewsFilter {
  calculateRelevanceScore(article: Article): number {
    let score = 0;
    const textContent = `${article.title} ${article.content}`.toLowerCase();
    
    const categoryKeywords = CATEGORY_KEYWORDS[article.category] || {
      high_priority: [],
      medium_priority: [],
      low_priority: []
    };
    
    // Score based on keyword matches
    Object.entries(categoryKeywords).forEach(([priority, keywords]) => {
      const weight = KEYWORD_WEIGHTS[priority as keyof KeywordWeights] || 1.0;
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
        const matches = (textContent.match(regex) || []).length;
        score += matches * weight;
      });
    });
    
    // Bonus for title keywords
    const titleLower = article.title.toLowerCase();
    Object.entries(categoryKeywords).forEach(([priority, keywords]) => {
      const weight = KEYWORD_WEIGHTS[priority as keyof KeywordWeights] || 1.0;
      keywords.forEach(keyword => {
        if (titleLower.includes(keyword.toLowerCase())) {
          score += weight * 1.5;
        }
      });
    });
    
    // Normalize score by content length
    if (article.content.length > 0) {
      score = score / (article.content.length / 100);
    }
    
    return Math.round(score * 100) / 100;
  }
  
  analyzeSentiment(article: Article): Sentiment {
    const textContent = `${article.title} ${article.content}`.toLowerCase();
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    SENTIMENT_KEYWORDS.positive.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
      positiveScore += (textContent.match(regex) || []).length;
    });
    
    SENTIMENT_KEYWORDS.negative.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'g');
      negativeScore += (textContent.match(regex) || []).length;
    });
    
    if (positiveScore > negativeScore) {
      return Sentiment.POSITIVE;
    } else if (negativeScore > positiveScore) {
      return Sentiment.NEGATIVE;
    } else {
      return Sentiment.NEUTRAL;
    }
  }
  
  calculateSimilarity(article1: Article, article2: Article): number {
    const titleSimilarity = this.stringSimilarity(
      article1.title.toLowerCase(),
      article2.title.toLowerCase()
    );
    
    const content1 = article1.content.substring(0, 200).toLowerCase();
    const content2 = article2.content.substring(0, 200).toLowerCase();
    const contentSimilarity = this.stringSimilarity(content1, content2);
    
    return titleSimilarity * 0.7 + contentSimilarity * 0.3;
  }
  
  private stringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }
  
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }
  
  removeDuplicates(articles: Article[]): Article[] {
    const filtered: Article[] = [];
    const SIMILARITY_THRESHOLD = 0.7;
    
    for (const article of articles) {
      let isDuplicate = false;
      
      for (const existing of filtered) {
        if (this.calculateSimilarity(article, existing) >= SIMILARITY_THRESHOLD) {
          isDuplicate = true;
          // Keep the one with higher relevance score
          if (article.relevanceScore > existing.relevanceScore) {
            const index = filtered.indexOf(existing);
            filtered[index] = article;
          }
          break;
        }
      }
      
      if (!isDuplicate) {
        filtered.push(article);
      }
    }
    
    return filtered;
  }
  
  processArticles(articles: Article[]): Article[] {
    const processedArticles = articles.map(article => ({
      ...article,
      relevanceScore: this.calculateRelevanceScore(article),
      sentiment: this.analyzeSentiment(article),
      processed: true
    }));
    
    const filteredArticles = this.removeDuplicates(processedArticles);
    
    return filteredArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
}