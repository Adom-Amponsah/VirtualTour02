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
  X
} from 'lucide-react';

const ApartmentList = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

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
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/rent01.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    },
    {
      id: 2,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/rent02.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 3,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/rent03.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 4,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/test01.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 4,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/test02.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 5,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/test03.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 6,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/rent01.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
    {
      id: 7,
      title: "Luxury Waterfront Villa",
      location: "København, Denmark",
      host: "Bo · Superhost",
      rating: 4.95,
      dates: "Jan 6 - 11",
      price: 1743,
      image: "/images/rent02.jpg",
      amenities: ["Wifi", "Pool", "Kitchen", "Parking", "TV", "AC"],
      type: "Luxury",
      isSuperhost: true,
      description: "Stunning waterfront villa with panoramic views",
      beds: 3,
      baths: 2,
      guests: 6
    }, 
  ];

  const filters = [
    { id: 'all', label: 'All', icon: <Filter /> },
    { id: 'luxury', label: 'Luxury', icon: <Star /> },
    { id: 'beach', label: 'Beachfront', icon: <Waves /> },
    { id: 'modern', label: 'Modern', icon: <Tv /> },
    { id: 'cozy', label: 'Cozy', icon: <Wind /> }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <motion.img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-8"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />
            </div>

            {/* Search Bar */}
            <motion.div 
              className="flex-1 max-w-2xl mx-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative">
                <div className="flex items-center bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full px-4 py-1 text-sm border-none focus:outline-none bg-transparent"
                  />
                  <Button className="rounded-full">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden lg:flex">
                Become a Host
              </Button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-shadow"
              >
                <Menu className="h-4 w-4" />
                <User className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Filters */}
      <div className="pt-24 pb-4 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                  activeFilter === filter.id 
                    ? 'bg-black text-white' 
                    : 'bg-white border border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.icon}
                <span>{filter.label}</span>
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
                  <button
                    onClick={(e) => toggleFavorite(e, listing.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all"
                  >
                    <Heart 
                      className={`h-5 w-5 transition-colors ${
                        favorites.has(listing.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  {listing.isSuperhost && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-medium">
                      Superhost
                    </div>
                  )}
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
                      <span className="text-gray-600 text-sm"> / night</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {listing.dates}
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