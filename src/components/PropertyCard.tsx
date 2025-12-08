import React from 'react';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { baseUrl } from '../lib/base-url';

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  image: string;
  listingDate: string;
  status: 'active' | 'pending' | 'sold';
  latitude?: number;
  longitude?: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.address}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-[#0a131e] text-white px-3 py-1 rounded-md font-body text-sm font-semibold">
          {property.status === 'active' ? 'For Sale' : property.status === 'pending' ? 'Pending' : 'Sold'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Price */}
        <div className="mb-4">
          <h3 className="font-heading text-2xl font-bold text-[#0a131e] mb-1">
            {formatPrice(property.price)}
          </h3>
          <div className="flex items-center text-[#6c757d] font-body text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.address}, {property.city}, {property.state} {property.zipCode}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-[#6c757d]" />
            <span className="font-body text-[#0a131e] font-semibold">{property.bedrooms}</span>
            <span className="font-body text-[#6c757d] text-sm">Beds</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-5 h-5 text-[#6c757d]" />
            <span className="font-body text-[#0a131e] font-semibold">{property.bathrooms}</span>
            <span className="font-body text-[#6c757d] text-sm">Baths</span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize className="w-5 h-5 text-[#6c757d]" />
            <span className="font-body text-[#0a131e] font-semibold">{formatNumber(property.sqft)}</span>
            <span className="font-body text-[#6c757d] text-sm">Sq Ft</span>
          </div>
        </div>

        {/* Property Type & CTA */}
        <div className="flex items-center justify-between">
          <span className="font-body text-sm text-[#6c757d] capitalize">{property.propertyType}</span>
          <a
            href={`${baseUrl}/property/${property.id}`}
            className="font-button text-sm font-semibold text-[#0a131e] hover:text-[#0070f3] transition-colors"
          >
            View Details →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
