import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Globe,
  Menu,
  User,
  Heart,
  Star,
  Calendar,
  Users,
  MapPin,
  Wifi,
  Car,
  UtensilsCrossed,
  Waves,
  Tv,
  Wind,
  Filter,
  X,
  Building,
  Square,
  Bed,
  Mountain,
  SlidersHorizontal
} from 'lucide-react';

const ApartmentList = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Button = ({ children, variant = "default", className = "", size = "default", onClick }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50";
    const variants = {
      default: "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:scale-105",
      outline: "border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300",
      ghost: "hover:bg-gray-50",
      icon: "h-10 w-10 p-0 hover:scale-110 transition-transform"
    };
    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 px-4",
      icon: "h-10 w-10"
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const listings = [
    {
      id: 1,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent011.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    },
    {
      id: 2,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent022.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 3,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent033.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 4,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent011.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 4,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent022.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 5,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent033.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 6,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent011.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 7,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      rating: 4.95,
      price: 1743,
      image: "/images/rent022.jpeg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
  ];

  const filters = [
    { id: 'all', label: 'All Properties', icon: <Building className="w-4 h-4" /> },
    { id: 'apartment', label: 'Apartments', icon: <Square className="w-4 h-4" /> },
    { id: 'studio', label: 'Studios', icon: <Bed className="w-4 h-4" /> },
    { id: 'penthouse', label: 'Penthouses', icon: <Mountain className="w-4 h-4" /> },
    { id: 'family', label: 'Family-Sized', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <motion.div 
                className="text-xl font-bold text-primary"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              >
                ApartmentVR
              </motion.div>
            </div>

            {/* Search Bar */}
            <motion.div 
              className="flex-1 max-w-2xl mx-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow">
                  <Search className="h-5 w-5 text-gray-400 ml-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by location, price, or features..."
                    className="w-full px-4 py-1 text-sm border-none focus:outline-none bg-transparent"
                  />
                  <Button 
                    variant="ghost"
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden lg:flex">
                List Property
              </Button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 border border-gray-200 hover:border-gray-300 transition-all"
              >
                <User className="h-5 w-5 text-gray-600" />
                <span className="hidden md:inline">Account</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Filter Bar */}
      <div className="pt-24 pb-4 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                  activeFilter === filter.id 
                    ? 'bg-[#B71C1C] text-white shadow-md' 
                    : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                <span className="whitespace-nowrap">{filter.label}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {listings.map((listing) => (
            <motion.div
              key={listing.id}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/apartment/${listing.id}`)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3]">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold line-clamp-1">{listing.title}</h3>
                      <p className="text-gray-600 text-sm">{listing.location}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">{listing.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.amenities.slice(0, 3).map((amenity) => (
                      <span 
                        key={amenity}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xl font-bold">${listing.price}</span>
                      <span className="text-gray-600 text-sm"> / month</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {listing.beds} beds · {listing.baths} baths
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default ApartmentList;