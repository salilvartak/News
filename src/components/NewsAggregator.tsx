import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, Globe, Cpu, Building, Heart, Users, Clock, Target, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { generateSampleArticles, getNewsSources } from '../data/sampleArticles';
import { NewsFilter } from '../services/newsFilter';
import { MagazineCompiler } from '../services/magazineCompiler';
import { Article, Magazine, NewsCategory, Sentiment } from '../types/news';

const categoryIcons = {
  [NewsCategory.TOP_STORIES]: Users,
  [NewsCategory.FINANCE]: TrendingUp,
  [NewsCategory.TECHNOLOGY]: Cpu,
  [NewsCategory.WORLD_NEWS]: Globe,
  [NewsCategory.POLITICS]: Building,
  [NewsCategory.HEALTH]: Heart
};

const sentimentIcons = {
  [Sentiment.POSITIVE]: ThumbsUp,
  [Sentiment.NEGATIVE]: ThumbsDown,
  [Sentiment.NEUTRAL]: Minus
};

const sentimentColors = {
  [Sentiment.POSITIVE]: 'text-green-600 bg-green-100',
  [Sentiment.NEGATIVE]: 'text-red-600 bg-red-100',
  [Sentiment.NEUTRAL]: 'text-gray-600 bg-gray-100'
};

interface ProcessingStep {
  step: string;
  message: string;
  completed: boolean;
}

