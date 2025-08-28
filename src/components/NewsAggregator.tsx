import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, Landmark, PieChart, DollarSign, Building2, Clock, Target, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { generateSampleArticles, getNewsSources } from '../data/sampleArticles';
import { NewsFilter } from '../services/newsFilter';
import { MagazineCompiler } from '../services/magazineCompiler';
import { Article, Magazine, NewsCategory, Sentiment } from '../types/news';

const categoryIcons = {
  [NewsCategory.FINANCE]: TrendingUp,
  [NewsCategory.MARKETS]: PieChart,
  [NewsCategory.BANKING]: Landmark,
  [NewsCategory.INVESTMENTS]: DollarSign,
  [NewsCategory.ECONOMICS]: TrendingUp,
  [NewsCategory.CORPORATE]: Building2
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
      { step: "Market Data Collection", message: "Accessing premium financial data feeds from elite sources...", completed: false },
      { step: "Intelligence Analysis", message: "Applying proprietary algorithms for relevance and sentiment scoring...", completed: false },
      { step: "Content Optimization", message: "Filtering redundant information and optimizing signal quality...", completed: false },
      { step: "Executive Compilation", message: "Structuring intelligence into executive-ready format...", completed: false },
      { step: "Premium Delivery", message: "Generating institutional-grade financial intelligence digest...", completed: false }
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-10 h-10 text-black" />
              <div>
                <h1 className="text-4xl font-bold text-black tracking-tight">FINANCIAL INTELLIGENCE</h1>
                <p className="text-gray-700 text-lg font-medium">Premium Market Analysis & Corporate Intelligence</p>
              </div>
            </div>
            <button
              onClick={processNews}
              disabled={isProcessing}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white px-8 py-4 font-bold tracking-wide transition-colors flex items-center space-x-2 border-2 border-black hover:border-gray-800"
            >
              <TrendingUp className="w-5 h-5" />
              <span>{isProcessing ? 'ANALYZING...' : 'ANALYZE MARKETS'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Processing Steps */}
        {isProcessing && (
          <div className="bg-white text-black rounded-none shadow-lg p-8 mb-8 border-l-8 border-black">
            <h2 className="text-2xl font-bold text-black mb-6 tracking-wide">PROCESSING PIPELINE</h2>
            <div className="space-y-3">
              {processingSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-black text-white' : 'bg-gray-200 text-black'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-black tracking-wide">{step.step.toUpperCase()}</div>
                    <div className="text-sm text-gray-700">{step.message}</div>
                  </div>
                  {!step.completed && isProcessing && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Statistics */}
        {statistics && (
          <div className="bg-white text-black rounded-none shadow-lg p-8 mb-8 border-l-8 border-black">
            <h2 className="text-2xl font-bold text-black mb-6 tracking-wide">MARKET INTELLIGENCE METRICS</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-black">{statistics.totalArticles}</div>
                <div className="text-sm text-gray-700 font-medium tracking-wide">TOTAL REPORTS</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-black">{statistics.duplicatesRemoved}</div>
                <div className="text-sm text-gray-700 font-medium tracking-wide">DUPLICATES FILTERED</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-black">{statistics.averageScore.toFixed(2)}</div>
                <div className="text-sm text-gray-700 font-medium tracking-wide">AVG RELEVANCE</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-black">{Object.keys(statistics.categoryBreakdown).length}</div>
                <div className="text-sm text-gray-700 font-medium tracking-wide">ACTIVE SECTORS</div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-bold text-black mb-4 tracking-wide">SECTOR BREAKDOWN</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(statistics.categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex items-center justify-between bg-gray-100 px-4 py-3 border border-gray-300">
                    <span className="text-sm text-black font-medium tracking-wide">{category.toUpperCase()}</span>
                    <span className="font-bold text-black">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Magazine Output */}
        {magazine && (
          <div className="bg-white text-black shadow-lg border-4 border-black">
            {/* Magazine Header */}
            <div className="border-b-4 border-black p-8 bg-black text-white">
              <div className="text-center">
                <h1 className="text-5xl font-bold mb-4 tracking-wider">FINANCIAL INTELLIGENCE DIGEST</h1>
                <div className="text-xl font-medium tracking-wide">{magazine.date} | {magazine.totalArticles} PREMIUM REPORTS</div>
              </div>
            </div>

            {/* Magazine Sections */}
            <div className="p-8">
              {Object.entries(magazine.sections).map(([sectionName, section]) => {
                const IconComponent = categoryIcons[sectionName as NewsCategory];
                
                return (
                  <div key={sectionName} className="mb-16 last:mb-0 border-b-2 border-gray-200 last:border-b-0 pb-12">
                    {/* Section Header */}
                    <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-black">
                      <IconComponent className="w-8 h-8 text-black" />
                      <h2 className="text-3xl font-bold text-black tracking-wider">{sectionName.toUpperCase()}</h2>
                    </div>

                    {/* Section Summary */}
                    <div className="bg-gray-100 border-l-8 border-black p-6 mb-8">
                      <p className="text-black font-medium text-lg leading-relaxed">{section.summary}</p>
                    </div>

                    {/* Articles */}
                    <div className="space-y-8">
                      {section.articles.map((article, index) => {
                        const SentimentIcon = sentimentIcons[article.sentiment];
                        
                        return (
                          <div key={article.id} className="border-b border-gray-300 pb-8 last:border-b-0">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl font-bold text-black flex-1 mr-4 leading-tight">
                                {article.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1 bg-black text-white px-3 py-2 text-sm font-bold">
                                  <Target className="w-3 h-3" />
                                  <span>{article.relevanceScore.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-6 text-sm text-gray-700 mb-4">
                              <span className="font-bold tracking-wide">{article.source.toUpperCase()}</span>
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDate(article.publicationDate.toISOString())}</span>
                              </span>
                              <div className={`flex items-center space-x-1 px-3 py-1 text-xs font-bold ${sentimentColors[article.sentiment]}`}>
                                <SentimentIcon className="w-3 h-3" />
                                <span>{article.sentiment.toUpperCase()}</span>
                              </div>
                            </div>
                            
                            <p className="text-black mb-4 text-lg leading-relaxed">{article.content}</p>
                            
                            {article.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {article.keywords.slice(0, 5).map((keyword, keywordIndex) => (
                                  <span
                                    key={keywordIndex}
                                    className="bg-black text-white px-3 py-1 text-xs font-bold tracking-wide"
                                  >
                                    {keyword.toUpperCase()}
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
            <div className="border-t-4 border-black bg-black text-white p-8">
              <h3 className="text-2xl font-bold mb-6 tracking-wider">SYSTEM ARCHITECTURE & SCALABILITY</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">REAL-TIME DATA INTEGRATION</h4>
                  <ul className="space-y-1">
                    <li>• Bloomberg Terminal API integration</li>
                    <li>• Reuters Eikon data feeds</li>
                    <li>• SEC EDGAR filing automation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">ENTERPRISE DATA ARCHITECTURE</h4>
                  <ul className="space-y-1">
                    <li>• High-frequency data warehousing</li>
                    <li>• Real-time market data caching</li>
                    <li>• Advanced financial analytics engine</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">ALGORITHMIC INTELLIGENCE</h4>
                  <ul className="space-y-1">
                    <li>• Machine learning sentiment analysis</li>
                    <li>• Predictive market modeling</li>
                    <li>• Risk assessment algorithms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">INSTITUTIONAL DEPLOYMENT</h4>
                  <ul className="space-y-1">
                    <li>• Multi-tenant enterprise architecture</li>
                    <li>• Compliance and audit trails</li>
                    <li>• Custom client dashboards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!magazine && !isProcessing && (
          <div className="text-center py-16">
            <TrendingUp className="w-20 h-20 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4 tracking-wide">FINANCIAL INTELLIGENCE READY</h2>
            <p className="text-gray-300 mb-8 text-lg">
              Initiate comprehensive analysis of 20 premium financial reports from elite market sources.
            </p>
            <div className="bg-white text-black p-8 max-w-3xl mx-auto border-4 border-white">
              <h3 className="font-bold text-black mb-4 text-xl tracking-wider">INSTITUTIONAL-GRADE CAPABILITIES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
                <div>• Real-time market data simulation</div>
                <div>• Proprietary relevance algorithms</div>
                <div>• Advanced sentiment classification</div>
                <div>• Intelligent duplicate filtering</div>
                <div>• Executive-level report formatting</div>
                <div>• Enterprise-ready architecture</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};