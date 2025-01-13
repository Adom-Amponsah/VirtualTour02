import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, Heart, BedDouble, ArrowLeft, ListFilter, ChevronDown, Sliders, Bath, Home, DollarSign, Maximize, ArrowRight, Badge, Square, List, MapIcon } from 'lucide-react';
import Map from './Map';
import RatingModal from './RatingModal';

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
  const [viewType, setViewType] = useState('list');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedPropertyRatings, setSelectedPropertyRatings] = useState(null);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  
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
      price: "₵2,500 - ₵5,995",
      beds: "Studio - 2 Beds",
      baths: "1 - 2 Baths",
      sqft: "386 - 1,126 sqft",
      image: "/images/apart011.jpeg",
      coordinates: [5.6037, -0.1870],
      propertyType: "apartment-complex",
      hasMultipleUnits: true,
      units: [
        { type: "Studio", price: "₵2,500", sqft: "386" },
        { type: "1 Bedroom", price: "₵3,500", sqft: "750" },
        { type: "2 Bedroom", price: "₵5,995", sqft: "1,126" }
      ]
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
      propertyType: "single-unit",
      hasMultipleUnits: false
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
      coordinates: [5.5500, -0.1833],
      hasMultipleUnits: false
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
      {
        id: 5,
        title: "Modern Apartment Complex in East Legon",
        location: "East Legon, Greater Accra",
        price: "₵2,500 - ₵5,995",
        beds: "Studio - 2 Beds",
        baths: "1 - 2 Baths",
        sqft: "386 - 1,126 sqft",
        image: "/images/apart011.jpeg",
        coordinates: [5.6037, -0.1870],
        propertyType: "apartment-complex",
        hasMultipleUnits: true,
        units: [
          { type: "Studio", price: "₵2,500", sqft: "386" },
          { type: "1 Bedroom", price: "₵3,500", sqft: "750" },
          { type: "2 Bedroom", price: "₵5,995", sqft: "1,126" }
        ]
      },
      {
        id: 6,
        title: "Standalone Villa in Cantonments",
        location: "Cantonments, Greater Accra",
        price: "₵3,500",
        beds: "3 Beds",
        baths: "3 Baths",
        sqft: "2,000 sqft",
        image: "/images/apart022.jpeg",
        coordinates: [5.5913, -0.1743],
        propertyType: "single-unit",
        hasMultipleUnits: false
      },
      {
        id: 7,
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
          id: 8,
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
    // Set the ratings data
    setSelectedPropertyRatings({
      internet: property.areaRatings?.internet || 'good',
      road: property.areaRatings?.road || 'excellent',
      streetLights: property.areaRatings?.streetLights || 'good'
    });
    
    // Store the pending navigation
    setPendingNavigation(() => () => {
      if (property.hasMultipleUnits) {
        navigate(`/apartment/${property.id}`);
      } else {
        navigate(`/apartment/single/${property.id}`);
      }
    });
    
    // Show the rating modal
    setShowRatingModal(true);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
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

        {/* Add View Toggle below the filters */}
        <div className="max-w-7xl mx-auto px-4 py-3 border-t">
          <div className="flex items-center justify-end space-x-2">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewType('list')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  viewType === 'list'
                    ? 'bg-white shadow text-[#0C2340]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm font-medium">List</span>
              </button>
              <button
                onClick={() => setViewType('map')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  viewType === 'map'
                    ? 'bg-white shadow text-[#0C2340]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MapIcon className="w-4 h-4" />
                <span className="text-sm font-medium">Map</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {viewType === 'list' ? (
        // List View - Full width
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-4">
            <span className="text-gray-600">
              {properties.length} properties found
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
            {properties.map((property) => (
              <div
                key={property.id}
                onClick={() => handlePropertySelect(property)}
                className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
              >
                {/* Main Card Layout */}
                <div className="flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="px-3 py-1 rounded-full bg-[#0C2340] text-white text-sm font-medium">
                        Available Now
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, property.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm z-10
                                 hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.has(property.id)
                            ? 'fill-red-500 stroke-red-500'
                            : 'stroke-gray-600'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    {/* Price */}
                    <div className="text-xl font-bold text-[#0C2340] mb-2">
                      {property.price}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-medium text-gray-900 mb-2">{property.title}</h3>

                    {/* Location */}
                    <div className="flex items-center text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4" />
                        <span className="text-sm">{property.beds}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span className="text-sm">{property.baths}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="w-4 h-4" />
                        <span className="text-sm">{property.sqft}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Map View - Split screen
        <div className="flex-1 flex overflow-hidden">
          {/* Property Listings - Left side */}
          <div className="w-[45%] overflow-y-auto">
            <div className="p-4 space-y-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handlePropertySelect(property)}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                >
                  {/* Main Card Layout */}
                  <div className="flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className="px-3 py-1 rounded-full bg-[#0C2340] text-white text-sm font-medium">
                          Available Now
                        </div>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(e, property.id)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm z-10
                                   hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.has(property.id)
                              ? 'fill-red-500 stroke-red-500'
                              : 'stroke-gray-600'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      {/* Price */}
                      <div className="text-xl font-bold text-[#0C2340] mb-2">
                        {property.price}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-medium text-gray-900 mb-2">{property.title}</h3>

                      {/* Location */}
                      <div className="flex items-center text-gray-500 mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{property.location}</span>
                      </div>

                      {/* Property Details */}
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <BedDouble className="w-4 h-4" />
                          <span className="text-sm">{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span className="text-sm">{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          <span className="text-sm">{property.sqft}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map - Right side */}
          <div className="flex-1 relative">
            <Map 
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertySelect={handlePropertySelect}
            />
          </div>
        </div>
      )}

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => {
          setShowRatingModal(false);
          // Execute the pending navigation
          pendingNavigation?.();
        }}
        ratings={selectedPropertyRatings}
      />
    </div>
  );
};

export default SearchResults; 