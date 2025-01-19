import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, MapPin, Menu, X, Home, Building, DollarSign, BookOpen, Heart, BedDouble, ArrowRight } from 'lucide-react';
import useLocations from '../hooks/useLocations';
import { motion, useScroll, useTransform } from 'framer-motion';
import PreferencesModal from './PreferencesModal';

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

const locationAreas = [
  {
    id: 1,
    name: "East Legon, GA",
    properties: "120+ rentals",
    image: "/images/apart011.jpeg",
    layout: "full"
  },
  {
    id: 2,
    name: "Osu, GA",
    properties: "85+ rentals",
    image: "/images/apart022.jpeg",
    layout: "half-top"
  },
  {
    id: 3,
    name: "Cantonments, GA",
    properties: "95+ rentals",
    image: "/images/apart044.jpeg",
    layout: "half-bottom"
  },
  {
    id: 4,
    name: "Haatso, GA",
    properties: "120+ rentals",
    image: "/images/apart011.jpeg",
    layout: "full"
  },
  {
    id: 5,
    name: "Airport, GA",
    properties: "85+ rentals",
    image: "/images/apart022.jpeg",
    layout: "half-top"
  },
  {
    id: 6,
    name: "Spintex, GA",
    properties: "95+ rentals",
    image: "/images/apart044.jpeg",
    layout: "half-bottom"
  },
];

