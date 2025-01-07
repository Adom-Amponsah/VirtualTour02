import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Heart, BedDouble, ArrowLeft, ListFilter } from 'lucide-react';
import Map from './Map';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [showMap, setShowMap] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  // Get search parameters
  const region = searchParams.get('region');
  const type = searchParams.get('type');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');

  // Mock data with coordinates
  const properties = [
    {
      id: 1,
      title: "Modern Apartment in East Legon",
      location: "East Legon, Greater Accra",
      price: "₵2,500",
      beds: "2 Beds",
      baths: "2 Baths",
      sqft: "1,200 sqft",
      image: "/images/apart011.jpeg",
      coordinates: [5.6037, -0.1870] // Latitude, Longitude for East Legon
    },
    {
      id: 2,
      title: "Luxury Villa in Cantonments",
      location: "Cantonments, Greater Accra",
      price: "₵3,500",
      beds: "3 Beds",
      baths: "3 Baths",
      sqft: "2,000 sqft",
      image: "/images/apart022.jpeg",
      coordinates: [5.5913, -0.1743] // Latitude, Longitude for Cantonments
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
    }
  ];

  // Handle property selection
  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    // Scroll the property into view in the list
    const element = document.getElementById(`property-${property.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => window.history.back()} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">
              Properties in {region || 'Ghana'}
            </h1>
          </div>
          <button 
            onClick={() => setShowMap(!showMap)}
            className="md:hidden px-3 py-1.5 text-sm border rounded-lg"
          >
            {showMap ? 'Show List' : 'Show Map'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Property Listings */}
        <div className={`${showMap ? 'hidden md:block' : 'block'} w-full md:w-[45%] overflow-y-auto`}>
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
          <div className="p-4 space-y-4">
            {properties.map((property) => (
              <div 
                id={`property-${property.id}`}
                key={property.id}
                className={`
                  bg-white rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer
                  ${selectedProperty?.id === property.id ? 'ring-2 ring-[#0C2340]' : 'hover:border-gray-300'}
                `}
                onClick={() => handlePropertySelect(property)}
              >
                <div className="flex">
                  {/* Property Image */}
                  <div className="w-32 sm:w-48">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover rounded-l-xl"
                    />
                  </div>
                  
                  {/* Property Details */}
                  <div className="flex-1 p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{property.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{property.location}</span>
                        </div>
                      </div>
                      <button className="p-1.5 rounded-full hover:bg-gray-100">
                        <Heart className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-lg font-semibold text-[#0C2340]">
                        {property.price}/mo
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>{property.beds}</span>
                        <span>{property.baths}</span>
                        <span>{property.sqft}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className={`${!showMap ? 'hidden md:block' : 'block'} flex-1 relative`}>
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