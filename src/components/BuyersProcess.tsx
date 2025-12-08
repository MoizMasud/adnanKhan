import React from 'react';
import { Search, FileText, Key, Home } from 'lucide-react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';
import MortgageCalculator from './MortgageCalculator';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Initial Consultation',
    description: 'We discuss your needs, budget, preferred locations, and timeline. Understanding your vision is the first step to finding your perfect home.'
  },
  {
    number: '02',
    icon: FileText,
    title: 'Property Search & Viewings',
    description: 'Access exclusive listings and schedule viewings. I\'ll provide detailed market insights and help you evaluate each property objectively.'
  },
  {
    number: '03',
    icon: Key,
    title: 'Offer & Negotiation',
    description: 'Craft a competitive offer and negotiate the best terms. My expertise ensures you get the best possible deal while protecting your interests.'
  },
  {
    number: '04',
    icon: Home,
    title: 'Closing & Beyond',
    description: 'Navigate inspections, financing, and paperwork smoothly. I\'ll be with you through closing and beyond to ensure a seamless transition.'
  }
];

const BuyersProcess = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.2);
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation(0.1);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 sm:mb-12 md:mb-16 animate-on-scroll animate-fade-up ${headerVisible ? 'visible' : ''}`}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#0a131e] mb-3 sm:mb-4 px-4">
            Your Buying Journey
          </h2>
          <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mx-auto mb-4 sm:mb-6" />
          <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] max-w-3xl mx-auto px-4">
            A streamlined, stress-free process designed to help you find and secure your dream home
          </p>
        </div>

        {/* Steps */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`relative group animate-on-scroll animate-fade-up ${gridVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="bg-[#f8f8f8] p-6 sm:p-8 h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="font-heading text-4xl sm:text-5xl font-light text-[#b7b7b7]">
                      {step.number}
                    </span>
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0a131e]" />
                  </div>
                  
                  <h3 className="font-heading text-lg sm:text-xl font-light text-[#0a131e] mb-3 sm:mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="font-body text-sm sm:text-base text-[#0e1721] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Line (hidden on mobile and last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-[#b7b7b7]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Mortgage Calculator CTA */}
        <div className="mt-10 sm:mt-12 md:mt-16 text-center">
          <div className="bg-[#f8f8f8] p-6 sm:p-8 md:p-12 rounded-lg">
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-light text-[#0a131e] mb-3 sm:mb-4 px-4">
              Calculate Your Budget
            </h3>
            <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Use our mortgage calculator to estimate your monthly payments and determine what you can afford
            </p>
            <MortgageCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyersProcess;
