import React from 'react';
import { useScrollAnimation } from '../hooks/use-scroll-animation';

const AboutStory = () => {
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation(0.2);
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - Story */}
          <div 
            ref={leftRef}
            className={`animate-on-scroll animate-fade-left ${leftVisible ? 'visible' : ''}`}
          >
            <div className="mb-4 sm:mb-6">
              <span className="font-body text-xs sm:text-sm tracking-widest text-[#0e1721] uppercase">
                My Story
              </span>
            </div>
            
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#0a131e] mb-4 sm:mb-6">
              A Passion for Real Estate
            </h2>
            
            <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mb-4 sm:mb-8" />

            <div className="space-y-4 sm:space-y-6 font-body text-sm sm:text-base lg:text-lg leading-relaxed">
              <p className="!text-[#0e1721]">
                My journey in real estate began with a simple belief: every client deserves personalized attention and expert guidance when making one of life's most important decisions.
              </p>
              
              <p className="!text-[#0e1721]">
                Over the years, I've had the privilege of helping hundreds of families find their dream homes and successfully sell their properties. What drives me is not just closing deals, but building lasting relationships and being a trusted advisor throughout the entire process.
              </p>
              
              <p className="!text-[#0e1721]">
                Cambridge and the surrounding areas hold a special place in my heart. I've witnessed the growth and transformation of our community, and I'm proud to help others discover the incredible opportunities our region has to offer.
              </p>

              <p className="!text-[#0e1721]">
                My approach is straightforward: listen carefully, communicate clearly, and work tirelessly to achieve the best possible outcome for my clients. Whether you're a first-time buyer or a seasoned investor, I'm here to guide you every step of the way.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div 
            ref={rightRef}
            className={`relative animate-on-scroll animate-fade-right ${rightVisible ? 'visible' : ''}`}
          >
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipPDCk5nSgBf6MhYmO5MRLkFZ5wnoqTo7_Y2ka_T=s1600-w1600"
                alt="Adnan Khan - Real Estate Specialist"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            {/* Decorative Element - Hidden on mobile */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-2 border-[#b7b7b7] -z-10 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
