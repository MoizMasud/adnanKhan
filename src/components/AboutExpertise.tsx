import React from 'react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';
import { Home, Users, TrendingUp, BarChart3, Handshake, MapPin } from 'lucide-react';

const AboutExpertise = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);

  const expertise = [
    {
      title: 'Residential Sales',
      description: 'From cozy starter homes to expansive family estates, I help clients navigate every segment of the residential market.',
      icon: Home
    },
    {
      title: 'First-Time Buyers',
      description: 'Guiding new buyers through the process with patience, education, and support to make informed decisions.',
      icon: Users
    },
    {
      title: 'Investment Properties',
      description: 'Strategic advice for investors seeking to build wealth through real estate opportunities.',
      icon: TrendingUp
    },
    {
      title: 'Market Analysis',
      description: 'In-depth market knowledge and data-driven insights to help you price and position properties effectively.',
      icon: BarChart3
    },
    {
      title: 'Negotiation',
      description: 'Strong negotiation skills that consistently deliver favorable outcomes for my clients.',
      icon: Handshake
    },
    {
      title: 'Local Expertise',
      description: 'Deep understanding of Cambridge and surrounding communities, neighborhoods, and market trends.',
      icon: MapPin
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll animate-fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <span className="font-body text-xs sm:text-sm tracking-widest text-[#b7b7b7] uppercase">
            Expertise
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light mt-3 sm:mt-4 mb-4 sm:mb-6 text-[#0a131e] px-4">
            Areas of Specialization
          </h2>
          <div className="h-px w-16 sm:w-24 bg-[#b7b7b7] mx-auto mb-4 sm:mb-8" />
          <p className="font-body text-sm sm:text-base lg:text-lg text-[#6c757d] max-w-3xl mx-auto px-4">
            Comprehensive real estate services tailored to your unique needs and goals
          </p>
        </div>

        {/* Expertise Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {expertise.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white p-6 sm:p-8 hover:shadow-2xl transition-all duration-500 animate-on-scroll animate-fade-up ${gridVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="mb-4 sm:mb-6">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#0a131e] group-hover:text-[#b7b7b7] transition-colors duration-300" />
                </div>
                
                {/* Title */}
                <h3 className="font-heading text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-[#0a131e]">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="font-body text-sm sm:text-base text-[#6c757d] leading-relaxed">
                  {item.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#b7b7b7]/30 transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutExpertise;
