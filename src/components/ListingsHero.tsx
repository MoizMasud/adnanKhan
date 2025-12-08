import React from 'react';

const ListingsHero = () => {
  return (
    <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=3870&auto=format&fit=crop"
          alt="Property Listings"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a131e]/70 via-[#0a131e]/50 to-[#0a131e]/80" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 text-center text-white">
        <span className="font-body text-xs sm:text-sm tracking-widest text-[#b7b7b7] uppercase mb-4 sm:mb-6">
          Featured Properties
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-wide mb-4 sm:mb-8 text-white">
          Explore Cambridge Homes
        </h1>
        <div className="h-px w-16 sm:w-24 bg-[#b7b7b7] mb-4 sm:mb-8" />
        <p className="font-body text-sm sm:text-base md:text-lg lg:text-xl font-light max-w-3xl text-white/90 px-4">
          Discover exceptional homes in Cambridge and surrounding areas
        </p>
      </div>
    </section>
  );
};

export default ListingsHero;
