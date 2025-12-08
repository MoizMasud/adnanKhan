import React, { useState } from 'react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import { useScrollAnimation } from '../hooks/use-scroll-animation';

const AboutPreview = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation(0.2);
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation(0.2);

  return (
    <section className="py-8 sm:py-12 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          {/* Image Side - Smaller on mobile */}
          <div 
            ref={imageRef}
            className={`relative h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden order-2 lg:order-1 animate-on-scroll animate-fade-left ${imageVisible ? 'visible' : ''}`}
          >
            <img
              src="https://lh3.googleusercontent.com/p/AF1QipP4NGt8JK-_zmcDeB--zx8EVR8nQUkcypBpMv7U=s680-w680-h510"
              alt="Adnan Khan - Professional Real Estate Agent"
              className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Content Side - More compact on mobile */}
          <div 
            ref={contentRef}
            className={`order-1 lg:order-2 animate-on-scroll animate-fade-right ${contentVisible ? 'visible' : ''}`}
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#0a131e] mb-3 sm:mb-4 md:mb-6">
              Meet Adnan Khan
            </h2>
            
            <div className="h-px w-10 sm:w-12 md:w-16 bg-[#b7b7b7] mb-4 sm:mb-6 md:mb-8" />

            {/* Condensed text on mobile, full on desktop */}
            <div className="hidden md:block">
              <p className="font-body text-sm sm:text-base text-[#6c757d] leading-relaxed mb-4 sm:mb-6">
                With over a decade of experience in real estate, Adnan Khan has established himself as Cambridge and Ontario's trusted real estate specialist. His dedication to excellence and deep understanding of the local market have helped countless clients achieve their real estate goals.
              </p>

              <p className="font-body text-sm sm:text-base text-[#6c757d] leading-relaxed mb-6 sm:mb-8">
                Adnan's approach combines market expertise with personalized service, ensuring every client receives the attention and results they deserve. Whether you're buying your first home or selling your property, Adnan's commitment to your success is unwavering.
              </p>
            </div>

            {/* Mobile condensed version */}
            <div className="md:hidden">
              <p className="font-body text-sm text-[#6c757d] leading-relaxed mb-4">
                With over a decade of experience, Adnan Khan is Cambridge's trusted real estate specialist, combining market expertise with personalized service to help clients achieve their goals.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-6 md:mb-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#b7b7b7',
                    transform: 'rotate(45deg)'
                  }}
                />
                <p className="font-body text-xs sm:text-sm text-[#6c757d] !mb-0">
                  <span className="font-semibold text-[#0a131e]">5+ Years</span> of Excellence
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#b7b7b7',
                    transform: 'rotate(45deg)'
                  }}
                />
                <p className="font-body text-xs sm:text-sm text-[#6c757d] !mb-0">
                  <span className="font-semibold text-[#0a131e]">$10M+</span> in Sales
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div 
                  className="flex-shrink-0"
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: '#b7b7b7',
                    transform: 'rotate(45deg)'
                  }}
                />
                <p className="font-body text-xs sm:text-sm text-[#6c757d] !mb-0">
                  <span className="font-semibold text-[#0a131e]">Cambridge Expert</span>
                </p>
              </div>
            </div>

            <a href={`${baseUrl}/about`}>
              <Button 
                size="lg"
                className="font-button tracking-wider px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 transition-all duration-300 !bg-transparent hover:!bg-[#0a131e] text-xs sm:text-sm md:text-base w-full sm:w-auto"
                style={{
                  backgroundColor: isHovering ? '#0a131e !important' : 'transparent !important',
                  color: isHovering ? 'white' : '#0a131e',
                  borderWidth: '2px',
                  borderColor: '#0a131e'
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                LEARN MORE
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
