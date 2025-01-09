import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Heart, BedDouble, ArrowLeft, ListFilter, ChevronDown, Sliders, Bath, Home, DollarSign, Maximize, ArrowRight, Badge } from 'lucide-react';
import Map from './Map';

const FilterDropdown = ({ label, icon: Icon, options, value, onChange, prefix = '' }) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 border border-gray-200">
        <Icon className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-700">{label}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 hidden group-hover:block z-50">
        {options.map((option) => (
          <button
            key={option.value}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 
              ${value === option.value ? 'text-[#0C2340] font-medium' : 'text-gray-700'}`}
            onClick={() => onChange(option.value)}
          >
            {prefix}{option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [showMap, setShowMap] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    beds: '',
    baths: '',
    propertyType: '',
    amenities: []
  });
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();
  
  // Get search parameters
  const region = searchParams.get('region');
  const type = searchParams.get('type');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  // Mock data with coordinates
  const properties = [
    {
      id: 1,
      title: "Modern Apartment Complex in East Legon",
      location: "East Legon, Greater Accra",
      price: "₵2,500",
      beds: "2 Beds",
      baths: "2 Baths",
      sqft: "1,200 sqft",
      image: "/images/apart011.jpeg",
      coordinates: [5.6037, -0.1870],
      propertyType: "apartment-complex"
    },
    {
      id: 2,
      title: "Standalone Villa in Cantonments",
      location: "Cantonments, Greater Accra",
      price: "₵3,500",
      beds: "3 Beds",
      baths: "3 Baths",
      sqft: "2,000 sqft",
      image: "/images/apart022.jpeg",
      coordinates: [5.5913, -0.1743],
      propertyType: "single-unit"
    },
    {
      id: 3,
      title: "Cozy Studio in Osu",
      location: "Osu, Greater Accra",
      price: "₵1,800",
      beds: "Studio",
      baths: "1 Bath",
      sqft: "800 sqft",
      image: "/images/apart044.jpeg",
      coordinates: [5.5500, -0.1833] // Latitude, Longitude for Osu
    },
    {
        id: 4,
        title: "Cozy Studio in Osu",
        location: "Osu, Greater Accra",
        price: "₵1,800",
        beds: "Studio",
        baths: "1 Bath",
        sqft: "800 sqft",
        image: "/images/apart055.jpeg",
        coordinates: [5.5500, -0.1833] // Latitude, Longitude for Osu
      },
  ];

  // Handle property selection
  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    
    // Navigate based on property type
    if (property.propertyType === 'single-unit') {
      navigate(`/apartment/single/${property.id}`);
    } else {
      navigate(`/apartment/${property.id}`);
    }
  };

  // Add this function to handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Add these filter options
  const priceOptions = [
    { value: '1000', label: '₵1,000' },
    { value: '2000', label: '₵2,000' },
    { value: '3000', label: '₵3,000' },
    { value: '5000', label: '₵5,000' },
    { value: '10000', label: '₵10,000' }
  ];

  const bedOptions = [
    { value: 'studio', label: 'Studio' },
    { value: '1', label: '1 Bed' },
    { value: '2', label: '2 Beds' },
    { value: '3', label: '3 Beds' },
    { value: '4', label: '4+ Beds' }
  ];

  const bathOptions = [
    { value: '1', label: '1 Bath' },
    { value: '2', label: '2 Baths' },
    { value: '3', label: '3 Baths' },
    { value: '4', label: '4+ Baths' }
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'condo', label: 'Condo' }
  ];

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Add a separate handler for the View Details button to prevent double navigation
  const handleViewDetails = (e, property) => {
    e.stopPropagation();
    navigate(`/apartment/${property.id}`);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold">
                Properties in {region || 'Ghana'}
              </h1>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-4 flex items-center space-x-2 overflow-x-auto pb-4">
            <FilterDropdown
              label="Price (Min)"
              icon={DollarSign}
              options={priceOptions}
              value={filters.priceMin}
              onChange={(value) => handleFilterChange('priceMin', value)}
              prefix="₵"
            />
            <FilterDropdown
              label="Price (Max)"
              icon={DollarSign}
              options={priceOptions}
              value={filters.priceMax}
              onChange={(value) => handleFilterChange('priceMax', value)}
              prefix="₵"
            />
            <FilterDropdown
              label="Beds"
              icon={BedDouble}
              options={bedOptions}
              value={filters.beds}
              onChange={(value) => handleFilterChange('beds', value)}
            />
            <FilterDropdown
              label="Baths"
              icon={Bath}
              options={bathOptions}
              value={filters.baths}
              onChange={(value) => handleFilterChange('baths', value)}
            />
            <FilterDropdown
              label="Property Type"
              icon={Home}
              options={propertyTypes}
              value={filters.propertyType}
              onChange={(value) => handleFilterChange('propertyType', value)}
            />

            {/* More Filters Button */}
            <button 
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-50 border border-gray-200"
              onClick={() => {/* Add modal for more filters */}}
            >
              <Sliders className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">More Filters</span>
            </button>

            {/* Clear Filters Button - Only show if filters are applied */}
            {Object.values(filters).some(Boolean) && (
              <button 
                className="text-sm text-[#0C2340] hover:underline"
                onClick={() => setFilters({
                  priceMin: '',
                  priceMax: '',
                  beds: '',
                  baths: '',
                  propertyType: '',
                  amenities: []
                })}
              >
                Clear All
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Property Listings - Always visible on mobile */}
        <div className="w-full md:w-[45%] overflow-y-auto">
          {/* Filters */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                {properties.length} properties found
              </span>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ListFilter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Property List */}
          <div className="p-4 space-y-6">
            {properties.map((property) => (
              <div
                id={`property-${property.id}`}
                key={property.id}
                className={`
                  group relative bg-white rounded-2xl transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                  ${selectedProperty?.id === property.id ? 'ring-2 ring-blue-500' : 'shadow-md'}
                `}
                onClick={() => handlePropertySelect(property)}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Section */}
                  <div className="relative w-full sm:w-72 h-48 sm:h-auto overflow-hidden">
                    {/* Image with zoom effect */}
                    <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none"
                      />
                    </div>
                    
                    {/* Gradient overlay - moved above the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent 
                                    rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none
                                    transition-opacity duration-700 group-hover:opacity-75" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm 
                                      text-sm font-medium text-blue-600
                                      transform transition-transform duration-700 group-hover:scale-105">
                        Available Now
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, property.id)}
                      className="absolute top-4 right-4 p-2 rounded-full 
                                 bg-white/90 backdrop-blur-sm z-10
                                 transition-all duration-200 hover:bg-white
                                 transform group-hover:scale-105"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          favorites.has(property.id)
                            ? 'fill-red-500 stroke-red-500'
                            : 'stroke-gray-600'
                        }`}
                      />
                    </button>

                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="text-2xl font-bold text-white
                                      transform transition-transform duration-700 group-hover:scale-105">
                        {property.price}
                        <span className="text-sm font-medium text-gray-200">/month</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
                        <div className="flex items-center mt-2 text-gray-500">
                          <MapPin className="w-4 h-4 mr-1.5" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {['Parking', 'Gym', 'Pool', 'Security'].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Details */}
                      <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <BedDouble className="w-5 h-5" />
                          <span className="text-sm">{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="w-5 h-5" />
                          <span className="text-sm">{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize className="w-5 h-5" />
                          <span className="text-sm">{property.sqft}</span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="flex items-end justify-end pt-4">
                        <button 
                          onClick={(e) => handleViewDetails(e, property)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-600 
                            font-medium transition-all hover:bg-gray-100 group"
                        >
                          View Details
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map - Only visible on desktop */}
        <div className="hidden md:block md:flex-1 relative">
          <Map 
            properties={properties}
            selectedProperty={selectedProperty}
            onPropertySelect={handlePropertySelect}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 