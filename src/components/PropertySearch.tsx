import React, { useState, useEffect } from 'react';
import SearchFilters, { SearchParams } from './SearchFilters';
import PropertyCard, { Property } from './PropertyCard';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

// Sample data - replace with actual IDX API calls
const generateSampleProperties = (): Property[] => {
  const addresses = [
    { street: '123 Main St', city: 'Cambridge', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800' },
    { street: '456 Oak Avenue', city: 'Kitchener', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800' },
    { street: '789 Maple Drive', city: 'Waterloo', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800' },
    { street: '321 Elm Street', city: 'Cambridge', image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800' },
    { street: '654 Pine Road', city: 'Guelph', image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800' },
    { street: '987 Cedar Lane', city: 'Cambridge', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800' },
    { street: '159 Birch Court', city: 'Kitchener', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800' },
    { street: '753 Willow Way', city: 'Waterloo', image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800' },
  ];

  const propertyTypes = ['house', 'condo', 'townhouse'];
  const statuses: ('active' | 'pending' | 'sold')[] = ['active', 'active', 'active', 'pending'];

  return addresses.map((addr, index) => ({
    id: `prop-${index + 1}`,
    address: addr.street,
    city: addr.city,
    state: 'ON',
    zipCode: `N${1 + index}R 2B${index}`,
    price: Math.floor(Math.random() * 500000) + 400000,
    bedrooms: Math.floor(Math.random() * 4) + 2,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    sqft: Math.floor(Math.random() * 1500) + 1500,
    propertyType: propertyTypes[Math.floor(Math.random() * propertyTypes.length)],
    image: addr.image,
    listingDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    latitude: 43.3616 + (Math.random() - 0.5) * 0.1,
    longitude: -80.3144 + (Math.random() - 0.5) * 0.1,
  }));
};

const PropertySearch = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  useEffect(() => {
    // Simulate API call - replace with actual IDX API integration
    const fetchProperties = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const sampleData = generateSampleProperties();
      setProperties(sampleData);
      setFilteredProperties(sampleData);
      setIsLoading(false);
    };

    fetchProperties();
  }, []);

  const handleSearch = (filters: SearchParams) => {
    let filtered = [...properties];

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(
        (p) =>
          p.city.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.address.toLowerCase().includes(filters.location.toLowerCase()) ||
          p.zipCode.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by property type
    if (filters.propertyType !== 'any') {
      filtered = filtered.filter((p) => p.propertyType === filters.propertyType);
    }

    // Filter by bedrooms
    if (filters.bedrooms !== 'any') {
      filtered = filtered.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    }

    // Filter by bathrooms
    if (filters.bathrooms !== 'any') {
      filtered = filtered.filter((p) => p.bathrooms >= parseInt(filters.bathrooms));
    }

    // Filter by price
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice.replace(/[^0-9.]/g, ''));
      filtered = filtered.filter((p) => p.price >= minPrice);
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice.replace(/[^0-9.]/g, ''));
      filtered = filtered.filter((p) => p.price <= maxPrice);
    }

    // Filter by square footage
    if (filters.minSqft) {
      const minSqft = parseFloat(filters.minSqft.replace(/[^0-9.]/g, ''));
      filtered = filtered.filter((p) => p.sqft >= minSqft);
    }
    if (filters.maxSqft) {
      const maxSqft = parseFloat(filters.maxSqft.replace(/[^0-9.]/g, ''));
      filtered = filtered.filter((p) => p.sqft <= maxSqft);
    }

    setFilteredProperties(filtered);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#0a131e] mx-auto mb-4" />
          <p className="font-body text-[#6c757d]">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar - Hidden on mobile, shown as floating panel */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <SearchFilters onSearch={handleSearch} />
          </div>
        </div>

        {/* Mobile Filters - Floating button */}
        <div className="lg:hidden">
          <SearchFilters onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0a131e]">
                {filteredProperties.length} {filteredProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h2>
              <p className="font-body text-[#6c757d] text-sm mt-1">
                Showing {indexOfFirstProperty + 1}-{Math.min(indexOfLastProperty, filteredProperties.length)} of{' '}
                {filteredProperties.length}
              </p>
            </div>
          </div>

          {/* Property Grid */}
          {currentProperties.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {currentProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-sm"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    // Show first page, current page, and last page with ellipsis
                    let page: number;
                    if (totalPages <= 5) {
                      page = i + 1;
                    } else if (currentPage <= 3) {
                      page = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      page = totalPages - 4 + i;
                    } else {
                      page = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(page)}
                        className="w-10 h-10 text-sm"
                      >
                        {page}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-sm"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-heading text-xl text-[#6c757d]">No properties found matching your criteria.</p>
              <p className="font-body text-[#6c757d] mt-2">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
