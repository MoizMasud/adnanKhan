import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from './ui/button';
import { useScrollAnimation } from '../hooks/use-scroll-animation';

const testimonials = [
  {
    id: 1,
    name: 'Sarah & Michael Thompson',
    location: 'Cambridge, ON',
    text: 'Adnan made our home buying experience seamless and stress-free. His knowledge of the Cambridge market is unmatched, and he helped us find our dream home within our budget. We couldn\'t be happier!',
    shortText: 'Adnan made our home buying experience seamless. His market knowledge is unmatched and helped us find our dream home!',
    rating: 5
  },
  {
    id: 2,
    name: 'David Chen',
    location: 'Waterloo, ON',
    text: 'Working with Adnan to sell our property was an absolute pleasure. He marketed our home beautifully and we received multiple offers within days. His professionalism and expertise are truly exceptional.',
    shortText: 'Working with Adnan was a pleasure. We received multiple offers within days. His professionalism is exceptional!',
    rating: 5
  },
  {
    id: 3,
    name: 'Jennifer Martinez',
    location: 'Kitchener, ON',
    text: 'Adnan\'s dedication to his clients is remarkable. He was always available to answer our questions and guided us through every step of the process. We highly recommend him to anyone looking to buy or sell.',
    shortText: 'Adnan\'s dedication is remarkable. Always available and guided us through every step. Highly recommend!',
    rating: 5
  },
  {
    id: 4,
    name: 'Robert & Elizabeth Johnson',
    location: 'Cambridge, ON',
    text: 'As first-time home buyers, we were nervous about the process. Adnan\'s patience and expertise put us at ease. He truly cares about his clients and goes above and beyond to ensure satisfaction.',
    shortText: 'As first-time buyers, Adnan\'s patience and expertise put us at ease. He truly cares about his clients!',
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation(0.2);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-[#0a131e] text-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header - More compact on mobile */}
        <div 
          ref={ref}
          className={`text-center mb-8 sm:mb-12 md:mb-16 animate-on-scroll animate-fade-up ${isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide mb-2 sm:mb-3 md:mb-4 text-white">
            Client Testimonials
          </h2>
          <div className="h-px w-12 sm:w-16 bg-white mx-auto mb-3 sm:mb-4 md:mb-6" />
          <p className="font-body text-sm sm:text-base md:text-lg text-white/80">
            What clients say about working with Adnan
          </p>
        </div>

        {/* Testimonial Carousel - More compact on mobile */}
        <div className={`relative animate-on-scroll animate-scale ${isVisible ? 'visible' : ''}`}>
          <div className="relative">
            <Quote className="absolute -top-3 sm:-top-4 md:-top-6 left-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white/10" />
            
            <div className="relative z-10 text-center px-2 sm:px-4 md:px-12">
              {/* Desktop text */}
              <p className="hidden md:block font-body text-lg md:text-xl lg:text-2xl font-light leading-relaxed text-white mb-6 sm:mb-8 md:mb-10 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Mobile shorter text */}
              <p className="md:hidden font-body text-base sm:text-lg font-light leading-relaxed text-white mb-6 italic">
                "{testimonials[currentIndex].shortText}"
              </p>

              <div className="flex flex-col items-center gap-1 sm:gap-2">
                <h4 className="font-heading text-base sm:text-lg md:text-xl text-white">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="font-body text-xs sm:text-sm text-white/60">
                  {testimonials[currentIndex].location}
                </p>
                <div className="flex gap-0.5 sm:gap-1 mt-2 sm:mt-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-white text-base sm:text-lg md:text-xl">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons - Smaller on mobile */}
          <div className="flex justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="border-white bg-transparent text-white hover:bg-white hover:text-[#0a131e] w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="border-white bg-transparent text-white hover:bg-white hover:text-[#0a131e] w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </div>

          {/* Indicators - Smaller on mobile */}
          <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 sm:h-2 transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-6 sm:w-8 bg-white' 
                    : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