export const NewsAggregator: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [magazine, setMagazine] = useState<Magazine | null>(null);
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [statistics, setStatistics] = useState<{
    totalArticles: number;
    duplicatesRemoved: number;
    averageScore: number;
    categoryBreakdown: Record<string, number>;
  } | null>(null);

  const simulateApiDelay = (min: number, max: number) => 
    new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

  const updateProcessingStep = (stepIndex: number, completed: boolean) => {
    setProcessingSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, completed } : step
    ));
  };

  const processNews = async () => {
    setIsProcessing(true);
    setMagazine(null);
    setStatistics(null);
    
    const steps: ProcessingStep[] = [
      { step: "Data Collection", message: "Fetching articles from 10 news sources...", completed: false },
      { step: "Content Analysis", message: "Calculating relevance scores and analyzing sentiment...", completed: false },
      { step: "Duplicate Detection", message: "Identifying and removing duplicate articles...", completed: false },
      { step: "Magazine Compilation", message: "Organizing articles into sections and generating summaries...", completed: false },
      { step: "Output Generation", message: "Creating consumer-ready news digest...", completed: false }
    ];
    
    setProcessingSteps(steps);

    try {
      // Step 1: Simulate data collection
      await simulateApiDelay(1000, 2000);
      const articles = generateSampleArticles();
      const sources = getNewsSources();
      updateProcessingStep(0, true);

      // Step 2: Process articles
      await simulateApiDelay(800, 1500);
      const newsFilter = new NewsFilter();
      const processedArticles = newsFilter.processArticles(articles);
      updateProcessingStep(1, true);

      // Step 3: Remove duplicates (already done in processArticles)
      await simulateApiDelay(500, 1000);
      updateProcessingStep(2, true);

      // Step 4: Compile magazine
      await simulateApiDelay(600, 1200);
      const compiler = new MagazineCompiler();
      const compiledMagazine = compiler.compileMagazine(processedArticles);
      updateProcessingStep(3, true);

      // Step 5: Generate output
      await simulateApiDelay(400, 800);
      setMagazine(compiledMagazine);
      updateProcessingStep(4, true);

      // Calculate statistics
      const duplicatesRemoved = articles.length - processedArticles.length;
      const averageScore = processedArticles.reduce((sum, article) => sum + article.relevanceScore, 0) / processedArticles.length;
      const categoryBreakdown: Record<string, number> = {};
      
      processedArticles.forEach(article => {
        categoryBreakdown[article.category] = (categoryBreakdown[article.category] || 0) + 1;
      });

      setStatistics({
        totalArticles: processedArticles.length,
        duplicatesRemoved,
        averageScore,
        categoryBreakdown
      });

    } catch (error) {
      console.error('Error processing news:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Newspaper className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">News Aggregation System</h1>
                <p className="text-gray-600">Automated news collection, filtering, and compilation</p>
              </div>
            </div>
            <button
              onClick={processNews}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Newspaper className="w-5 h-5" />
              <span>{isProcessing ? 'Processing...' : 'Process News'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Processing Steps */}
        {isProcessing && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Processing Pipeline</h2>
            <div className="space-y-3">
              {processingSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{step.step}</div>
                    <div className="text-sm text-gray-600">{step.message}</div>
                  </div>
                  {!step.completed && isProcessing && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        {statistics && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Processing Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{statistics.totalArticles}</div>
                <div className="text-sm text-gray-600">Total Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">{statistics.duplicatesRemoved}</div>
                <div className="text-sm text-gray-600">Duplicates Removed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{statistics.averageScore.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Avg Relevance Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{Object.keys(statistics.categoryBreakdown).length}</div>
                <div className="text-sm text-gray-600">Active Categories</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-gray-900 mb-3">Articles by Category</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(statistics.categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className="text-sm text-gray-700">{category}</span>
                    <span className="font-medium text-gray-900">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Magazine Output */}
        {magazine && (
          <div className="bg-white rounded-lg shadow-sm">
            {/* Magazine Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">📰 {magazine.title}</h1>
                <div className="text-lg text-gray-600">{magazine.date} | Total Articles: {magazine.totalArticles}</div>
              </div>
            </div>

            {/* Magazine Sections */}
            <div className="p-6">
              {Object.entries(magazine.sections).map(([sectionName, section]) => {
                const IconComponent = categoryIcons[sectionName as NewsCategory];
                
                return (
                  <div key={sectionName} className="mb-12 last:mb-0">
                    {/* Section Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      <h2 className="text-2xl font-bold text-gray-900">{sectionName}</h2>
                    </div>

                    {/* Section Summary */}
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                      <p className="text-gray-700 italic">{section.summary}</p>
                    </div>

                    {/* Articles */}
                    <div className="space-y-6">
                      {section.articles.map((article, index) => {
                        const SentimentIcon = sentimentIcons[article.sentiment];
                        
                        return (
                          <div key={article.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl font-semibold text-gray-900 flex-1 mr-4">
                                {article.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                  <Target className="w-3 h-3" />
                                  <span>{article.relevanceScore.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                              <span className="font-medium">📰 {article.source}</span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDate(article.publicationDate.toISOString())}</span>
                              </span>
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${sentimentColors[article.sentiment]}`}>
                                <SentimentIcon className="w-3 h-3" />
                                <span>{article.sentiment}</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 mb-3">{article.content}</p>
                            
                            {article.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {article.keywords.slice(0, 5).map((keyword, keywordIndex) => (
                                  <span
                                    key={keywordIndex}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                                  >
                                    {keyword}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Extension Guide */}
            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📚 System Extension Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🌐 Real API Integration</h4>
                  <ul className="space-y-1">
                    <li>• Replace sample data with HTTP requests</li>
                    <li>• Implement NewsAPI, Guardian API clients</li>
                    <li>• Add rate limiting and error handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🗄️ Database Integration</h4>
                  <ul className="space-y-1">
                    <li>• Store articles in PostgreSQL/MongoDB</li>
                    <li>• Implement caching mechanisms</li>
                    <li>• Add search and archival capabilities</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🚀 Real-time Processing</h4>
                  <ul className="space-y-1">
                    <li>• Use message queues (Redis, RabbitMQ)</li>
                    <li>• Add scheduled tasks for fetching</li>
                    <li>• Implement incremental updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">🔧 Enhanced NLP</h4>
                  <ul className="space-y-1">
                    <li>• Advanced text analysis with spaCy</li>
                    <li>• Named entity recognition</li>
                    <li>• Topic modeling and clustering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!magazine && !isProcessing && (
          <div className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Process News</h2>
            <p className="text-gray-600 mb-6">
              Click "Process News" to simulate fetching and processing 20 articles from 10 different news sources.
            </p>
            <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-blue-900 mb-3">System Features:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div>• Simulated API fetching with realistic delays</div>
                <div>• Advanced relevance scoring algorithm</div>
                <div>• Sentiment analysis (positive/negative/neutral)</div>
                <div>• Duplicate detection and removal</div>
                <div>• Professional magazine-style formatting</div>
                <div>• Extensible design for real API integration</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};