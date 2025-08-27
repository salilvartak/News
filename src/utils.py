"""
Utility functions for the news aggregation system.
"""
import time
import random
import logging
from typing import List
from config import SIMULATION_DELAY_RANGE

logger = logging.getLogger(__name__)

def simulate_api_fetch(source_name: str, article_count: int = 1) -> None:
    """Simulate API fetching with realistic delays and messages."""
    delay = random.uniform(*SIMULATION_DELAY_RANGE)
    
    print(f"🌐 Connecting to {source_name}...")
    time.sleep(delay * 0.3)
    
    print(f"📡 Fetching articles from {source_name}...")
    time.sleep(delay * 0.4)
    
    print(f"✅ Retrieved {article_count} article(s) from {source_name}")
    time.sleep(delay * 0.3)

def setup_logging(log_level: str = 'INFO') -> None:
    """Set up logging configuration."""
    logging.basicConfig(
        level=getattr(logging, log_level.upper()),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        datefmt='%H:%M:%S'
    )

def print_processing_step(step_name: str, details: str = '') -> None:
    """Print a processing step with consistent formatting."""
    print(f"\n🔄 {step_name}")
    if details:
        print(f"   {details}")

def print_statistics(articles: List, duplicate_count: int = 0) -> None:
    """Print processing statistics."""
    print(f"\n📊 PROCESSING STATISTICS:")
    print(f"   Total articles processed: {len(articles)}")
    print(f"   Duplicates removed: {duplicate_count}")
    print(f"   Unique articles: {len(articles)}")
    
    if articles:
        avg_score = sum(a.relevance_score for a in articles) / len(articles)
        print(f"   Average relevance score: {avg_score:.2f}")
        
        # Count by category
        from collections import Counter
        category_counts = Counter(a.category.value for a in articles)
        print(f"   Articles by category:")
        for category, count in category_counts.most_common():
            print(f"     - {category}: {count}")

def print_banner() -> None:
    """Print application banner."""
    banner = """
╔══════════════════════════════════════════════════════════════╗
║                    NEWS AGGREGATION SYSTEM                   ║
║              Automated News Collection & Analysis            ║
╚══════════════════════════════════════════════════════════════╝
"""
    print(banner)

def save_to_file(content: str, filename: str) -> None:
    """Save content to a file."""
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"💾 Content saved to {filename}")
    except Exception as e:
        logger.error(f"Failed to save file {filename}: {e}")
        print(f"❌ Failed to save {filename}: {e}")