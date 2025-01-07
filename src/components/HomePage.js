import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, MapPin, Menu, X, Home, Building, DollarSign, BookOpen, Heart, BedDouble, ArrowRight } from 'lucide-react';
import useLocations from '../hooks/useLocations';

const PropertyCard = ({ property, index }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation after a delay based on the card's index
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 200); // 200ms delay between each card
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="relative w-full bg-white rounded-xl overflow-hidden group border border-gray-200 hover:border-[#0C2340]/20 animate-on-scroll"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img 
          src={property.image}
          alt={property.title} 
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Price Tag */}
        <div className="absolute top-4 left-4 z-20 bg-white px-3 py-1 rounded-full">
          <span className="text-sm font-semibold text-gray-900">{property.price}</span>
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h3>
            <div className="flex items-center text-gray-500">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <BedDouble className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.beds}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex items-center justify-between">
          <button className="group-hover:text-[#0C2340] text-gray-600 font-semibold text-sm flex items-center transition-colors">
            View Details
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AnimatedSection = ({ children, delay = 0 }) => {
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay]);

  return (
    <div ref={sectionRef} className="animate-on-scroll">
      {children}
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState('Rent');
  const [location, setLocation] = useState('');
  const [noFee, setNoFee] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { locations, loading, error } = useLocations();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const properties = [
    {
      id: 1,
      title: "110 Roy",
      location: "100 Roy St, Accra",
      price: "₵1,980 - ₵5,995",
      beds: "Studio - 2 Beds",
      image: "/images/apart011.jpeg"
    },
    {
      id: 2,
      title: "Airmark Apartments",
      location: "229 Andover Park E, Accra",
      price: "₵1,380 - ₵6,830",
      beds: "Studio - 3 Beds",
      image: "/images/apart022.jpeg"
    },
    {
      id: 3,
      title: "Augusta Apartments",
      location: "4041 Roosevelt Way NE, Accra",
      price: "₵1,633 - ₵4,290",
      beds: "1-2 Beds",
      image: "/images/apart055.jpeg"
    },
    {
      id: 4,
      title: "The Kennedy Building",
      location: "907 NE 45th St, Accra",
      price: "₵1,585 - ₵2,752",
      beds: "Studio - 2 Beds",
      image: "/images/apart044.jpeg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation - Updated colors */}
      <nav className="bg-[#0C2340] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="text-xl font-bold text-white">
              Apartment<span className="text-[#FF385C]">Ghana</span>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>

            {/* Main Navigation - Converted to links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 text-sm">RENT</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">BUY</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">SELL</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">BUILDINGS</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">RESOURCES</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">BLOG</a>
            </div>

            {/* Auth Links */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-300 hover:text-white">
                Advertise
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-white">
                Sign in
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Updated with links */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0C2340] border-t border-[#163156] py-3">
            <div className="space-y-1 px-4">
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-200 hover:bg-[#163156] rounded-lg">
                <Home size={16} />
                <span className="text-sm">RENT</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-200 hover:bg-[#163156] rounded-lg">
                <Building size={16} />
                <span className="text-sm">BUY</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-200 hover:bg-[#163156] rounded-lg">
                <DollarSign size={16} />
                <span className="text-sm">SELL</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-200 hover:bg-[#163156] rounded-lg">
                <Building size={16} />
                <span className="text-sm">BUILDINGS</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-200 hover:bg-[#163156] rounded-lg">
                <BookOpen size={16} />
                <span className="text-sm">RESOURCES</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-200 hover:bg-[#163156] rounded-lg">
                <BookOpen size={16} />
                <span className="text-sm">BLOG</span>
              </a>
              <div className="pt-2 flex space-x-4 px-4">
                <a href="#" className="text-sm text-gray-200 hover:text-white">
                  Advertise
                </a>
                <a href="#" className="text-sm text-gray-200 hover:text-white">
                  Sign in
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Updated gradient */}
      <div 
        className="relative min-h-[85vh] bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/coverrr.jpeg)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          {/* Hero Text */}
          <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-6xl text-white font-bold mb-6">
              Find Your Perfect Home in Ghana
            </h1>
            <p className="text-xl text-gray-200">
              The easiest way to rent, buy & now <span className="text-[#ff4444]">sell</span> properties
            </p>
          </div>

          {/* Search Interface - Compact Single Line */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 max-w-5xl mx-auto animate-slide-up">
            <div className="flex items-center">
              {/* Search Type Toggle */}
              <div className="hidden md:flex items-center border-r border-gray-200 px-4">
                <div className="flex space-x-1 bg-gray-300 p-1 rounded-lg">
                  {['Rent', 'Buy'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={`
                        px-4 py-1.5 rounded-md cursor-pointer text-sm font-medium
                        transition-all duration-200 ease-in-out select-none
                        ${searchType === type 
                          ? 'bg-white shadow-sm text-[#0C2340]' 
                          : 'text-gray-500 hover:text-gray-700'
                        }
                      `}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="flex-1 relative group px-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 absolute left-4" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 appearance-none bg-transparent focus:outline-none text-sm"
                  >
                    <option value="">Region in Ghana</option>
                    {loading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      locations.map((loc) => (
                        <option key={loc.state_name} value={loc.state_name}>
                          {loc.state_name}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4" />
                </div>
                <div className="absolute bottom-0 left-2 right-2 h-px bg-gray-200 group-hover:bg-[#0C2340] transition-colors" />
              </div>

              {/* Price Range */}
              <div className="hidden md:flex items-center space-x-2 px-4 border-l border-gray-200">
                <div className="relative group">
                  <select 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="appearance-none bg-transparent pl-3 pr-8 py-3 focus:outline-none text-sm"
                  >
                    <option value="">Min Price</option>
                    {[1000, 2000, 3000, 5000, 10000].map((price) => (
                      <option key={price} value={price}>₵{price.toLocaleString()}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 group-hover:bg-[#0C2340] transition-colors" />
                </div>
                <span className="text-gray-300">-</span>
                <div className="relative group">
                  <select 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="appearance-none bg-transparent pl-3 pr-8 py-3 focus:outline-none text-sm"
                  >
                    <option value="">Max Price</option>
                    {[2000, 5000, 10000, 20000, 50000].map((price) => (
                      <option key={price} value={price}>₵{price.toLocaleString()}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200 group-hover:bg-[#0C2340] transition-colors" />
                </div>
              </div>

              {/* Search Button */}
              <button 
                onClick={() => {
                  navigate(`/search?region=${location}&type=${searchType}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
                }}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#0C2340] to-[#1B3B66] 
                           text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                <span className="ml-2 font-medium text-sm hidden md:block">Search</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center text-white">
            <QuickStat number="2,500+" label="Available Properties" />
            <QuickStat number="500+" label="Verified Agents" />
            <QuickStat number="10,000+" label="Happy Customers" />
            <QuickStat number="15+" label="Cities Covered" />
          </div>
        </div>
      </div>

      {/* Fair Housing Notice */}
      <div className="bg-[#0C2340] text-white py-4 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <span className="font-semibold">Fair Housing in Ghana:</span>{' '}
          <button className="underline hover:text-gray-300 transition-colors">
            Learn more about your rights and responsibilities
          </button>
        </div>
      </div>

      {/* Available Rentals Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0C2340] mb-2">
                Explore Rentals in Accra
              </h2>
              <p className="text-gray-600">
                Discover the perfect home from our extensive collection of properties
              </p>
            </div>
          </AnimatedSection>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {properties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center">
            <button className="bg-[#0C2340] text-white px-8 py-3 rounded-lg hover:bg-[#163156] transition-all transform hover:scale-105">
              View More Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for search type buttons
const SearchTypeButton = ({ children, active, onClick }) => (
  <button 
    className={`px-8 py-2 rounded-md transition-all ${
      active 
        ? 'bg-[#0C2340] text-white' 
        : 'text-gray-700 hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Component for price select dropdowns
const PriceSelect = ({ placeholder }) => (
  <div className="relative">
    <select className="w-full appearance-none bg-white border rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-[#0C2340] focus:border-transparent">
      <option>{placeholder}</option>
      <option>₵1,000</option>
      <option>₵2,000</option>
      <option>₵5,000</option>
      <option>₵10,000</option>
      <option>₵20,000</option>
    </select>
    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
  </div>
);

// Component for quick stats
const QuickStat = ({ number, label }) => (
  <div className="p-4">
    <div className="text-2xl font-bold">{number}</div>
    <div className="text-sm text-gray-300">{label}</div>
  </div>
);

export default HomePage; 