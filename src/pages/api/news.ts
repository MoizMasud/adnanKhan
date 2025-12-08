import type { APIRoute } from 'astro';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['media:content', 'content:encoded', 'description']
  }
});

// RSS feeds for real estate news
const RSS_FEEDS = [
  'https://www.crea.ca/feed/',  // Canadian Real Estate Association
  'https://www.mortgagebrokernews.ca/feed', // Mortgage Broker News
  'https://financialpost.com/category/real-estate/feed', // Financial Post Real Estate
];

// Helper to extract excerpt from content
function extractExcerpt(content: string, maxLength = 200): string {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '');
  // Decode HTML entities
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
  
  // Truncate to max length
  if (decoded.length <= maxLength) return decoded.trim();
  
  const truncated = decoded.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  return (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
}

// Categorize articles based on keywords
function categorizeArticle(title: string, content: string): 'Cambridge' | 'Ontario' | 'Market Insights' {
  const combined = (title + ' ' + content).toLowerCase();
  
  if (combined.includes('cambridge')) return 'Cambridge';
  if (combined.includes('ontario') || combined.includes('toronto') || combined.includes('gta')) return 'Ontario';
  return 'Market Insights';
}

export const GET: APIRoute = async () => {
  try {
    const allArticles = [];

    // Fetch from multiple RSS feeds
    for (const feedUrl of RSS_FEEDS) {
      try {
        const feed = await parser.parseURL(feedUrl);
        
        if (feed.items && feed.items.length > 0) {
          // Take only recent articles (last 5 from each feed)
          const recentItems = feed.items.slice(0, 5);
          
          for (const item of recentItems) {
            const content = item['content:encoded'] || item.content || item.description || '';
            const excerpt = extractExcerpt(content);
            
            allArticles.push({
              title: item.title || 'Untitled',
              pubDate: item.pubDate || new Date().toISOString(),
              excerpt: excerpt || 'No description available',
              source: categorizeArticle(item.title || '', content),
              link: item.link || '#',
              guid: item.guid || item.link || Math.random().toString()
            });
          }
        }
      } catch (feedError) {
        console.error(`Error fetching feed ${feedUrl}:`, feedError);
        // Continue with other feeds even if one fails
      }
    }

    // Sort by date (newest first)
    allArticles.sort((a, b) => {
      const dateA = new Date(a.pubDate).getTime();
      const dateB = new Date(b.pubDate).getTime();
      return dateB - dateA;
    });

    // Return top 12 articles
    const topArticles = allArticles.slice(0, 12);

    return new Response(
      JSON.stringify({
        success: true,
        data: topArticles,
        count: topArticles.length
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
        }
      }
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch news articles',
        data: []
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};
