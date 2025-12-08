import React, { useState } from 'react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import { Shield, TrendingUp, Users, Award } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: 'Expert Negotiation',
    description: 'Get the best price and terms with proven negotiation strategies backed by years of experience.'
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Access to comprehensive market data and trends to make informed decisions about your investment.'
  },
  {
    icon: Users,
    title: 'Professional Network',
    description: 'Connect with trusted mortgage brokers, inspectors, lawyers, and contractors through my extensive network.'
  },
  {
    icon: Award,
    title: 'White-Glove Service',
    description: 'Personalized attention and support throughout your entire home buying journey and beyond.'
  }
];

const BuyersWhy = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#0a131e] mb-3 sm:mb-4 px-4">
            Why Work With Adnan
          </h2>
          <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mx-auto mb-4 sm:mb-6" />
          <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] max-w-3xl mx-auto px-4">
            Experience the difference of working with a dedicated professional who puts your interests first
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="bg-white p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#b7b7b7] mb-4 sm:mb-6" />
                <h3 className="font-heading text-xl sm:text-2xl font-light text-[#0a131e] mb-3 sm:mb-4">
                  {benefit.title}
                </h3>
                <p className="font-body text-sm sm:text-base text-[#0e1721] leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="bg-white p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-[#0a131e] mb-4 sm:mb-6">
                First-Time Buyer?
              </h3>
              <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] leading-relaxed mb-4 sm:mb-6">
                Buying your first home is an exciting milestone. I specialize in guiding first-time buyers through every step, explaining the process clearly and ensuring you feel confident in your decisions.
              </p>
              <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] leading-relaxed mb-6 sm:mb-8">
                From understanding mortgage pre-approval to navigating closing costs, I'll be your trusted advisor throughout the entire journey.
              </p>
              <a href={`${baseUrl}/contact`}>
                <Button 
                  size="lg"
                  className="font-button tracking-wider px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base transition-all duration-300 !bg-transparent hover:!bg-[#0a131e] w-full sm:w-auto"
                  style={{
                    backgroundColor: isHovering ? '#0a131e !important' : 'transparent !important',
                    color: isHovering ? 'white' : '#0a131e',
                    borderWidth: '2px',
                    borderColor: isHovering ? 'white' : '#0a131e'
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  SCHEDULE A CONSULTATION
                </Button>
              </a>
            </div>

            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden order-first lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084&auto=format&fit=crop"
                alt="First Time Buyers"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuyersWhy;
