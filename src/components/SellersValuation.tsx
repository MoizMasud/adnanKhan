import React, { useState } from 'react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import { Calculator, TrendingUp, MapPin } from 'lucide-react';

const SellersValuation = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Image - Hidden on mobile */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden order-2 lg:order-1 hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
              alt="Home Valuation"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#0a131e] mb-3 sm:mb-4">
              Accurate Home Valuation
            </h2>
            <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mb-4 sm:mb-8" />
            
            <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] leading-relaxed mb-4 sm:mb-6">
              Understanding your home's true market value is the foundation of a successful sale. I provide comprehensive market analysis that considers current trends, recent comparable sales, and your property's unique features.
            </p>

            <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] leading-relaxed mb-6 sm:mb-8">
              My valuation process combines advanced market data with years of local expertise to ensure your home is priced competitively to attract serious buyers while maximizing your return.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-10">
              <div className="flex items-start gap-3 sm:gap-4">
                <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-[#b7b7b7] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-base sm:text-lg text-[#0a131e] mb-1 sm:mb-2">
                    Comprehensive Market Analysis
                  </h4>
                  <p className="font-body text-sm sm:text-base text-[#0e1721]">
                    Detailed evaluation of comparable properties, market trends, and local factors
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#b7b7b7] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-base sm:text-lg text-[#0a131e] mb-1 sm:mb-2">
                    Strategic Pricing
                  </h4>
                  <p className="font-body text-sm sm:text-base text-[#0e1721]">
                    Price your home to attract the right buyers and generate competitive offers
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#b7b7b7] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-heading text-base sm:text-lg text-[#0a131e] mb-1 sm:mb-2">
                    Local Expertise
                  </h4>
                  <p className="font-body text-sm sm:text-base text-[#0e1721]">
                    Deep knowledge of Cambridge neighborhoods and buyer preferences
                  </p>
                </div>
              </div>
            </div>

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
                REQUEST HOME EVALUATION
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellersValuation;
