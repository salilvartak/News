import { Article, NewsCategory, Sentiment } from '../types/news';

export const generateSampleArticles = (): Article[] => {
  const baseDate = new Date();
  
  return [
    {
      id: '1',
      title: "Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 2 * 60 * 60 * 1000),
      content: "The Federal Reserve Chair Jerome Powell hinted at potential interest rate cuts in the coming months as economic indicators show mixed signals. Inflation remains above target levels while employment data suggests a cooling job market. Market analysts are closely watching for any policy shifts that could impact global markets.",
      category: NewsCategory.FINANCE,
      keywords: ["federal reserve", "interest rates", "inflation", "economy", "jerome powell"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '2',
      title: "Tech Stocks Rally on AI Breakthrough Announcements",
      source: "Bloomberg",
      publicationDate: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000),
      content: "Major technology stocks surged in after-hours trading following announcements of significant artificial intelligence breakthroughs by several leading companies. NVIDIA, Microsoft, and Google parent Alphabet all saw substantial gains as investors showed renewed confidence in AI-driven growth.",
      category: NewsCategory.TECHNOLOGY,
      keywords: ["tech stocks", "artificial intelligence", "nvidia", "microsoft", "google", "breakthrough"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '3',
      title: "Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
      source: "Reuters",
      publicationDate: new Date(baseDate.getTime() - 1 * 60 * 60 * 1000),
      content: "World leaders at the Global Climate Summit have reached a landmark agreement to reduce carbon emissions by 50% over the next decade. The accord involves 195 countries and includes binding commitments for renewable energy investment and fossil fuel phase-out timelines.",
      category: NewsCategory.WORLD_NEWS,
      keywords: ["climate summit", "carbon reduction", "renewable energy", "fossil fuels", "global agreement"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '4',
      title: "Cryptocurrency Markets Show Signs of Recovery After Regulatory Clarity",
      source: "Reuters",
      publicationDate: new Date(baseDate.getTime() - 6 * 60 * 60 * 1000),
      content: "Bitcoin and other major cryptocurrencies have rebounded significantly following clearer regulatory guidelines from major economies. The European Union and United States have both issued comprehensive frameworks for digital asset regulation, boosting investor confidence.",
      category: NewsCategory.FINANCE,
      keywords: ["cryptocurrency", "bitcoin", "regulation", "digital assets", "european union"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '5',
      title: "Presidential Election Campaign Intensifies with Key State Polling",
      source: "CNN",
      publicationDate: new Date(baseDate.getTime() - 3 * 60 * 60 * 1000),
      content: "The upcoming presidential election is heating up as new polling data from key swing states shows a tight race. Campaign rallies and debates are drawing record audiences as candidates focus on economic policies and foreign relations. Early voting has already begun in several states.",
      category: NewsCategory.POLITICS,
      keywords: ["presidential election", "polling", "swing states", "campaign", "voting"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '6',
      title: "Breakthrough Cancer Treatment Shows Promising Results in Clinical Trials",
      source: "CNN",
      publicationDate: new Date(baseDate.getTime() - 8 * 60 * 60 * 1000),
      content: "A revolutionary cancer treatment using engineered immune cells has shown remarkable success in Phase 3 clinical trials. The treatment demonstrated a 75% success rate in patients with advanced-stage cancers, offering new hope for millions of patients worldwide.",
      category: NewsCategory.HEALTH,
      keywords: ["cancer treatment", "clinical trials", "immune cells", "medical breakthrough", "healthcare"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '7',
      title: "European Union Proposes New Trade Agreement with Asian Markets",
      source: "BBC",
      publicationDate: new Date(baseDate.getTime() - 5 * 60 * 60 * 1000),
      content: "The European Union has proposed a comprehensive trade agreement with several Asian markets, including Japan, South Korea, and Singapore. The deal aims to reduce tariffs and boost economic cooperation in technology and renewable energy sectors.",
      category: NewsCategory.WORLD_NEWS,
      keywords: ["european union", "trade agreement", "asian markets", "tariffs", "economic cooperation"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '8',
      title: "Quantum Computing Milestone Achieved by Research Consortium",
      source: "BBC",
      publicationDate: new Date(baseDate.getTime() - 7 * 60 * 60 * 1000),
      content: "An international research consortium has achieved a significant quantum computing milestone by successfully demonstrating quantum error correction at scale. This breakthrough brings practical quantum computers closer to reality and could revolutionize fields from cryptography to drug discovery.",
      category: NewsCategory.TECHNOLOGY,
      keywords: ["quantum computing", "error correction", "research", "cryptography", "technology breakthrough"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '9',
      title: "Startup Raises $500M for Revolutionary Battery Technology",
      source: "TechCrunch",
      publicationDate: new Date(baseDate.getTime() - 4 * 60 * 60 * 1000),
      content: "EnergyTech Corp, a startup developing solid-state battery technology, has raised $500 million in Series C funding. The company's batteries promise 10x longer life and 50% faster charging compared to current lithium-ion technology, with applications in electric vehicles and grid storage.",
      category: NewsCategory.TECHNOLOGY,
      keywords: ["startup", "battery technology", "solid-state", "electric vehicles", "funding"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '10',
      title: "Major Data Breach Affects Millions of Users Worldwide",
      source: "TechCrunch",
      publicationDate: new Date(baseDate.getTime() - 12 * 60 * 60 * 1000),
      content: "A cybersecurity firm has discovered a major data breach affecting over 50 million users across multiple platforms. Personal information including names, email addresses, and encrypted passwords may have been compromised. Companies are urging users to change passwords immediately.",
      category: NewsCategory.TECHNOLOGY,
      keywords: ["data breach", "cybersecurity", "personal information", "passwords", "security"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '11',
      title: "Housing Market Shows Signs of Cooling Amid Rising Rates",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 6 * 60 * 60 * 1000),
      content: "The housing market is showing clear signs of cooling as mortgage rates climb to multi-year highs. Home sales have declined 15% compared to last year, while inventory levels are beginning to normalize. Real estate experts predict a continued slowdown through the remainder of the year.",
      category: NewsCategory.FINANCE,
      keywords: ["housing market", "mortgage rates", "home sales", "real estate", "inventory"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '12',
      title: "Corporate Earnings Season Reveals Mixed Results Across Sectors",
      source: "Wall Street Journal",
      publicationDate: new Date(baseDate.getTime() - 9 * 60 * 60 * 1000),
      content: "The latest earnings season has produced mixed results as companies navigate inflation, supply chain disruptions, and changing consumer behavior. Technology and healthcare sectors outperformed expectations, while retail and manufacturing faced headwinds.",
      category: NewsCategory.FINANCE,
      keywords: ["earnings season", "inflation", "supply chain", "technology", "healthcare", "retail"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '13',
      title: "International Space Mission Launches with Historic Crew",
      source: "Associated Press",
      publicationDate: new Date(baseDate.getTime() - 10 * 60 * 60 * 1000),
      content: "A groundbreaking international space mission has launched with the most diverse crew in space exploration history. The six-month mission will conduct experiments on the International Space Station and test new technologies for future Mars missions.",
      category: NewsCategory.TOP_STORIES,
      keywords: ["space mission", "international space station", "mars mission", "space exploration", "diverse crew"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '14',
      title: "Global Food Crisis Worsens as Climate Events Disrupt Agriculture",
      source: "Associated Press",
      publicationDate: new Date(baseDate.getTime() - 11 * 60 * 60 * 1000),
      content: "Extreme weather events across major agricultural regions have severely impacted global food production. Droughts, floods, and unexpected temperature changes have reduced crop yields, leading to rising food prices and increased concerns about food security worldwide.",
      category: NewsCategory.WORLD_NEWS,
      keywords: ["food crisis", "climate events", "agriculture", "crop yields", "food security"],
      relevanceScore: 0,
      sentiment: Sentiment.NEGATIVE,
      processed: false
    },
    {
      id: '15',
      title: "Central Banks Coordinate Response to Currency Market Volatility",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 7 * 60 * 60 * 1000),
      content: "Major central banks are coordinating their response to recent currency market volatility that has affected emerging market economies. The coordinated intervention aims to stabilize exchange rates and prevent contagion effects across global financial markets.",
      category: NewsCategory.FINANCE,
      keywords: ["central banks", "currency market", "volatility", "emerging markets", "financial markets"],
      relevanceScore: 0,
      sentiment: Sentiment.NEUTRAL,
      processed: false
    },
    {
      id: '16',
      title: "Renewable Energy Investment Reaches Record High Despite Economic Headwinds",
      source: "Financial Times",
      publicationDate: new Date(baseDate.getTime() - 13 * 60 * 60 * 1000),
      content: "Global investment in renewable energy has reached a record $1.2 trillion despite economic uncertainties and supply chain challenges. Solar and wind projects dominated the investment landscape, with significant growth in energy storage and grid modernization technologies.",
      category: NewsCategory.FINANCE,
      keywords: ["renewable energy", "investment", "solar", "wind", "energy storage", "grid modernization"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '17',
      title: "Breakthrough in Alzheimer's Research Offers New Treatment Hope",
      source: "The Guardian",
      publicationDate: new Date(baseDate.getTime() - 14 * 60 * 60 * 1000),
      content: "Scientists have made a significant breakthrough in Alzheimer's research, identifying a new protein pathway that could lead to more effective treatments. The discovery could potentially slow or even reverse cognitive decline in early-stage patients.",
      category: NewsCategory.HEALTH,
      keywords: ["alzheimer's research", "protein pathway", "cognitive decline", "treatment", "medical breakthrough"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '18',
      title: "Ocean Conservation Efforts Show Promising Results in Coral Reef Recovery",
      source: "The Guardian",
      publicationDate: new Date(baseDate.getTime() - 15 * 60 * 60 * 1000),
      content: "Major ocean conservation initiatives have shown promising results in coral reef recovery across the Pacific. New restoration techniques and reduced pollution have contributed to a 30% increase in coral coverage in protected areas over the past two years.",
      category: NewsCategory.WORLD_NEWS,
      keywords: ["ocean conservation", "coral reef", "restoration", "pollution", "protected areas"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '19',
      title: "Education Reform Initiative Shows Improved Student Outcomes",
      source: "NPR",
      publicationDate: new Date(baseDate.getTime() - 16 * 60 * 60 * 1000),
      content: "A comprehensive education reform initiative implemented across multiple school districts has shown significant improvements in student outcomes. Reading and math scores have increased by an average of 15%, while graduation rates have reached all-time highs.",
      category: NewsCategory.TOP_STORIES,
      keywords: ["education reform", "student outcomes", "reading scores", "math scores", "graduation rates"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    },
    {
      id: '20',
      title: "Autonomous Vehicle Technology Passes Major Safety Milestone",
      source: "NPR",
      publicationDate: new Date(baseDate.getTime() - 17 * 60 * 60 * 1000),
      content: "Autonomous vehicle technology has passed a major safety milestone with over 1 million accident-free miles logged in real-world testing. The achievement brings self-driving cars closer to widespread commercial deployment and regulatory approval.",
      category: NewsCategory.TECHNOLOGY,
      keywords: ["autonomous vehicles", "safety milestone", "self-driving cars", "testing", "regulatory approval"],
      relevanceScore: 0,
      sentiment: Sentiment.POSITIVE,
      processed: false
    }
  ];
};

export const getNewsSources = () => [
  { name: "Bloomberg", reliabilityScore: 0.9, categories: [NewsCategory.FINANCE, NewsCategory.TECHNOLOGY, NewsCategory.WORLD_NEWS], articlesFetched: 0 },
  { name: "Reuters", reliabilityScore: 0.95, categories: [NewsCategory.WORLD_NEWS, NewsCategory.FINANCE, NewsCategory.POLITICS], articlesFetched: 0 },
  { name: "CNN", reliabilityScore: 0.8, categories: [NewsCategory.POLITICS, NewsCategory.TOP_STORIES, NewsCategory.HEALTH], articlesFetched: 0 },
  { name: "BBC", reliabilityScore: 0.92, categories: [NewsCategory.WORLD_NEWS, NewsCategory.TECHNOLOGY, NewsCategory.TOP_STORIES], articlesFetched: 0 },
  { name: "TechCrunch", reliabilityScore: 0.85, categories: [NewsCategory.TECHNOLOGY], articlesFetched: 0 },
  { name: "Wall Street Journal", reliabilityScore: 0.88, categories: [NewsCategory.FINANCE, NewsCategory.TOP_STORIES], articlesFetched: 0 },
  { name: "Associated Press", reliabilityScore: 0.93, categories: [NewsCategory.TOP_STORIES, NewsCategory.WORLD_NEWS, NewsCategory.POLITICS], articlesFetched: 0 },
  { name: "Financial Times", reliabilityScore: 0.89, categories: [NewsCategory.FINANCE, NewsCategory.WORLD_NEWS], articlesFetched: 0 },
  { name: "The Guardian", reliabilityScore: 0.86, categories: [NewsCategory.WORLD_NEWS, NewsCategory.HEALTH, NewsCategory.POLITICS], articlesFetched: 0 },
  { name: "NPR", reliabilityScore: 0.87, categories: [NewsCategory.TOP_STORIES, NewsCategory.TECHNOLOGY, NewsCategory.HEALTH], articlesFetched: 0 }
];