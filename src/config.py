"""
Configuration settings for the news aggregation system.
"""
from models import NewsCategory

# Keyword weights for relevance scoring
KEYWORD_WEIGHTS = {
    'high_priority': 3.0,
    'medium_priority': 2.0,
    'low_priority': 1.0
}

# Category-specific keywords for filtering
CATEGORY_KEYWORDS = {
    NewsCategory.FINANCE: {
        'high_priority': ['federal reserve', 'interest rates', 'stock market', 'cryptocurrency', 'banking'],
        'medium_priority': ['investment', 'economy', 'inflation', 'GDP', 'earnings'],
        'low_priority': ['trading', 'currency', 'bonds', 'commodities', 'financial']
    },
    NewsCategory.TECHNOLOGY: {
        'high_priority': ['artificial intelligence', 'quantum computing', 'breakthrough', 'innovation'],
        'medium_priority': ['startup', 'tech stocks', 'cybersecurity', 'data breach', 'automation'],
        'low_priority': ['software', 'hardware', 'internet', 'digital', 'computing']
    },
    NewsCategory.WORLD_NEWS: {
        'high_priority': ['climate summit', 'global agreement', 'international', 'trade war'],
        'medium_priority': ['european union', 'trade agreement', 'diplomatic', 'treaty'],
        'low_priority': ['foreign', 'international', 'global', 'worldwide', 'overseas']
    },
    NewsCategory.TOP_STORIES: {
        'high_priority': ['breaking', 'historic', 'milestone', 'unprecedented'],
        'medium_priority': ['major', 'significant', 'important', 'critical'],
        'low_priority': ['news', 'report', 'update', 'announcement', 'development']
    },
    NewsCategory.HEALTH: {
        'high_priority': ['breakthrough', 'clinical trials', 'medical breakthrough', 'cure'],
        'medium_priority': ['treatment', 'healthcare', 'research', 'study'],
        'low_priority': ['medical', 'health', 'wellness', 'patient', 'hospital']
    },
    NewsCategory.POLITICS: {
        'high_priority': ['presidential election', 'campaign', 'voting', 'legislation'],
        'medium_priority': ['political', 'government', 'policy', 'congress'],
        'low_priority': ['politician', 'party', 'debate', 'poll', 'candidate']
    }
}

# Sentiment analysis keywords
SENTIMENT_KEYWORDS = {
    'positive': [
        'breakthrough', 'success', 'growth', 'improvement', 'achievement', 'milestone',
        'recovery', 'promising', 'optimistic', 'surge', 'rally', 'gains', 'progress'
    ],
    'negative': [
        'crisis', 'decline', 'collapse', 'threat', 'risk', 'concern', 'breach',
        'disruption', 'volatility', 'uncertainty', 'headwinds', 'challenges', 'problems'
    ]
}

# Duplicate detection settings
SIMILARITY_THRESHOLD = 0.7
DUPLICATE_TITLE_THRESHOLD = 0.8

# Processing settings
SIMULATION_DELAY_RANGE = (0.5, 2.0)  # seconds
MAX_SUMMARY_LENGTH = 150
ARTICLES_PER_SECTION = 5

# Output formatting
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily News Digest - {date}</title>
    <style>
        body {{
            font-family: 'Georgia', serif;
            line-height: 1.6;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }}
        .header {{
            text-align: center;
            border-bottom: 3px solid #2c3e50;
            margin-bottom: 40px;
            padding-bottom: 20px;
        }}
        .header h1 {{
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 10px;
        }}
        .date {{
            color: #7f8c8d;
            font-size: 1.2em;
        }}
        .section {{
            background: white;
            margin: 30px 0;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }}
        .section-title {{
            color: #2c3e50;
            font-size: 1.8em;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }}
        .summary {{
            background: #ecf0f1;
            padding: 15px;
            border-left: 4px solid #3498db;
            margin-bottom: 25px;
            font-style: italic;
        }}
        .article {{
            border-bottom: 1px solid #ecf0f1;
            padding: 15px 0;
        }}
        .article:last-child {{
            border-bottom: none;
        }}
        .article-title {{
            color: #2c3e50;
            font-size: 1.3em;
            font-weight: bold;
            margin-bottom: 8px;
        }}
        .article-meta {{
            color: #7f8c8d;
            font-size: 0.9em;
            margin-bottom: 10px;
        }}
        .article-content {{
            margin-bottom: 10px;
        }}
        .tags {{
            margin-top: 10px;
        }}
        .tag {{
            background: #3498db;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            margin-right: 5px;
        }}
        .relevance-score {{
            background: #e74c3c;
            color: white;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 0.8em;
            float: right;
        }}
        .sentiment-positive {{ background: #27ae60; }}
        .sentiment-negative {{ background: #e74c3c; }}
        .sentiment-neutral {{ background: #95a5a6; }}
    </style>
</head>
<body>
    {content}
</body>
</html>
"""