import { Article, NewsCategory, Sentiment } from '../types/news';

export const generateSampleArticles = (): Article[] => {
  const baseDate = new Date();
  
  return [
    {
      id: '1',
      title: "Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000),
      content: "The Federal Reserve Chair Jerome Powell hinted at potential interest rate cuts in the coming months as economic indicators show mixed signals. Inflation remains above target levels while employment data suggests a cooling job market. Market analysts are closely watching for any policy shifts that could impact global markets and bond yields.",
      category: NewsCategory.ECONOMICS,
      keywords: ["federal reserve", "interest rates", "inflation", "economy", "jerome powell", "monetary policy"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '2',
      title: "Goldman Sachs Reports Record Q4 Earnings on Trading Revenue Surge",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000),
      content: "Goldman Sachs Group Inc. reported record fourth-quarter earnings driven by exceptional performance in fixed-income trading and investment banking fees. The bank's trading division generated $4.2 billion in revenue, exceeding analyst expectations by 23%. CEO David Solomon attributed the success to strategic positioning in volatile markets.",
      category: NewsCategory.BANKING,
      keywords: ["goldman sachs", "earnings", "trading revenue", "investment banking", "david solomon", "financial results"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '3',
      title: "S&P 500 Reaches New All-Time High as Tech Stocks Rally",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 1 * 60 * 60 * 1000),
      content: "The S&P 500 index closed at a record high of 4,847 points, driven by strong performance in technology and growth stocks. Apple, Microsoft, and NVIDIA led the rally with gains exceeding 3% each. Market sentiment remains optimistic despite concerns about inflation and geopolitical tensions affecting global supply chains.",
      category: NewsCategory.MARKETS,
      keywords: ["s&p 500", "all-time high", "tech stocks", "apple", "microsoft", "nvidia", "market rally"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '4',
      title: "JPMorgan Chase Increases Dividend by 15% Following Stress Test Results",
      source: "Reuters",
      publicationDate: new Date(baseDate.getTime() - 6 * 60 * 60 * 1000),
      content: "JPMorgan Chase & Co announced a 15% increase in its quarterly dividend to $1.15 per share, following successful Federal Reserve stress test results. The bank also authorized a $30 billion share buyback program. CEO Jamie Dimon expressed confidence in the bank's capital position and ability to support economic growth through lending.",
      category: NewsCategory.BANKING,
      keywords: ["jpmorgan chase", "dividend increase", "stress test", "share buyback", "jamie dimon", "capital position"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '5',
      title: "Bitcoin ETF Approval Drives Cryptocurrency Market to $2.8 Trillion",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 3 * 60 * 60 * 1000),
      content: "The approval of spot Bitcoin exchange-traded funds by the Securities and Exchange Commission has propelled the total cryptocurrency market capitalization to $2.8 trillion. Bitcoin surged 12% to $67,000 following the announcement, while Ethereum and other major cryptocurrencies posted significant gains. Institutional adoption continues to accelerate.",
      category: NewsCategory.INVESTMENTS,
      keywords: ["bitcoin etf", "cryptocurrency", "sec approval", "bitcoin price", "ethereum", "institutional adoption"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '6',
      title: "Tesla Reports 40% Revenue Growth Despite Production Challenges",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 8 * 60 * 60 * 1000),
      content: "Tesla Inc. reported quarterly revenue of $29.5 billion, representing 40% year-over-year growth despite ongoing production challenges at its Berlin and Austin facilities. The electric vehicle manufacturer delivered 484,000 vehicles in the quarter, slightly below analyst expectations. CEO Elon Musk remains optimistic about achieving 2 million deliveries annually.",
      category: NewsCategory.CORPORATE,
      keywords: ["tesla", "revenue growth", "production challenges", "electric vehicles", "elon musk", "deliveries"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '7',
      title: "European Central Bank Maintains Rates Amid Eurozone Inflation Concerns",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 5 * 60 * 60 * 1000),
      content: "The European Central Bank kept interest rates unchanged at 4.5% during its latest policy meeting, citing persistent inflation pressures across the eurozone. ECB President Christine Lagarde emphasized the need for continued vigilance as core inflation remains above the 2% target. German and French bond yields rose following the announcement.",
      category: NewsCategory.ECONOMICS,
      keywords: ["european central bank", "interest rates", "eurozone inflation", "christine lagarde", "bond yields", "monetary policy"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '8',
      title: "Berkshire Hathaway's Cash Pile Reaches Record $189 Billion",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 7 * 60 * 60 * 1000),
      content: "Warren Buffett's Berkshire Hathaway Inc. reported a record cash position of $189 billion at the end of the fourth quarter, as the conglomerate struggled to find attractively priced acquisition targets. The company continued its share buyback program, repurchasing $2.2 billion worth of stock during the quarter while maintaining its conservative investment approach.",
      category: NewsCategory.INVESTMENTS,
      keywords: ["berkshire hathaway", "warren buffett", "cash position", "acquisitions", "share buyback", "investment strategy"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '9',
      title: "Oil Prices Surge 8% on Middle East Supply Disruption Fears",
      source: "Reuters",
      publicationDate: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000),
      content: "Crude oil prices jumped 8% to $89 per barrel amid growing concerns about potential supply disruptions in the Middle East. Brent crude futures reached their highest level in six months as geopolitical tensions escalated. Energy sector stocks rallied, with ExxonMobil and Chevron posting gains of over 5% in after-hours trading.",
      category: NewsCategory.MARKETS,
      keywords: ["oil prices", "crude oil", "middle east", "supply disruption", "brent crude", "energy stocks", "exxonmobil", "chevron"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '10',
      title: "Morgan Stanley Beats Earnings Expectations on Wealth Management Growth",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 12 * 60 * 60 * 1000),
      content: "Morgan Stanley reported fourth-quarter earnings of $2.01 per share, beating analyst estimates of $1.91, driven by strong performance in its wealth management division. Assets under management reached $4.8 trillion, up 12% from the previous year. The firm's investment banking revenue declined 15% due to reduced M&A activity and IPO volumes.",
      category: NewsCategory.BANKING,
      keywords: ["morgan stanley", "earnings beat", "wealth management", "assets under management", "investment banking", "m&a activity"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '11',
      title: "Housing Market Correction Deepens as Mortgage Rates Hit 7.8%",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 6 * 60 * 60 * 1000),
      content: "The U.S. housing market correction intensified as 30-year mortgage rates climbed to 7.8%, the highest level in over two decades. Home sales plummeted 28% year-over-year, while median home prices declined 5% in major metropolitan areas. Real estate investment trusts (REITs) fell sharply, with residential REITs down 15% for the month.",
      category: NewsCategory.MARKETS,
      keywords: ["housing market", "mortgage rates", "home sales", "real estate", "reits", "housing correction"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '12',
      title: "Apple's Services Revenue Hits $23.1 Billion Quarterly Record",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 9 * 60 * 60 * 1000),
      content: "Apple Inc. reported record services revenue of $23.1 billion in the fourth quarter, driven by growth in the App Store, iCloud, and Apple Pay. The services segment now represents 24% of total revenue, providing crucial recurring income as iPhone sales face headwinds in China. CEO Tim Cook highlighted the company's expanding ecosystem and subscription services growth.",
      category: NewsCategory.CORPORATE,
      keywords: ["apple", "services revenue", "app store", "icloud", "apple pay", "tim cook", "subscription services"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '13',
      title: "Chinese Yuan Weakens to 6-Month Low Against Dollar",
      source: "Reuters",
      publicationDate: new Date(baseDate.getTime() - 10 * 60 * 60 * 1000),
      content: "The Chinese yuan fell to a six-month low against the U.S. dollar, trading at 7.34 per dollar amid concerns about China's economic recovery and potential trade tensions. The People's Bank of China intervened in currency markets to prevent further depreciation. Emerging market currencies broadly weakened as investors sought safe-haven assets.",
      category: NewsCategory.MARKETS,
      keywords: ["chinese yuan", "currency", "dollar", "china economy", "people's bank of china", "emerging markets"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '14',
      title: "Private Equity Fundraising Drops 35% as Investors Turn Cautious",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 11 * 60 * 60 * 1000),
      content: "Global private equity fundraising declined 35% in 2024 to $487 billion as institutional investors became more selective amid economic uncertainty. Pension funds and sovereign wealth funds reduced allocations to alternative investments, focusing on liquidity and capital preservation. Industry leaders expect the challenging fundraising environment to persist through 2025.",
      category: NewsCategory.INVESTMENTS,
      keywords: ["private equity", "fundraising", "institutional investors", "pension funds", "sovereign wealth funds", "alternative investments"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '15',
      title: "Bank of America Provisions $2.1 Billion for Credit Losses",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 7 * 60 * 60 * 1000),
      content: "Bank of America Corp. set aside $2.1 billion for potential credit losses in the fourth quarter, a 67% increase from the previous year, as the bank prepares for potential economic headwinds. Consumer credit card delinquencies rose to 3.2%, while commercial real estate loans showed signs of stress. CEO Brian Moynihan emphasized the bank's strong capital position.",
      category: NewsCategory.BANKING,
      keywords: ["bank of america", "credit losses", "provisions", "credit card delinquencies", "commercial real estate", "brian moynihan"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '16',
      title: "Green Bonds Issuance Reaches Record $500 Billion in 2024",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 13 * 60 * 60 * 1000),
      content: "Global green bond issuance reached a record $500 billion in 2024, driven by increased corporate and sovereign demand for sustainable financing. European issuers led the market with $180 billion in green bonds, followed by Asia-Pacific at $165 billion. The renewable energy sector accounted for 45% of proceeds, with transportation and buildings comprising the remainder.",
      category: NewsCategory.INVESTMENTS,
      keywords: ["green bonds", "sustainable financing", "renewable energy", "corporate bonds", "sovereign bonds", "esg investing"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '17',
      title: "Inflation Data Shows Core PCE Rising 3.2% Year-Over-Year",
      source: "Reuters",
      publicationDate: new Date(baseDate.getTime() - 14 * 60 * 60 * 1000),
      content: "The Federal Reserve's preferred inflation measure, core Personal Consumption Expenditures (PCE), rose 3.2% year-over-year in December, exceeding expectations of 3.0%. Services inflation remained elevated at 4.1%, while goods prices showed signs of moderation. The data reinforces the Fed's cautious approach to monetary policy adjustments.",
      category: NewsCategory.ECONOMICS,
      keywords: ["inflation", "core pce", "federal reserve", "services inflation", "monetary policy", "consumer prices"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '18',
      title: "Microsoft's Cloud Revenue Grows 28% to $28.5 Billion",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 15 * 60 * 60 * 1000),
      content: "Microsoft Corporation reported cloud revenue of $28.5 billion in the fourth quarter, representing 28% year-over-year growth driven by Azure and Office 365 adoption. The company's AI services contributed $3.2 billion to cloud revenue, with enterprise customers increasingly adopting Copilot solutions. CEO Satya Nadella highlighted the transformative impact of AI on productivity.",
      category: NewsCategory.CORPORATE,
      keywords: ["microsoft", "cloud revenue", "azure", "office 365", "artificial intelligence", "satya nadella", "copilot"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '19',
      title: "Venture Capital Investment Falls 42% as Startups Face Funding Winter",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 16 * 60 * 60 * 1000),
      content: "Venture capital investment declined 42% to $136 billion in 2024 as startups faced a prolonged funding winter amid higher interest rates and increased investor scrutiny. Late-stage funding rounds were particularly affected, dropping 55% from peak levels. Fintech and biotech sectors saw the steepest declines, while AI-focused startups maintained relatively stable funding levels.",
      category: NewsCategory.INVESTMENTS,
      keywords: ["venture capital", "startup funding", "funding winter", "fintech", "biotech", "artificial intelligence", "late-stage funding"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '20',
      title: "Gold Prices Reach $2,150 Per Ounce on Safe-Haven Demand",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 17 * 60 * 60 * 1000),
      content: "Gold prices surged to $2,150 per ounce, the highest level in eight months, as investors sought safe-haven assets amid geopolitical tensions and inflation concerns. Central bank purchases remained robust, with emerging market central banks adding 387 tons to reserves in the fourth quarter. Gold mining stocks rallied, with Barrick Gold and Newmont posting gains exceeding 8%.",
      category: NewsCategory.MARKETS,
      keywords: ["gold prices", "safe-haven", "central bank purchases", "geopolitical tensions", "barrick gold", "newmont", "precious metals"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    }
  ];
};

export const getNewsSources = () => [
  { name: "Bloomberg", reliabilityScore: 0.95, categories: [NewsCategory.FINANCE, NewsCategory.MARKETS, NewsCategory.ECONOMICS], articlesFetched: 0 },
  { name: "Wall Street Journal", reliabilityScore: 0.94, categories: [NewsCategory.FINANCE, NewsCategory.CORPORATE, NewsCategory.INVESTMENTS], articlesFetched: 0 },
  { name: "Financial Times", reliabilityScore: 0.93, categories: [NewsCategory.MARKETS, NewsCategory.BANKING, NewsCategory.ECONOMICS], articlesFetched: 0 },
  { name: "Reuters", reliabilityScore: 0.92, categories: [NewsCategory.ECONOMICS, NewsCategory.MARKETS, NewsCategory.CORPORATE], articlesFetched: 0 }
];