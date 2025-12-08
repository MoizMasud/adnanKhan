import React, { useState } from 'react';
import { Button } from './ui/button';
import { baseUrl } from '../lib/base-url';
import { useScrollAnimation } from '../hooks/use-scroll-animation';

const allListings = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop',
    price: '$2,495,000',
    address: '145 Riverside Drive',
    city: 'Cambridge, ON',
    beds: 5,
    baths: 4,
    sqft: '4,200',
    status: 'FOR SALE',
    type: 'sale'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop',
    price: '$1,875,000',
    address: '22 Preston Heights',
    city: 'Cambridge, ON',
    beds: 4,
    baths: 3,
    sqft: '3,800',
    status: 'FOR SALE',
    type: 'sale'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?q=80&w=2078&auto=format&fit=crop',
    price: '$3,250,000',
    address: '89 Waterfront Estates',
    city: 'Cambridge, ON',
    beds: 6,
    baths: 5,
    sqft: '5,500',
    status: 'SOLD',
    type: 'sold'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop',
    price: '$1,650,000',
    address: '78 Grand Avenue',
    city: 'Cambridge, ON',
    beds: 4,
    baths: 3,
    sqft: '3,500',
    status: 'FOR SALE',
    type: 'sale'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop',
    price: '$2,890,000',
    address: '156 Hilltop Manor',
    city: 'Cambridge, ON',
    beds: 5,
    baths: 4,
    sqft: '4,800',
    status: 'SOLD',
    type: 'sold'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
    price: '$4,250,000',
    address: '45 Lakeside Drive',
    city: 'Cambridge, ON',
    beds: 6,
    baths: 6,
    sqft: '6,200',
    status: 'FOR SALE',
    type: 'sale'
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2074&auto=format&fit=crop',
    price: '$1,995,000',
    address: '234 Heritage Court',
    city: 'Cambridge, ON',
    beds: 4,
    baths: 3,
    sqft: '3,900',
    status: 'FOR SALE',
    type: 'sale'
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    price: '$2,125,000',
    address: '67 Royal Crescent',
    city: 'Cambridge, ON',
    beds: 5,
    baths: 4,
    sqft: '4,100',
    status: 'SOLD',
    type: 'sold'
  }
];

const ListingsGrid = () => {
  const [filter, setFilter] = useState('all');
  const [isHovering, setIsHovering] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.2);

  const filteredListings = filter === 'all' 
    ? allListings 
    : allListings.filter(listing => listing.type === filter);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Filter Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <Button
            onClick={() => handleFilterChange('all')}
            className={`font-button tracking-wider px-6 sm:px-8 py-3 text-xs sm:text-sm transition-all duration-300 ${
              filter === 'all' 
                ? 'bg-[#0a131e] text-white border-2 border-[#0a131e] hover:bg-[#1a2330]' 
                : 'bg-transparent text-[#0a131e] border-2 border-[#0a131e] hover:bg-[#0a131e] hover:text-white'
            }`}
          >
            ALL PROPERTIES
          </Button>
          <Button
            onClick={() => handleFilterChange('sale')}
            className={`font-button tracking-wider px-6 sm:px-8 py-3 text-xs sm:text-sm transition-all duration-300 ${
              filter === 'sale' 
                ? 'bg-[#0a131e] text-white border-2 border-[#0a131e] hover:bg-[#1a2330]' 
                : 'bg-transparent text-[#0a131e] border-2 border-[#0a131e] hover:bg-[#0a131e] hover:text-white'
            }`}
          >
            FOR SALE
          </Button>
          <Button
            onClick={() => handleFilterChange('sold')}
            className={`font-button tracking-wider px-6 sm:px-8 py-3 text-xs sm:text-sm transition-all duration-300 ${
              filter === 'sold' 
                ? 'bg-[#0a131e] text-white border-2 border-[#0a131e] hover:bg-[#1a2330]' 
                : 'bg-transparent text-[#0a131e] border-2 border-[#0a131e] hover:bg-[#0a131e] hover:text-white'
            }`}
          >
            SOLD
          </Button>
        </div>

        {/* Listings Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredListings.map((listing, index) => (
            <div 
              key={listing.id}
              className={`group cursor-pointer overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500 animate-on-scroll animate-fade-up ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                <img
                  src={listing.image}
                  alt={listing.address}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-button tracking-wider transition-colors duration-300 ${
                    listing.status === 'SOLD' 
                      ? 'bg-[#0a131e] text-white' 
                      : 'bg-white text-[#0a131e] border-2 border-[#0a131e] group-hover:bg-[#0a131e] group-hover:text-white'
                  }`}>
                    {listing.status}
                  </span>
                </div>
              </div>

              {/* Listing Details */}
              <div className="p-4 sm:p-6">
                <h3 className="font-heading text-xl sm:text-2xl font-light mb-1 sm:mb-2" style={{ color: '#0a131e' }}>
                  {listing.price}
                </h3>
                <p className="font-body text-base sm:text-lg text-[#0a131e] mb-0.5 sm:mb-1">
                  {listing.address}
                </p>
                <p className="font-body text-xs sm:text-sm text-[#0e1721] mb-3 sm:mb-4">
                  {listing.city}
                </p>

                {/* Property Stats */}
                <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm text-[#0e1721] border-t border-gray-200 pt-3 sm:pt-4">
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

        {/* Contact CTA */}
        <div 
          ref={ctaRef}
          className={`text-center mt-10 sm:mt-12 md:mt-16 pt-10 sm:pt-12 md:pt-16 border-t border-gray-200 animate-on-scroll animate-fade-up ${ctaVisible ? 'visible' : ''}`}
        >
          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-light text-[#0a131e] mb-3 sm:mb-4 px-4">
            Looking for something specific?
          </h3>
          <p className="font-body text-sm sm:text-base lg:text-lg text-[#0e1721] mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Let me help you find the perfect property that meets your unique needs and preferences.
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
              CONTACT ADNAN
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ListingsGrid;
