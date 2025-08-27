"""
Hardcoded news articles for simulation purposes.
"""
from datetime import datetime, timedelta
from models import Article, NewsCategory
import random

def generate_sample_articles():
    """Generate 20 hardcoded news articles from various sources."""
    
    base_date = datetime.now()
    
    articles = [
        # Bloomberg Articles
        Article(
            title="Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty",
            source="Bloomberg",
            publication_date=base_date - timedelta(hours=2),
            content="The Federal Reserve Chair Jerome Powell hinted at potential interest rate cuts in the coming months as economic indicators show mixed signals. Inflation remains above target levels while employment data suggests a cooling job market. Market analysts are closely watching for any policy shifts that could impact global markets.",
            category=NewsCategory.FINANCE,
            keywords=["federal reserve", "interest rates", "inflation", "economy", "jerome powell"]
        ),
        Article(
            title="Tech Stocks Rally on AI Breakthrough Announcements",
            source="Bloomberg",
            publication_date=base_date - timedelta(hours=4),
            content="Major technology stocks surged in after-hours trading following announcements of significant artificial intelligence breakthroughs by several leading companies. NVIDIA, Microsoft, and Google parent Alphabet all saw substantial gains as investors showed renewed confidence in AI-driven growth.",
            category=NewsCategory.TECHNOLOGY,
            keywords=["tech stocks", "artificial intelligence", "nvidia", "microsoft", "google", "breakthrough"]
        ),
        
        # Reuters Articles
        Article(
            title="Global Climate Summit Reaches Historic Agreement on Carbon Reduction",
            source="Reuters",
            publication_date=base_date - timedelta(hours=1),
            content="World leaders at the Global Climate Summit have reached a landmark agreement to reduce carbon emissions by 50% over the next decade. The accord involves 195 countries and includes binding commitments for renewable energy investment and fossil fuel phase-out timelines.",
            category=NewsCategory.WORLD_NEWS,
            keywords=["climate summit", "carbon reduction", "renewable energy", "fossil fuels", "global agreement"]
        ),
        Article(
            title="Cryptocurrency Markets Show Signs of Recovery After Regulatory Clarity",
            source="Reuters",
            publication_date=base_date - timedelta(hours=6),
            content="Bitcoin and other major cryptocurrencies have rebounded significantly following clearer regulatory guidelines from major economies. The European Union and United States have both issued comprehensive frameworks for digital asset regulation, boosting investor confidence.",
            category=NewsCategory.FINANCE,
            keywords=["cryptocurrency", "bitcoin", "regulation", "digital assets", "european union"]
        ),
        
        # CNN Articles
        Article(
            title="Presidential Election Campaign Intensifies with Key State Polling",
            source="CNN",
            publication_date=base_date - timedelta(hours=3),
            content="The upcoming presidential election is heating up as new polling data from key swing states shows a tight race. Campaign rallies and debates are drawing record audiences as candidates focus on economic policies and foreign relations. Early voting has already begun in several states.",
            category=NewsCategory.POLITICS,
            keywords=["presidential election", "polling", "swing states", "campaign", "voting"]
        ),
        Article(
            title="Breakthrough Cancer Treatment Shows Promising Results in Clinical Trials",
            source="CNN",
            publication_date=base_date - timedelta(hours=8),
            content="A revolutionary cancer treatment using engineered immune cells has shown remarkable success in Phase 3 clinical trials. The treatment demonstrated a 75% success rate in patients with advanced-stage cancers, offering new hope for millions of patients worldwide.",
            category=NewsCategory.HEALTH,
            keywords=["cancer treatment", "clinical trials", "immune cells", "medical breakthrough", "healthcare"]
        ),
        
        # BBC Articles
        Article(
            title="European Union Proposes New Trade Agreement with Asian Markets",
            source="BBC",
            publication_date=base_date - timedelta(hours=5),
            content="The European Union has proposed a comprehensive trade agreement with several Asian markets, including Japan, South Korea, and Singapore. The deal aims to reduce tariffs and boost economic cooperation in technology and renewable energy sectors.",
            category=NewsCategory.WORLD_NEWS,
            keywords=["european union", "trade agreement", "asian markets", "tariffs", "economic cooperation"]
        ),
        Article(
            title="Quantum Computing Milestone Achieved by Research Consortium",
            source="BBC",
            publication_date=base_date - timedelta(hours=7),
            content="An international research consortium has achieved a significant quantum computing milestone by successfully demonstrating quantum error correction at scale. This breakthrough brings practical quantum computers closer to reality and could revolutionize fields from cryptography to drug discovery.",
            category=NewsCategory.TECHNOLOGY,
            keywords=["quantum computing", "error correction", "research", "cryptography", "technology breakthrough"]
        ),
        
        # TechCrunch Articles
        Article(
            title="Startup Raises $500M for Revolutionary Battery Technology",
            source="TechCrunch",
            publication_date=base_date - timedelta(hours=4),
            content="EnergyTech Corp, a startup developing solid-state battery technology, has raised $500 million in Series C funding. The company's batteries promise 10x longer life and 50% faster charging compared to current lithium-ion technology, with applications in electric vehicles and grid storage.",
            category=NewsCategory.TECHNOLOGY,
            keywords=["startup", "battery technology", "solid-state", "electric vehicles", "funding"]
        ),
        Article(
            title="Major Data Breach Affects Millions of Users Worldwide",
            source="TechCrunch",
            publication_date=base_date - timedelta(hours=12),
            content="A cybersecurity firm has discovered a major data breach affecting over 50 million users across multiple platforms. Personal information including names, email addresses, and encrypted passwords may have been compromised. Companies are urging users to change passwords immediately.",
            category=NewsCategory.TECHNOLOGY,
            keywords=["data breach", "cybersecurity", "personal information", "passwords", "security"]
        ),
        
        # Wall Street Journal Articles
        Article(
            title="Housing Market Shows Signs of Cooling Amid Rising Rates",
            source="Wall Street Journal",
            publication_date=base_date - timedelta(hours=6),
            content="The housing market is showing clear signs of cooling as mortgage rates climb to multi-year highs. Home sales have declined 15% compared to last year, while inventory levels are beginning to normalize. Real estate experts predict a continued slowdown through the remainder of the year.",
            category=NewsCategory.FINANCE,
            keywords=["housing market", "mortgage rates", "home sales", "real estate", "inventory"]
        ),
        Article(
            title="Corporate Earnings Season Reveals Mixed Results Across Sectors",
            source="Wall Street Journal",
            publication_date=base_date - timedelta(hours=9),
            content="The latest earnings season has produced mixed results as companies navigate inflation, supply chain disruptions, and changing consumer behavior. Technology and healthcare sectors outperformed expectations, while retail and manufacturing faced headwinds.",
            category=NewsCategory.FINANCE,
            keywords=["earnings season", "inflation", "supply chain", "technology", "healthcare", "retail"]
        ),
        
        # Associated Press Articles
        Article(
            title="International Space Mission Launches with Historic Crew",
            source="Associated Press",
            publication_date=base_date - timedelta(hours=10),
            content="A groundbreaking international space mission has launched with the most diverse crew in space exploration history. The six-month mission will conduct experiments on the International Space Station and test new technologies for future Mars missions.",
            category=NewsCategory.TOP_STORIES,
            keywords=["space mission", "international space station", "mars mission", "space exploration", "diverse crew"]
        ),
        Article(
            title="Global Food Crisis Worsens as Climate Events Disrupt Agriculture",
            source="Associated Press",
            publication_date=base_date - timedelta(hours=11),
            content="Extreme weather events across major agricultural regions have severely impacted global food production. Droughts, floods, and unexpected temperature changes have reduced crop yields, leading to rising food prices and increased concerns about food security worldwide.",
            category=NewsCategory.WORLD_NEWS,
            keywords=["food crisis", "climate events", "agriculture", "crop yields", "food security"]
        ),
        
        # Financial Times Articles
        Article(
            title="Central Banks Coordinate Response to Currency Market Volatility",
            source="Financial Times",
            publication_date=base_date - timedelta(hours=7),
            content="Major central banks are coordinating their response to recent currency market volatility that has affected emerging market economies. The coordinated intervention aims to stabilize exchange rates and prevent contagion effects across global financial markets.",
            category=NewsCategory.FINANCE,
            keywords=["central banks", "currency market", "volatility", "emerging markets", "financial markets"]
        ),
        Article(
            title="Renewable Energy Investment Reaches Record High Despite Economic Headwinds",
            source="Financial Times",
            publication_date=base_date - timedelta(hours=13),
            content="Global investment in renewable energy has reached a record $1.2 trillion despite economic uncertainties and supply chain challenges. Solar and wind projects dominated the investment landscape, with significant growth in energy storage and grid modernization technologies.",
            category=NewsCategory.FINANCE,
            keywords=["renewable energy", "investment", "solar", "wind", "energy storage", "grid modernization"]
        ),
        
        # The Guardian Articles
        Article(
            title="Breakthrough in Alzheimer's Research Offers New Treatment Hope",
            source="The Guardian",
            publication_date=base_date - timedelta(hours=14),
            content="Scientists have made a significant breakthrough in Alzheimer's research, identifying a new protein pathway that could lead to more effective treatments. The discovery could potentially slow or even reverse cognitive decline in early-stage patients.",
            category=NewsCategory.HEALTH,
            keywords=["alzheimer's research", "protein pathway", "cognitive decline", "treatment", "medical breakthrough"]
        ),
        Article(
            title="Ocean Conservation Efforts Show Promising Results in Coral Reef Recovery",
            source="The Guardian",
            publication_date=base_date - timedelta(hours=15),
            content="Major ocean conservation initiatives have shown promising results in coral reef recovery across the Pacific. New restoration techniques and reduced pollution have contributed to a 30% increase in coral coverage in protected areas over the past two years.",
            category=NewsCategory.WORLD_NEWS,
            keywords=["ocean conservation", "coral reef", "restoration", "pollution", "protected areas"]
        ),
        
        # NPR Articles
        Article(
            title="Education Reform Initiative Shows Improved Student Outcomes",
            source="NPR",
            publication_date=base_date - timedelta(hours=16),
            content="A comprehensive education reform initiative implemented across multiple school districts has shown significant improvements in student outcomes. Reading and math scores have increased by an average of 15%, while graduation rates have reached all-time highs.",
            category=NewsCategory.TOP_STORIES,
            keywords=["education reform", "student outcomes", "reading scores", "math scores", "graduation rates"]
        ),
        Article(
            title="Autonomous Vehicle Technology Passes Major Safety Milestone",
            source="NPR",
            publication_date=base_date - timedelta(hours=17),
            content="Autonomous vehicle technology has passed a major safety milestone with over 1 million accident-free miles logged in real-world testing. The achievement brings self-driving cars closer to widespread commercial deployment and regulatory approval.",
            category=NewsCategory.TECHNOLOGY,
            keywords=["autonomous vehicles", "safety milestone", "self-driving cars", "testing", "regulatory approval"]
        )
    ]
    
    return articles

