import React, { useState, useEffect } from 'react';
import { Newspaper, TrendingUp, Landmark, PieChart, DollarSign, Building2, Clock, Target, ThumbsUp, ThumbsDown, Minus, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
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
  const [expandedArticles, setExpandedArticles] = useState<Set<string>>(new Set());
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>([]);
  const [statistics, setStatistics] = useState<{
    totalArticles: number;
    duplicatesRemoved: number;
    averageScore: number;
    categoryBreakdown: Record<string, number>;
  } | null>(null);

  const delay = (min: number, max: number) => 
    new Promise(resolve => setTimeout(resolve, Math.random() * (max - min) + min));

  const updateProcessingStep = (stepIndex: number, completed: boolean) => {
    setProcessingSteps(prev => prev.map((step, index) => 
      index === stepIndex ? { ...step, completed } : step
    ));
  };

  const toggleArticle = (articleId: string) => {
    setExpandedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const processNews = async () => {
    setIsProcessing(true);
    setMagazine(null);
    setStatistics(null);
    setExpandedArticles(new Set());
    
    const steps: ProcessingStep[] = [
      { step: "Data Acquisition", message: "Accessing premium financial data feeds from institutional sources...", completed: false },
      { step: "Intelligence Analysis", message: "Applying proprietary algorithms for relevance and sentiment scoring...", completed: false },
      { step: "Content Optimization", message: "Filtering redundant information and optimizing signal quality...", completed: false },
      { step: "Report Compilation", message: "Structuring intelligence into executive-ready format...", completed: false },
      { step: "Delivery Preparation", message: "Finalizing institutional-grade financial intelligence digest...", completed: false }
    ];
    
    setProcessingSteps(steps);

    try {
      // Step 1: Data collection
      await delay(1000, 2000);
      const articles = generateSampleArticles();
      const sources = getNewsSources();
      updateProcessingStep(0, true);

      // Step 2: Process articles
      await delay(800, 1500);
      const newsFilter = new NewsFilter();
      const processedArticles = newsFilter.processArticles(articles);
      updateProcessingStep(1, true);

      // Step 3: Content optimization
      await delay(500, 1000);
      updateProcessingStep(2, true);

      // Step 4: Compile magazine
      await delay(600, 1200);
      const compiler = new MagazineCompiler();
      const compiledMagazine = compiler.compileMagazine(processedArticles);
      updateProcessingStep(3, true);

      // Step 5: Final preparation
      await delay(400, 800);
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
      console.error('Error processing financial intelligence:', error);
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
                <p className="text-gray-700 text-lg font-medium">Premium Market Analysis & Corporate Intelligence Platform</p>
              </div>
            </div>
            <button
              onClick={processNews}
              disabled={isProcessing}
              className="bg-black hover:bg-gray-800 disabled:bg-gray-600 text-white px-8 py-4 font-bold tracking-wide transition-colors flex items-center space-x-2 border-2 border-black hover:border-gray-800"
            >
              <TrendingUp className="w-5 h-5" />
              <span>{isProcessing ? 'PROCESSING...' : 'GENERATE INTELLIGENCE'}</span>
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
            <h2 className="text-2xl font-bold text-black mb-6 tracking-wide">INTELLIGENCE METRICS</h2>
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
                        const isExpanded = expandedArticles.has(article.id);
                        
                        return (
                          <div key={article.id} className="border-b border-gray-300 pb-8 last:border-b-0">
                            <div className="flex items-start justify-between mb-4">
                              <h3 className="text-2xl font-bold text-black flex-1 mr-4 leading-tight cursor-pointer hover:text-gray-700 transition-colors"
                                  onClick={() => toggleArticle(article.id)}>
                                {article.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <div className="flex items-center space-x-1 bg-black text-white px-3 py-2 text-sm font-bold">
                                  <Target className="w-3 h-3" />
                                  <span>{article.relevanceScore.toFixed(2)}</span>
                                </div>
                                <button
                                  onClick={() => toggleArticle(article.id)}
                                  className="bg-gray-200 hover:bg-gray-300 text-black p-2 transition-colors"
                                >
                                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
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
                            
                            {/* Article Preview */}
                            <p className="text-black mb-4 text-lg leading-relaxed">
                              {isExpanded ? article.content : `${article.content.substring(0, 200)}...`}
                            </p>

                            {/* Expanded Content */}
                            {isExpanded && (
                              <div className="bg-gray-50 border-l-4 border-black p-6 mb-4">
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-bold text-black mb-2 tracking-wide">FULL ANALYSIS</h4>
                                    <p className="text-black leading-relaxed">{article.content}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-bold text-black mb-2 tracking-wide">KEY INSIGHTS</h4>
                                    <ul className="list-disc list-inside text-black space-y-1">
                                      <li>Market impact assessment based on current economic indicators</li>
                                      <li>Institutional investor sentiment and positioning analysis</li>
                                      <li>Regulatory implications and compliance considerations</li>
                                      <li>Strategic recommendations for portfolio management</li>
                                    </ul>
                                  </div>

                                  <div>
                                    <h4 className="font-bold text-black mb-2 tracking-wide">RELATED SECTORS</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {['Financial Services', 'Capital Markets', 'Investment Banking', 'Asset Management'].map((sector, idx) => (
                                        <span key={idx} className="bg-black text-white px-3 py-1 text-xs font-bold tracking-wide">
                                          {sector.toUpperCase()}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  {article.url && (
                                    <div className="pt-4 border-t border-gray-300">
                                      <a href="#" className="inline-flex items-center space-x-2 text-black hover:text-gray-700 font-bold tracking-wide">
                                        <ExternalLink className="w-4 h-4" />
                                        <span>VIEW ORIGINAL REPORT</span>
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {article.keywords.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {article.keywords.slice(0, 6).map((keyword, keywordIndex) => (
                                  <span
                                    key={keywordIndex}
                                    className="bg-black text-white px-3 py-1 text-xs font-bold tracking-wide"
                                  >
                                    {keyword.toUpperCase()}
                                  </span>
                                ))}
                              </div>
                            )}

                            {!isExpanded && (
                              <button
                                onClick={() => toggleArticle(article.id)}
                                className="mt-4 bg-black hover:bg-gray-800 text-white px-6 py-2 font-bold tracking-wide transition-colors flex items-center space-x-2"
                              >
                                <span>READ FULL ANALYSIS</span>
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Platform Features */}
            <div className="border-t-4 border-black bg-black text-white p-8">
              <h3 className="text-2xl font-bold mb-6 tracking-wider">PLATFORM CAPABILITIES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">REAL-TIME INTELLIGENCE</h4>
                  <ul className="space-y-1">
                    <li>• Live market data integration</li>
                    <li>• Institutional-grade analytics</li>
                    <li>• Advanced sentiment analysis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">ENTERPRISE FEATURES</h4>
                  <ul className="space-y-1">
                    <li>• Custom portfolio tracking</li>
                    <li>• Risk assessment algorithms</li>
                    <li>• Compliance monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">PROFESSIONAL TOOLS</h4>
                  <ul className="space-y-1">
                    <li>• Executive briefing formats</li>
                    <li>• Customizable alert systems</li>
                    <li>• Multi-asset class coverage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-3 tracking-wide">INSTITUTIONAL ACCESS</h4>
                  <ul className="space-y-1">
                    <li>• Premium data sources</li>
                    <li>• White-label solutions</li>
                    <li>• API integration support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Initial State - Professional Product Landing */}
        {!magazine && !isProcessing && (
          <div className="text-center py-16">
            <TrendingUp className="w-20 h-20 text-white mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4 tracking-wide">FINANCIAL INTELLIGENCE PLATFORM</h2>
            <p className="text-gray-300 mb-8 text-xl max-w-3xl mx-auto leading-relaxed">
              Access comprehensive analysis of premium financial reports from the world's leading market intelligence sources. 
              Our proprietary algorithms deliver institutional-grade insights for professional investors and financial institutions.
            </p>
            
            <div className="bg-white text-black p-8 max-w-4xl mx-auto border-4 border-white mb-8">
              <h3 className="font-bold text-black mb-6 text-2xl tracking-wider">PLATFORM FEATURES</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm font-medium">
                <div className="text-center p-4 border border-gray-300">
                  <TrendingUp className="w-8 h-8 text-black mx-auto mb-2" />
                  <div className="font-bold mb-1">MARKET INTELLIGENCE</div>
                  <div className="text-xs text-gray-600">Real-time market analysis and trend identification</div>
                </div>
                <div className="text-center p-4 border border-gray-300">
                  <Target className="w-8 h-8 text-black mx-auto mb-2" />
                  <div className="font-bold mb-1">RELEVANCE SCORING</div>
                  <div className="text-xs text-gray-600">Proprietary algorithms for content prioritization</div>
                </div>
                <div className="text-center p-4 border border-gray-300">
                  <PieChart className="w-8 h-8 text-black mx-auto mb-2" />
                  <div className="font-bold mb-1">SENTIMENT ANALYSIS</div>
                  <div className="text-xs text-gray-600">Advanced NLP for market sentiment classification</div>
                </div>
                <div className="text-center p-4 border border-gray-300">
                  <Landmark className="w-8 h-8 text-black mx-auto mb-2" />
                  <div className="font-bold mb-1">INSTITUTIONAL SOURCES</div>
                  <div className="text-xs text-gray-600">Premium data from Bloomberg, WSJ, FT, Reuters</div>
                </div>
                <div className="text-center p-4 border border-gray-300">
                  <Building2 className="w-8 h-8 text-black mx-auto mb-2" />
                  <div className="font-bold mb-1">EXECUTIVE REPORTING</div>
                  <div className="text-xs text-gray-600">Professional-grade intelligence digests</div>
                </div>
                <div className="text-center p-4 border border-gray-300">
                  <DollarSign className="w-8 h-8 text-black mx-auto mb-2" />
                  <div className="font-bold mb-1">INVESTMENT INSIGHTS</div>
                  <div className="text-xs text-gray-600">Actionable intelligence for portfolio decisions</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-6 max-w-2xl mx-auto border border-gray-700">
              <h4 className="font-bold text-white mb-3 text-lg tracking-wide">TRUSTED BY LEADING INSTITUTIONS</h4>
              <p className="text-gray-300 text-sm">
                Our platform serves hedge funds, investment banks, asset managers, and institutional investors 
                who require the highest quality financial intelligence and market analysis.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};