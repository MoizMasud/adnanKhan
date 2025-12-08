import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&q=75',
    alt: 'Modern Luxury Home Exterior'
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1080&q=75',
    alt: 'Elegant Living Room Interior'
  },
  {
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1080&q=75',
    alt: 'Beautiful Kitchen Design'
  },
  {
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1080&q=75',
    alt: 'Stunning Home at Sunset'
  },
  {
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1080&q=75',
    alt: 'Contemporary Living Space'
  },
  {
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1080&q=75',
    alt: 'Luxury Bedroom Suite'
  },
  {
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80',
    mobileImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1080&q=75',
    alt: 'Elegant Property Exterior'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gray-900 h-screen">
      {/* Image Backgrounds */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <picture>
            <source 
              media="(max-width: 767px)" 
              srcSet={slide.mobileImage}
            />
            <source 
              media="(min-width: 768px)" 
              srcSet={slide.image}
            />
            <img
              src={slide.image}
              alt={slide.alt}
              className="h-full w-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{
                objectPosition: 'center',
                minHeight: '100%',
                minWidth: '100%'
              }}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
      ))}

      {/* Content - Changes on scroll - Hide completely on mobile */}
      {!isMobile && (
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* City Names - Visible at top, fades out on scroll */}
          <div 
            className={`transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}
            style={{ paddingTop: '75vh' }}
          >
            <p 
              style={{
                fontSize: '2.4em',
                fontWeight: 300,
                lineHeight: 0.889,
                letterSpacing: '-0.02em',
                textAlign: 'center',
                textShadow: '0 0 0.556em rgba(0, 0, 0, 0.25), 0 0 0.556em rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 0.267em',
                fontFamily: '"Made Saonara", serif'
              }}
            >
              <span style={{ color: '#ffffff' }}>CAMBRIDGE</span>
              <span style={{ fontWeight: 100, color: '#999999', fontSize: '0.8em', margin: '0 0.5em' }}>|</span>
              <span style={{ color: '#ffffff' }}>WATERLOO</span>
              <span style={{ fontWeight: 100, color: '#999999', fontSize: '0.8em', margin: '0 0.5em' }}>|</span>
              <span style={{ color: '#ffffff' }}>TORONTO</span>
              <span style={{ fontWeight: 100, color: '#999999', fontSize: '0.8em', margin: '0 0.5em' }}>|</span>
              <span style={{ color: '#ffffff' }}>OAKVILLE</span>
              <span style={{ fontWeight: 100, color: '#999999', fontSize: '0.8em', margin: '0 0.5em' }}>|</span>
              <span style={{ color: '#ffffff' }}>LONDON</span>
              <span style={{ fontWeight: 100, color: '#999999', fontSize: '0.8em', margin: '0 0.5em' }}>|</span>
              <span style={{ color: '#ffffff' }}>MISSISSAUGA</span>
            </p>
          </div>

          {/* Button - Fades in on scroll */}
          <div 
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 ${
              scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <a
              href="/listings"
              className="group relative bg-transparent font-semibold px-8 py-4 text-lg border border-white overflow-hidden transition-all duration-300"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                letterSpacing: '0.05em',
                color: '#ffffff !important'
              }}
            >
              <span 
                className="relative z-10 inline-block transition-all duration-300"
                style={{ color: '#ffffff' }}
              >
                FIND YOUR DREAM HOME
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>
      )}

      {/* Slide Indicators - Positioned at bottom on mobile */}
      <div className={`absolute ${isMobile ? 'bottom-4' : 'bottom-6'} left-1/2 transform -translate-x-1/2 flex gap-2 z-20`}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-300 ${
              index === currentSlide 
                ? `${isMobile ? 'w-6' : 'w-8'} bg-white` 
                : 'w-1 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
