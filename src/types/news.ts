export enum NewsCategory {
  FINANCE = "Finance",
  MARKETS = "Markets",
  BANKING = "Banking",
  INVESTMENTS = "Investments",
  ECONOMICS = "Economics",
  CORPORATE = "Corporate"
}

export enum Sentiment {
  POSITIVE = "positive",
  NEGATIVE = "negative",
  NEUTRAL = "neutral"
}

export interface Article {
  id: string;
  title: string;
  source: string;
  publicationDate: Date;
  content: string;
  category: NewsCategory;
  keywords: string[];
  url?: string;
  relevanceScore: number;
  sentiment: Sentiment;
  processed: boolean;
}

export interface NewsSource {
  name: string;
  reliabilityScore: number;
  categories: NewsCategory[];
  articlesFetched: number;
}

export interface MagazineSection {
  summary: string;
  articles: Article[];
  articleCount: number;
}

export interface Magazine {
  title: string;
  date: string;
  totalArticles: number;
  sections: Record<string, MagazineSection>;
}