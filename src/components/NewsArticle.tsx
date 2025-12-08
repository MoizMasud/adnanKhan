import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { baseUrl } from '../lib/base-url';

interface NewsArticleProps {
  title: string;
  date: string;
  excerpt: string;
  category: 'Cambridge' | 'Ontario' | 'Market Insights';
  slug: string;
}

const NewsArticle: React.FC<NewsArticleProps> = ({
  title,
  date,
  excerpt,
  category,
  slug
}) => {
  const categoryColors = {
    'Cambridge': 'bg-[#0a131e] text-white',
    'Ontario': 'bg-[#6c757d] text-white',
    'Market Insights': 'bg-[#b7b7b7] text-white'
  };

  return (
    <article className="bg-white rounded-lg p-4 sm:p-6 border-2 border-gray-200 hover:shadow-2xl hover:border-[#0a131e] transition-all duration-500 group cursor-pointer">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${categoryColors[category]} flex-shrink-0 transition-transform duration-300 group-hover:scale-105`}>
          {category}
        </span>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-[#6c757d] transition-colors duration-300 group-hover:text-[#0a131e]">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="font-body">{date}</span>
        </div>
      </div>

      <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-[#0a131e] mb-2 sm:mb-3 group-hover:text-[#1a2330] transition-all duration-300">
        {title}
      </h3>

      <p className="font-body text-sm sm:text-base text-[#6c757d] mb-3 sm:mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-[#4a5568]">
        {excerpt}
      </p>

      <a
        href={`${baseUrl}/news/${slug}`}
        className="inline-flex items-center gap-2 text-[#0a131e] font-body font-semibold text-xs sm:text-sm transition-all duration-300 group-hover:gap-4"
      >
        Read More
        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </article>
  );
};

export default NewsArticle;
