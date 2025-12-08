import React from 'react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';

const SellersProcess = () => {
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Selling Process */}
        <div 
          ref={processRef}
          className={`bg-white border border-[#e0e0e0] p-6 sm:p-8 md:p-12 lg:p-16 animate-on-scroll animate-scale ${processVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-light text-[#0a131e] mb-3 sm:mb-4 px-4">
              The Selling Process
            </h2>
            <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0a131e] mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-heading text-white">01</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-light mb-3 sm:mb-4 text-[#0a131e]">
                Preparation
              </h3>
              <p className="font-body text-sm sm:text-base text-[#0e1721] leading-relaxed">
                Home staging advice, repairs, and improvements to maximize appeal and value
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0a131e] mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-heading text-white">02</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-light mb-3 sm:mb-4 text-[#0a131e]">
                Marketing
              </h3>
              <p className="font-body text-sm sm:text-base text-[#0e1721] leading-relaxed">
                Launch comprehensive marketing campaign across MLS and all major real estate platforms
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0a131e] mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-heading text-white">03</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-light mb-3 sm:mb-4 text-[#0a131e]">
                Showings
              </h3>
              <p className="font-body text-sm sm:text-base text-[#0e1721] leading-relaxed">
                Coordinate viewings and open houses, highlighting your home's best features
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0a131e] mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                <span className="text-xl sm:text-2xl font-heading text-white">04</span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-light mb-3 sm:mb-4 text-[#0a131e]">
                Closing
              </h3>
              <p className="font-body text-sm sm:text-base text-[#0e1721] leading-relaxed">
                Negotiate offers, manage paperwork, and guide you to a successful close
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellersProcess;
