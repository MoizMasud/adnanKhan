import React from 'react';

const LogoCarousel = () => {
  const logos = [
    {
      name: 'Bell Media',
      image: '/Bell-Media.webp',
      width: 200,
      height: 60
    },
    {
      name: 'CTV News',
      image: '/CTV-News.avif',
      width: 180,
      height: 60
    },
    {
      name: 'Virgin Radio 105.3',
      image: '/Virgin-105.3.webp',
      width: 160,
      height: 60
    },
    {
      name: 'Bounce Radio 99.5',
      image: '/Bounce-Radio.webp',
      width: 160,
      height: 60
    },
    {
      name: 'iHeart Radio',
      image: '/iHeartRadio_Logo_Vertical_Screen_RGB_Square.webp',
      width: 120,
      height: 80
    }
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="pt-2 pb-6 md:pt-4 md:pb-12 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 md:mb-8">
        <div className="text-center">
          <span className="font-body text-xs sm:text-sm tracking-widest text-[#b7b7b7] uppercase">
            As Featured In
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div className="logo-carousel-track hover:pause">
          <div className="logo-carousel-content">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="logo-item flex-shrink-0 px-4 sm:px-6 md:px-12"
              >
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="h-8 sm:h-10 md:h-12 lg:h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .logo-carousel-track {
          display: flex;
          width: 100%;
        }

        .logo-carousel-content {
          display: flex;
          align-items: center;
          animation: scroll 40s linear infinite;
        }

        .logo-carousel-track:hover .logo-carousel-content {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
        }

        @media (max-width: 640px) {
          .logo-item {
            min-width: 140px;
          }
          
          .logo-carousel-content {
            animation: scroll 25s linear infinite;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          .logo-item {
            min-width: 160px;
          }
          
          .logo-carousel-content {
            animation: scroll 30s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default LogoCarousel;
