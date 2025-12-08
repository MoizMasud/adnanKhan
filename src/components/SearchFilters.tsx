import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { SlidersHorizontal, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: SearchParams) => void;
}

export interface SearchParams {
  location: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
  minSqft: string;
  maxSqft: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchParams>({
    location: '',
    propertyType: 'any',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    bathrooms: 'any',
    minSqft: '',
    maxSqft: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
    // Close mobile filters after search
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleReset = () => {
    const resetFilters: SearchParams = {
      location: '',
      propertyType: 'any',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'any',
      bathrooms: 'any',
      minSqft: '',
      maxSqft: '',
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  // On desktop, always show the filters panel inline
  if (!isMobile) {
    return (
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0a131e]">Search Filters</h3>
          <button
            type="button"
            onClick={handleReset}
            className="font-body text-sm text-[#6c757d] hover:text-[#0a131e] transition-colors"
          >
            Reset All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Location */}
          <div className="md:col-span-2">
            <Label htmlFor="location" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="City, Neighborhood, or Postal Code"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="font-body"
            />
          </div>

          {/* Property Type */}
          <div>
            <Label htmlFor="propertyType" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Property Type
            </Label>
            <Select value={filters.propertyType} onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
              <SelectTrigger className="font-body">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bedrooms */}
          <div>
            <Label htmlFor="bedrooms" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Bedrooms
            </Label>
            <Select value={filters.bedrooms} onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
              <SelectTrigger className="font-body">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div>
            <Label htmlFor="bathrooms" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Bathrooms
            </Label>
            <Select value={filters.bathrooms} onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}>
              <SelectTrigger className="font-body">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Min Price */}
          <div>
            <Label htmlFor="minPrice" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Min Price
            </Label>
            <Input
              id="minPrice"
              type="text"
              placeholder="$0"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className="font-body"
            />
          </div>

          {/* Max Price */}
          <div>
            <Label htmlFor="maxPrice" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Max Price
            </Label>
            <Input
              id="maxPrice"
              type="text"
              placeholder="No Max"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className="font-body"
            />
          </div>

          {/* Min Sqft */}
          <div>
            <Label htmlFor="minSqft" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Min Sq Ft
            </Label>
            <Input
              id="minSqft"
              type="text"
              placeholder="0"
              value={filters.minSqft}
              onChange={(e) => setFilters({ ...filters, minSqft: e.target.value })}
              className="font-body"
            />
          </div>

          {/* Max Sqft */}
          <div>
            <Label htmlFor="maxSqft" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
              Max Sq Ft
            </Label>
            <Input
              id="maxSqft"
              type="text"
              placeholder="No Max"
              value={filters.maxSqft}
              onChange={(e) => setFilters({ ...filters, maxSqft: e.target.value })}
              className="font-body"
            />
          </div>
        </div>

        <a
          href="https://www.realtor.ca/map#Sort=6-D&IndividualId=2063458&IncludePins=1&Currency=CAD"
          target="_blank"
          rel="noreferrer"
          className="w-full font-button tracking-wider bg-white hover:bg-[#0a131e] text-[#0a131e] hover:!text-white border-2 border-[#0a131e] py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg inline-block text-center"
        >
          SEARCH PROPERTIES
        </a>
      </form>
    );
  }

  // Mobile version with floating button and full-screen overlay
  return (
    <>
      {/* Mobile Filter Toggle Button - Only show when overlay is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#0a131e] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#1a2330] transition-all hover:scale-110 active:scale-95"
          aria-label="Open filters"
          style={{ 
            zIndex: 9999,
            position: 'fixed'
          }}
        >
          <SlidersHorizontal size={24} className="text-white" />
        </button>
      )}

      {/* Mobile Overlay - Full Screen */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity"
          onClick={() => setIsOpen(false)}
          style={{ zIndex: 9998 }}
        />
      )}

      {/* Filter Panel - Full Screen */}
      <div 
        className={`fixed inset-0 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ zIndex: 9998 }}
      >
        <form onSubmit={handleSubmit} className="bg-white h-full flex flex-col p-6 space-y-6">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0a131e]">Search Filters</h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="font-body text-sm text-[#6c757d] hover:text-[#0a131e] transition-colors"
              >
                Reset All
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Close filters"
              >
                <X size={20} className="text-[#0a131e]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 flex-1 overflow-y-auto pb-4">
            {/* Location */}
            <div>
              <Label htmlFor="location-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Location
              </Label>
              <Input
                id="location-mobile"
                type="text"
                placeholder="City, Neighborhood, or Postal Code"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="font-body"
              />
            </div>

            {/* Property Type */}
            <div>
              <Label htmlFor="propertyType-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Property Type
              </Label>
              <Select value={filters.propertyType} onValueChange={(value) => setFilters({ ...filters, propertyType: value })}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bedrooms */}
            <div>
              <Label htmlFor="bedrooms-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Bedrooms
              </Label>
              <Select value={filters.bedrooms} onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div>
              <Label htmlFor="bathrooms-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Bathrooms
              </Label>
              <Select value={filters.bathrooms} onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}>
                <SelectTrigger className="font-body">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Min Price */}
            <div>
              <Label htmlFor="minPrice-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Min Price
              </Label>
              <Input
                id="minPrice-mobile"
                type="text"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                className="font-body"
              />
            </div>

            {/* Max Price */}
            <div>
              <Label htmlFor="maxPrice-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Max Price
              </Label>
              <Input
                id="maxPrice-mobile"
                type="text"
                placeholder="No Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                className="font-body"
              />
            </div>

            {/* Min Sqft */}
            <div>
              <Label htmlFor="minSqft-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Min Sq Ft
              </Label>
              <Input
                id="minSqft-mobile"
                type="text"
                placeholder="0"
                value={filters.minSqft}
                onChange={(e) => setFilters({ ...filters, minSqft: e.target.value })}
                className="font-body"
              />
            </div>

            {/* Max Sqft */}
            <div>
              <Label htmlFor="maxSqft-mobile" className="font-body text-sm font-semibold text-[#0a131e] mb-2">
                Max Sq Ft
              </Label>
              <Input
                id="maxSqft-mobile"
                type="text"
                placeholder="No Max"
                value={filters.maxSqft}
                onChange={(e) => setFilters({ ...filters, maxSqft: e.target.value })}
                className="font-body"
              />
            </div>
          </div>

          <a
            href="https://www.realtor.ca/map#Sort=6-D&IndividualId=2063458&IncludePins=1&Currency=CAD"
            target="_blank"
            rel="noreferrer"
            className="w-full font-button tracking-wider bg-white hover:bg-[#0a131e] text-[#0a131e] hover:!text-white border-2 border-[#0a131e] py-3 px-6 rounded-md transition-all duration-300 shadow-md hover:shadow-lg inline-block text-center"
          >
            SEARCH PROPERTIES
          </a>
        </form>
      </div>
    </>
  );
};

export default SearchFilters;
