import type { APIRoute } from 'astro';

// Generate realistic market data
function generateMarketData() {
  const data = [];
  const startYear = 2014;
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  // Base price in 2014
  let basePrice = 400000;
  
  for (let year = startYear; year <= currentYear; year++) {
    const monthsInYear = year === currentYear ? currentMonth + 1 : 12;
    
    for (let month = 0; month < monthsInYear; month++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dateStr = `${year}-${monthStr}`;
      
      // Calculate price with growth trend + seasonal variation
      const yearProgress = (year - startYear) + (month / 12);
      const annualGrowth = 0.05; // 5% average annual growth
      const growthFactor = Math.pow(1 + annualGrowth, yearProgress);
      
      // Add seasonal variation (spring/summer higher, winter lower)
      const seasonalFactor = 1 + (Math.sin((month - 2) * Math.PI / 6) * 0.03);
      
      // Add some randomness
      const randomFactor = 1 + (Math.random() * 0.02 - 0.01);
      
      const avgPrice = Math.floor(basePrice * growthFactor * seasonalFactor * randomFactor);
      
      // Days on market (generally declining over time, with seasonal variation)
      const baseDays = 35;
      const yearTrend = -yearProgress * 0.5; // Declining trend
      const seasonalDays = Math.sin((month - 2) * Math.PI / 6) * -5; // Faster in spring
      const daysOnMarket = Math.max(15, Math.floor(baseDays + yearTrend + seasonalDays + (Math.random() * 4 - 2)));
      
      data.push({
        month: dateStr,
        avgPrice,
        daysOnMarket
      });
    }
  }
  
  return data;
}

export const GET: APIRoute = async () => {
  try {
    const data = generateMarketData();
    
    return new Response(
      JSON.stringify({
        ok: true,
        data
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
    console.error('Error generating market stats:', error);
    
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'Failed to generate market statistics',
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