def get_news_sources():
    """Return list of news sources with their characteristics."""
    from models import NewsSource
    
    return [
        NewsSource("Bloomberg", 0.9, [NewsCategory.FINANCE, NewsCategory.TECHNOLOGY, NewsCategory.WORLD_NEWS]),
        NewsSource("Reuters", 0.95, [NewsCategory.WORLD_NEWS, NewsCategory.FINANCE, NewsCategory.POLITICS]),
        NewsSource("CNN", 0.8, [NewsCategory.POLITICS, NewsCategory.TOP_STORIES, NewsCategory.HEALTH]),
        NewsSource("BBC", 0.92, [NewsCategory.WORLD_NEWS, NewsCategory.TECHNOLOGY, NewsCategory.TOP_STORIES]),
        NewsSource("TechCrunch", 0.85, [NewsCategory.TECHNOLOGY]),
        NewsSource("Wall Street Journal", 0.88, [NewsCategory.FINANCE, NewsCategory.TOP_STORIES]),
        NewsSource("Associated Press", 0.93, [NewsCategory.TOP_STORIES, NewsCategory.WORLD_NEWS, NewsCategory.POLITICS]),
        NewsSource("Financial Times", 0.89, [NewsCategory.FINANCE, NewsCategory.WORLD_NEWS]),
        NewsSource("The Guardian", 0.86, [NewsCategory.WORLD_NEWS, NewsCategory.HEALTH, NewsCategory.POLITICS]),
        NewsSource("NPR", 0.87, [NewsCategory.TOP_STORIES, NewsCategory.TECHNOLOGY, NewsCategory.HEALTH])
    ]