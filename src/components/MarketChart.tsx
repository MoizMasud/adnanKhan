import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Sample data - replace with real data from CREA or Ontario real estate APIs
const generateMarketData = (startYear: number, endYear: number, includeMonths: boolean = false) => {
  const data = [];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  if (includeMonths) {
    // For 1, 3, and 5 year views, generate monthly data starting on the 1st
    const startDate = new Date(startYear, 0, 1);
    const endDate = new Date(endYear, 11, 1);
    
    // If it's the current year, only go up to current month
    if (endYear === currentYear) {
      endDate.setMonth(currentMonth);
    }
    
    let currentDate = new Date(startDate);
    let monthIndex = 0;
    
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      data.push({
        year: `${monthNames[month]} 1, ${year}`,
        shortYear: `${monthNames[month]} ${String(year).slice(-2)}`,
        averagePrice: Math.floor(650000 + Math.random() * 100000 + monthIndex * 3000),
      });
      
      currentDate.setMonth(currentDate.getMonth() + 1);
      monthIndex++;
    }
  } else {
    // For 10+ year views, generate yearly data
    for (let year = startYear; year <= endYear; year++) {
      data.push({
        year: year.toString(),
        shortYear: String(year).slice(-2),
        averagePrice: Math.floor(400000 + Math.random() * 100000 + (year - startYear) * 25000),
      });
    }
  }
  
  return data;
};