const LocationCard = ({ location, index, navigate }) => {
  if (location.layout === "full-image") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative rounded-2xl overflow-hidden cursor-pointer min-w-[300px] w-[300px]"
        onClick={() => navigate(`/search?region=${location.name}`)}
      >
        {/* Full Image Card */}
        <div className="aspect-[3/4] relative">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Content at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-2">{location.name}</h3>
            <span className="text-sm font-medium text-white/80">{location.properties}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer min-w-[400px] w-[400px] bg-white"
      onClick={() => navigate(`/search?region=${location.name}`)}
    >
      {/* Split Content Card */}
      <div className="flex h-[400px]">
        {/* Text Content */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{location.name}</h3>
            <p className="text-gray-600 leading-relaxed">{location.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">{location.properties}</span>
            <button className="flex items-center gap-2 text-[#0C2340] font-medium">
              View Homes
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Image Half */}
        <div className="w-1/2 relative">
          <img
            src={location.image}
            alt={location.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Add this new component for scroll-triggered animations
const ScrollAnimatedSection = ({ children, className = '' }) => {
  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
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
  }, []);

  return (
    <div ref={sectionRef} className={className}>
      {/* Only render children when section is visible */}
      {isVisible && children}
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
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const { scrollY } = useScroll();

  // Transform values for parallax and cutout effects
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  const cutoutScale = useTransform(scrollY, [0, 300], [1, 15]);
  const cutoutOpacity = useTransform(scrollY, [0, 100, 300], [1, 0.8, 0]);

  const popularPlaces = [
    { id: 1, name: "Accra" },
    { id: 2, name: "Haatso" },
    { id: 3, name: "East Legon" },
    { id: 4, name: "Madina" },
    { id: 5, name: "Airport" },
    { id: 6, name: "Cantoments" },
    { id: 7, name: "Osu" },
    { id: 8, name: "Circle" },
    { id: 9, name: "Kwabenya" },
    { id: 10, name: "Dome" },
    { id: 11, name: "West Legon" },
    { id: 12, name: "Labadi" },
    { id: 13, name: "Agogba" },
    { id: 14, name: "Pokuase" },
    { id: 15, name: "Spintex" },
    { id: 16, name: "Kaneshie" },
    { id: 17, name: "Kokomlemle" },
    { id: 18, name: "Kanda" },
    { id: 19, name: "Teshie" },
    { id: 20, name: "Dansoman" }
  ];

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

  const handleSearch = () => {
    console.log('Opening preferences modal with:', {
      searchType,
      location,
      minPrice,
      maxPrice
    });
    // Store the current search parameters
    localStorage.setItem('searchParams', JSON.stringify({
      searchType,
      location,
      minPrice,
      maxPrice
    }));
    // Open the preferences modal
    setShowPreferencesModal(true);
  };

  const handlePreferencesComplete = (preferences) => {
    // Get the stored search parameters
    const searchParams = JSON.parse(localStorage.getItem('searchParams') || '{}');
    setShowPreferencesModal(false);
    
    // Construct the search URL with all parameters
    const searchQuery = new URLSearchParams({
      region: searchParams.location || '',
      type: searchParams.searchType || 'Rent',
      minPrice: searchParams.minPrice || '',
      maxPrice: searchParams.maxPrice || '',
      preferences: JSON.stringify(preferences)
    }).toString();

    // Navigate to search results with all parameters
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
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

      {/* Initial Hero Section with House Cutout */}
      <motion.div className="relative h-screen">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div 
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10"
            style={{ mixBlendMode: 'multiply' }}
          />
          <div 
            className="absolute inset-0 bg-black/50 z-10"
          />
          <img 
            src="/images/apart011.jpeg" 
            alt="Luxury Apartment"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Hero Content with House Cutout */}
        <motion.div 
          className="relative z-20 h-full flex flex-col px-6 md:ml-32"
          style={{ y: textY }}
        >
          {/* Hero Text */}
          <motion.div 
            className="mt-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
              CHANGE THE WAY
              <br />
              YOU LIVE
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              For those who want more from their home search,
              <br className="hidden sm:block" />
              there's ApartmentGhana. Find your perfect match.
            </p>
          </motion.div>

          {/* House Cutout at Bottom */}
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 sm:w-96 md:w-128 h-64 sm:h-96 md:h-128"
            style={{ 
              scale: cutoutScale,
              opacity: cutoutOpacity,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ 
                stroke: 'white',
                strokeWidth: '2',
                fill: 'none'
              }}
            >
              <path d="M20,50 L50,20 L80,50 L80,85 L20,85 L20,50 Z" />
              <path d="M45,85 L45,65 L55,65 L55,85" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Search Section with Scroll Animation */}
      <motion.div 
        className="relative min-h-[85vh] bg-cover bg-center flex items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ 
          once: true,
          amount: 0.05,
          margin: "-50px"
        }}
        transition={{
          duration: 0.4
        }}
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/coverrr.jpeg)'
        }}
      >
        {/* Additional dark overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />
        
        <div className="max-w-7xl mx-auto px-4 w-full relative z-40">
          {/* Hero Text */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white font-bold mb-4 sm:mb-6">
              Find Your Perfect Home in Ghana
            </h1>
            <p className="text-base sm:text-xl text-gray-200">
              The easiest way to rent, buy & now <span className="text-[#ff4444]">sell</span> properties
            </p>
          </motion.div>

          {/* Search Interface - Mobile Friendly */}
          <motion.div 
            className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 sm:p-4 max-w-5xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 items-stretch sm:items-center">
              {/* Search Type Toggle - Mobile Friendly */}
              <div className="sm:hidden flex justify-center mb-2">
                <div className="flex space-x-1 bg-gray-300 p-1 rounded-lg">
                  {['Rent', 'Buy'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setSearchType(type)}
                      className={`
                        flex-1 px-8 py-2 rounded-md cursor-pointer text-sm font-medium text-center
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

              {/* Desktop Search Type Toggle */}
              <div className="hidden sm:flex items-center border-r border-gray-200 px-4">
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

              {/* Location Dropdown - Mobile Friendly */}
              <div className="flex-1 relative group">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 absolute left-4" />
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-8 py-3 appearance-none bg-transparent focus:outline-none text-sm"
                  >
                    <option value="">Popular Places in Ghana</option>
                    {loading ? (
                      <option disabled>Loading...</option>
                    ) : (
                      popularPlaces.map((place) => (
                        <option key={place.id} value={place.name}>
                          {place.name}
                        </option>
                      ))
                    )}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 absolute right-4" />
                </div>
                <div className="absolute bottom-0 left-2 right-2 h-px bg-gray-200 group-hover:bg-[#0C2340] transition-colors" />
              </div>

              {/* Price Range - Mobile Friendly */}
              <div className="flex sm:hidden flex-col gap-2">
                <div className="relative group">
                  <select 
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full appearance-none bg-transparent pl-3 pr-8 py-3 focus:outline-none text-sm border-b"
                  >
                    <option value="">Min Price</option>
                    {[1000, 2000, 3000, 5000, 10000].map((price) => (
                      <option key={price} value={price}>₵{price.toLocaleString()}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative group">
                  <select 
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full appearance-none bg-transparent pl-3 pr-8 py-3 focus:outline-none text-sm border-b"
                  >
                    <option value="">Max Price</option>
                    {[2000, 5000, 10000, 20000, 50000].map((price) => (
                      <option key={price} value={price}>₵{price.toLocaleString()}</option>
                    ))}
                  </select>
                  <ChevronDown className="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Desktop Price Range */}
              <div className="hidden sm:flex items-center space-x-2 px-4 border-l border-gray-200">
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

              {/* Search Button - Mobile Friendly */}
              <button 
                onClick={handleSearch}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#0C2340] to-[#1B3B66] 
                         text-white rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                <span className="ml-2 font-medium text-sm">Search</span>
              </button>
            </div>
          </motion.div>

          {/* Quick Stats - Mobile Friendly */}
          <motion.div 
            className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center text-white relative z-40"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <QuickStat number="2,500+" label="Available Properties" />
            <QuickStat number="500+" label="Verified Agents" />
            <QuickStat number="10,000+" label="Happy Customers" />
            <QuickStat number="15+" label="Cities Covered" />
          </motion.div>
        </div>
      </motion.div>

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
      <div className="py-16 bg-white relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0C2340] mb-2">
                Explore Popular Areas
              </h2>
              <p className="text-gray-600">
                Discover available rentals in Ghana's most sought-after neighborhoods
              </p>
            </div>
          </AnimatedSection>

          {/* Location Cards with Horizontal Scroll */}
          <ScrollAnimatedSection className="relative">
            <div className="overflow-x-auto scrollbar-hide">
              <motion.div 
                className="flex gap-6 pb-8 relative"
                drag="x"
                dragConstraints={{ right: 0, left: -1600 }}
                whileTap={{ cursor: "grabbing" }}
                style={{ cursor: "grab" }}
              >
                {Array.from({ length: Math.ceil(locationAreas.length / 3) }).map((_, groupIndex) => (
                  <motion.div
                    key={groupIndex}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.5,
                      delay: groupIndex * 0.2,
                      ease: "easeOut"
                    }}
                    className="flex-shrink-0 flex gap-6"
                  >
                    {/* Full height card */}
                    <div 
                      className="relative rounded-2xl overflow-hidden cursor-pointer w-[300px] h-[600px] group"
                      onClick={() => navigate(`/search?region=${locationAreas[groupIndex * 3]?.name}`)}
                    >
                      <img
                        src={locationAreas[groupIndex * 3]?.image}
                        alt={locationAreas[groupIndex * 3]?.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {locationAreas[groupIndex * 3]?.name}
                        </h3>
                        <span className="text-sm font-medium text-white/80">
                          {locationAreas[groupIndex * 3]?.properties}
                        </span>
                      </div>
                    </div>

                    {/* Stacked cards container */}
                    <div className="flex flex-col gap-6">
                      {/* Top card */}
                      <div 
                        className="relative rounded-2xl overflow-hidden cursor-pointer w-[300px] h-[290px] group"
                        onClick={() => navigate(`/search?region=${locationAreas[groupIndex * 3 + 1]?.name}`)}
                      >
                        <img
                          src={locationAreas[groupIndex * 3 + 1]?.image}
                          alt={locationAreas[groupIndex * 3 + 1]?.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {locationAreas[groupIndex * 3 + 1]?.name}
                          </h3>
                          <span className="text-sm font-medium text-white/80">
                            {locationAreas[groupIndex * 3 + 1]?.properties}
                          </span>
                        </div>
                      </div>

                      {/* Bottom card */}
                      <div 
                        className="relative rounded-2xl overflow-hidden cursor-pointer w-[300px] h-[290px] group"
                        onClick={() => navigate(`/search?region=${locationAreas[groupIndex * 3 + 2]?.name}`)}
                      >
                        <img
                          src={locationAreas[groupIndex * 3 + 2]?.image}
                          alt={locationAreas[groupIndex * 3 + 2]?.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {locationAreas[groupIndex * 3 + 2]?.name}
                          </h3>
                          <span className="text-sm font-medium text-white/80">
                            {locationAreas[groupIndex * 3 + 2]?.properties}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </div>

      {/* PreferencesModal */}
      <PreferencesModal
        isOpen={showPreferencesModal}
        onClose={() => setShowPreferencesModal(false)}
        onComplete={handlePreferencesComplete}
      />
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