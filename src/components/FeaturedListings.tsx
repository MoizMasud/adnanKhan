import React from 'react';
import { Button } from './ui/button';

// Realtor.ca URL - update this with Adnan's actual profile/listings URL
const realtorAllListingsUrl = "https://www.realtor.ca/agent/2063458/adnan-khan-215-queen-st-w-unit-201b-cambridge-ontario-n3c1g6";

const listings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3870&auto=format&fit=crop',
    price: '$2,495,000',
    address: '145 Riverside Drive',
    city: 'Cambridge, ON',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    status: 'FOR SALE'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=3870&auto=format&fit=crop',
    price: '$1,875,000',
    address: '22 Preston Heights',
    city: 'Cambridge, ON',
    beds: 4,
    baths: 3,
    sqft: '3,800',
    status: 'FOR SALE'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=3870&auto=format&fit=crop',
    price: '$3,250,000',
    address: '89 Waterfront Estates',
    city: 'Cambridge, ON',
    beds: 6,
    baths: 5,
    sqft: '5,500',
    status: 'SOLD'
  }
];

const FeaturedListings = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-wide text-[#1a1a1a] mb-3 sm:mb-4 px-4">
            Featured Listings
          </h2>
          <div className="h-px w-12 sm:w-16 bg-[#b7b7b7] mx-auto mb-4 sm:mb-6" />
          <p className="font-body text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover exceptional properties in Cambridge and surrounding areas
          </p>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
          {listings.map((listing) => (
            <div 
              key={listing.id}
              className="group cursor-pointer overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span 
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-button tracking-wider transition-colors duration-300 ${
                      listing.status === 'SOLD' 
                        ? 'bg-[#0a131e] text-white' 
                        : 'bg-white text-[#0a131e] group-hover:bg-[#0a131e] group-hover:text-white'
                    }`}
                    style={listing.status === 'FOR SALE' ? { border: '0.5px solid #0a131e' } : undefined}
                  >
                    {listing.status}
                  </span>
                </div>
              </div>

              {/* Listing Details */}
              <div className="p-4 sm:p-6">
                <h3 className="font-heading text-xl sm:text-2xl font-light text-[#b7b7b7] mb-1 sm:mb-2">
                  {listing.price}
                </h3>
                <p className="font-body text-base sm:text-lg text-[#1a1a1a] mb-0.5 sm:mb-1">
                  {listing.address}
                </p>
                <p className="font-body text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                  {listing.city}
                </p>

                {/* Property Stats */}
                <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-700 border-t border-gray-200 pt-3 sm:pt-4">
                  <span className="font-body">{listing.beds} Beds</span>
                  <span className="text-gray-300">|</span>
                  <span className="font-body">{listing.baths} Baths</span>
                  <span className="text-gray-300">|</span>
                  <span className="font-body">{listing.sqft} sqft</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a href={realtorAllListingsUrl} target="_blank" rel="noreferrer">
            <Button 
              size="lg"
              variant="outline"
              className="bg-white hover:bg-[#0a131e] hover:text-white border-2 border-[#0a131e] text-[#0a131e] font-button tracking-wider px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
            >
              VIEW ALL LISTINGS
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