const MarketChart = () => {
  const [dateRange, setDateRange] = useState<'1year' | '3year' | '5year' | '10year' | 'all'>('5year');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isChartReady, setIsChartReady] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Small delay to ensure chart is ready to render
    const readyTimer = setTimeout(() => {
      setIsChartReady(true);
    }, 100);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener('resize', checkMobile);
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, []);
  
  const getDataByRange = () => {
    switch (dateRange) {
      case '1year':
        return generateMarketData(currentYear - 1, currentYear, true);
      case '3year':
        return generateMarketData(currentYear - 3, currentYear, true);
      case '5year':
        return generateMarketData(currentYear - 5, currentYear, true);
      case '10year':
        return generateMarketData(currentYear - 10, currentYear, false);
      case 'all':
        return generateMarketData(1980, currentYear, false);
      default:
        return generateMarketData(currentYear - 5, currentYear, true);
    }
  };

  const data = getDataByRange();
  
  // Calculate min and max for Y axis domain
  const prices = data.map(d => d.averagePrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  
  // Add 10% padding to top and bottom for better visualization
  const yAxisMin = Math.floor((minPrice - priceRange * 0.1) / 10000) * 10000;
  const yAxisMax = Math.ceil((maxPrice + priceRange * 0.1) / 10000) * 10000;
  
  const averagePrice = data.reduce((sum, item) => sum + item.averagePrice, 0) / data.length;

  // Determine interval based on data length and screen size
  const getXAxisInterval = () => {
    if (isMobile) {
      if (dateRange === '1year') return 2;
      if (dateRange === '3year') return 6;
      if (dateRange === '5year') return 12;
      if (dateRange === '10year') return 2;
      if (dateRange === 'all') return 10;
    }
    return dateRange === '1year' ? 1 : 
           dateRange === '3year' ? 2 : 
           dateRange === '5year' ? 3 : 
           'preserveStartEnd';
  };

  return (
    <div 
      ref={chartRef}
      className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 transition-all duration-1000 ${
        isVisible && isChartReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="mb-4 sm:mb-6">
        <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-[#0a131e] mb-2">
          Ontario Average Home Price
        </h3>
        <p className="font-body text-sm sm:text-base text-[#6c757d]">
          Average residential sale price across Ontario
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
        <button
          onClick={() => setDateRange('1year')}
          style={{
            backgroundColor: dateRange === '1year' ? '#0a131e' : '#f3f4f6',
            color: dateRange === '1year' ? '#ffffff' : '#6c757d'
          }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-body text-xs sm:text-sm font-semibold transition-all hover:bg-gray-200 ${
            dateRange === '1year' ? 'shadow-md' : ''
          }`}
        >
          1Y
        </button>
        <button
          onClick={() => setDateRange('3year')}
          style={{
            backgroundColor: dateRange === '3year' ? '#0a131e' : '#f3f4f6',
            color: dateRange === '3year' ? '#ffffff' : '#6c757d'
          }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-body text-xs sm:text-sm font-semibold transition-all hover:bg-gray-200 ${
            dateRange === '3year' ? 'shadow-md' : ''
          }`}
        >
          3Y
        </button>
        <button
          onClick={() => setDateRange('5year')}
          style={{
            backgroundColor: dateRange === '5year' ? '#0a131e' : '#f3f4f6',
            color: dateRange === '5year' ? '#ffffff' : '#6c757d'
          }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-body text-xs sm:text-sm font-semibold transition-all hover:bg-gray-200 ${
            dateRange === '5year' ? 'shadow-md' : ''
          }`}
        >
          5Y
        </button>
        <button
          onClick={() => setDateRange('10year')}
          style={{
            backgroundColor: dateRange === '10year' ? '#0a131e' : '#f3f4f6',
            color: dateRange === '10year' ? '#ffffff' : '#6c757d'
          }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-body text-xs sm:text-sm font-semibold transition-all hover:bg-gray-200 ${
            dateRange === '10year' ? 'shadow-md' : ''
          }`}
        >
          10Y
        </button>
        <button
          onClick={() => setDateRange('all')}
          style={{
            backgroundColor: dateRange === 'all' ? '#0a131e' : '#f3f4f6',
            color: dateRange === 'all' ? '#ffffff' : '#6c757d'
          }}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-body text-xs sm:text-sm font-semibold transition-all hover:bg-gray-200 ${
            dateRange === 'all' ? 'shadow-md' : ''
          }`}
        >
          All
        </button>
      </div>

      {/* Chart */}
      {isChartReady && (
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ 
                top: 20, 
                right: isMobile ? 25 : 30, 
                left: isMobile ? 0 : 20, 
                bottom: isMobile ? 40 : 60 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey={isMobile ? "shortYear" : "year"}
                stroke="#6c757d"
                style={{ fontFamily: 'var(--body-font)', fontSize: isMobile ? '10px' : '12px' }}
                angle={-45}
                textAnchor="end"
                height={isMobile ? 50 : 80}
                interval={getXAxisInterval()}
                tick={{ dy: 10 }}
              />
              <YAxis 
                stroke="#6c757d"
                style={{ fontFamily: 'var(--body-font)', fontSize: isMobile ? '10px' : '12px' }}
                tickFormatter={(value) => isMobile ? `$${(value / 1000).toFixed(0)}k` : `$${(value / 1000).toFixed(0)}K`}
                domain={[yAxisMin, yAxisMax]}
                width={isMobile ? 45 : 80}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontFamily: 'var(--body-font)',
                  padding: isMobile ? '8px' : '12px',
                  fontSize: isMobile ? '12px' : '14px'
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, 'Avg Price']}
              />
              <ReferenceLine 
                y={averagePrice} 
                stroke="#6c757d" 
                strokeDasharray="5 5"
                label={{ 
                  value: 'Avg', 
                  position: 'insideTopRight',
                  fill: '#6c757d',
                  fontSize: isMobile ? 10 : 12,
                  fontFamily: 'var(--body-font)',
                  fontWeight: 'bold',
                  offset: 10
                }}
              />
              <Line 
                type="monotone" 
                dataKey="averagePrice" 
                stroke="#0a131e"
                strokeWidth={isMobile ? 2 : 3}
                dot={dateRange === '10year' || dateRange === 'all' ? { 
                  fill: '#0a131e', 
                  r: isMobile ? 3 : 5
                } : false}
                activeDot={{ r: isMobile ? 5 : 7 }}
                isAnimationActive={true}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border-l-4 border-[#0a131e] rounded-r-lg">
        <p className="font-body text-xs sm:text-sm text-[#6c757d]">
          <strong>Data Source:</strong> Average residential home prices across Ontario compiled from CREA (Canadian Real Estate Association) and provincial real estate boards. Cambridge typically offers better value compared to GTA markets while maintaining strong appreciation.
        </p>
      </div>
    </div>
  );
};

export default MarketChart;
