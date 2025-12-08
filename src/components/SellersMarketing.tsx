import React from 'react';
import { Camera, Globe, Users, Target } from 'lucide-react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';

const marketingStrategies = [
  {
    icon: Camera,
    title: 'Professional Photography',
    description: 'High-end photography and videography showcasing your home in the best light'
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description: 'Strategic online presence across major real estate platforms and MLS'
  },
  {
    icon: Users,
    title: 'Network Access',
    description: 'Exclusive access to my network of buyers, investors, and real estate professionals'
  },
  {
    icon: Target,
    title: 'Open Houses',
    description: 'Strategic open house events to create buzz and attract serious buyers'
  }
];

const SellersMarketing = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-24 px-6 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 animate-on-scroll animate-fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-light text-[#0a131e] mb-4">
            Strategic Marketing
          </h2>
          <div className="h-px w-16 bg-[#b7b7b7] mx-auto mb-6" />
          <p className="font-body text-lg text-[#0e1721] max-w-3xl mx-auto">
            Your property deserves exceptional marketing that attracts qualified buyers and maximizes exposure
          </p>
        </div>

        {/* Marketing Strategies Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {marketingStrategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 hover:shadow-2xl hover:-translate-y-2"
                style={{ 
                  transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                  transitionDelay: gridVisible ? `${index * 150}ms` : '0ms',
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? 'translateY(0)' : 'translateY(50px)'
                }}
              >
                <Icon className="w-12 h-12 text-[#b7b7b7] mb-6" />
                <h3 className="font-heading text-xl font-light text-[#0a131e] mb-4">
                  {strategy.title}
                </h3>
                <p className="font-body text-base text-[#0e1721] leading-relaxed">
                  {strategy.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selling Process */}
        <div 
          ref={processRef}
          className={`bg-white border border-[#e0e0e0] p-12 md:p-16 animate-on-scroll animate-scale ${processVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <h3 className="font-heading text-3xl md:text-4xl font-light text-[#0a131e] mb-4">
              The Selling Process
            </h3>
            <div className="h-px w-16 bg-[#b7b7b7] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#0a131e] mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-heading text-white">01</span>
              </div>
              <h4 className="font-heading text-xl font-light mb-4 text-[#0a131e]">
                Preparation
              </h4>
              <p className="font-body text-base text-[#0e1721] leading-relaxed">
                Home staging advice, repairs, and improvements to maximize appeal and value
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0a131e] mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-heading text-white">02</span>
              </div>
              <h4 className="font-heading text-xl font-light mb-4 text-[#0a131e]">
                Marketing
              </h4>
              <p className="font-body text-base text-[#0e1721] leading-relaxed">
                Launch comprehensive marketing campaign across MLS and all major real estate platforms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0a131e] mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-heading text-white">03</span>
              </div>
              <h4 className="font-heading text-xl font-light mb-4 text-[#0a131e]">
                Showings
              </h4>
              <p className="font-body text-base text-[#0e1721] leading-relaxed">
                Coordinate viewings and open houses, highlighting your home's best features
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#0a131e] mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-heading text-white">04</span>
              </div>
              <h4 className="font-heading text-xl font-light mb-4 text-[#0a131e]">
                Closing
              </h4>
              <p className="font-body text-base text-[#0e1721] leading-relaxed">
                Negotiate offers, manage paperwork, and guide you to a successful close
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellersMarketing;
