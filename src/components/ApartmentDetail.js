import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VirtualTour from '../virtualTour';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Lock, Wifi, Briefcase, Car, Tv, Wind, Sun, Camera,
  Star, MapPin, Medal, Share, Heart, Coffee, Utensils,
  Bath, KeyRound, Leaf, Music, Globe, Square, Bed, Mountain, 
  Building, Users, Baby, cigarette, Key, Calendar,
  ChevronLeft, ChevronRight, BedDouble, X, Check
} from 'lucide-react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import { motion } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const Card = ({ children, className = '', hover = false }) => (
  <div className={`bg-white rounded-xl transition-all duration-300 ${
    hover ? 'hover:shadow-xl hover:-translate-y-1' : 'shadow-md'
  } ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({ children, className = '', ...props }) => (
  <button className={`bg-primary text-white py-2 px-4 rounded ${className}`} {...props}>
    {children}
  </button>
);

// Separator Component
const Separator = ({ className = '' }) => (
  <hr className={`border-t border-gray-200 ${className}`} />
);

const Badge = ({ children, className = '' }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </span>
);

const FeatureTag = ({ children }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#B71C1C]/10 text-[#B71C1C] text-sm font-medium">
    {children}
  </span>
);

const IconBox = ({ icon: Icon, label, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-10 h-10 rounded-full bg-[#B71C1C]/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-[#B71C1C]" />
    </div>
    <span className="text-gray-700">{label}</span>
  </div>
);

const LocationMap = ({ latitude, longitude, name }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDLoloIXFnio5NG-9wGUak8RU-Lhc1cusw",
    libraries: ["places"]
  });

  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "12px",
  };

  const center = {
    lat: latitude,
    lng: longitude
  };

  if (loadError) {
    console.error("Error loading maps:", loadError);
    return (
      <div className="h-[400px] w-full rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-2">Failed to load map</p>
          <p className="text-gray-500 text-sm">{loadError.message}</p>
        </div>
      </div>
    );
  }

  // Handle loading state
  if (!isLoaded) {
    return (
      <div className="h-[400px] w-full rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={15}
      center={center}
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      }}
      onLoad={(map) => {
        console.log("Map loaded successfully");
      }}
      onError={(error) => {
        console.error("Map error:", error);
      }}
    >
      <Marker
        position={center}
        title={name}
        animation={window.google?.maps.Animation.DROP}
        onClick={() => {
          console.log("Marker clicked");
        }}
      />
    </GoogleMap>
  );
};

const VirtualTourSection = ({ scenes, name }) => {
  const [currentScene, setCurrentScene] = useState(scenes[Object.keys(scenes)[0]]);

  const handleSceneChange = (sceneId) => {
    setCurrentScene(scenes[sceneId]);
  };

  return (
    <div className="relative h-[70vh] group">
      <VirtualTour 
        scenes={scenes} 
        onSceneChange={handleSceneChange}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none" />
      
      {/* Header Content */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 p-6 z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">
                {name}
              </h1>
              <div className="flex items-center gap-4">
                <Badge className="bg-white/20 backdrop-blur-sm text-white">
                  Virtual Tour
                </Badge>
                <Badge className="bg-white/20 backdrop-blur-sm text-white">
                  {currentScene?.title || 'Loading...'}
                </Badge>
              </div>
            </div>
            
            {/* <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white"
              >
                <Share className="w-5 h-5" />
                <span>Share</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all text-white"
              >
                <Heart className="w-5 h-5" />
                <span>Save</span>
              </motion.button>
            </div> */}
          </div>
        </div>
      </motion.div>

      {/* Scene Information */}
      {/* <SceneInfo 
        title={currentScene.title}
        description={currentScene.description}
      /> */}

      {/* Tour Controls */}
      {/* <TourControls 
        currentScene={currentSceneIndex + 1}
        totalScenes={sceneKeys.length}
        onPrevScene={() => setCurrentSceneIndex(prev => 
          prev === 0 ? sceneKeys.length - 1 : prev - 1
        )}
        onNextScene={() => setCurrentSceneIndex(prev => 
          prev === sceneKeys.length - 1 ? 0 : prev + 1
        )}
      /> */}

      {/* Quick Jump Thumbnails */}
      {/* <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
        {sceneKeys.map((key, index) => (
          <motion.button
            key={key}
            whileHover={{ scale: 1.1 }}
            onClick={() => setCurrentSceneIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSceneIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
};

const RoomTypeCard = ({ type, selected, onClick, index }) => {
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300
        ${selected ? 'ring-2 ring-[#B71C1C] shadow-xl' : 'hover:shadow-lg'}
        opacity-0 translate-y-8 animate-on-scroll
      `}
    >
      <div className="aspect-[16/9] relative">
        <img 
          src={type.image} 
          alt={type.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-lg font-bold">{type.name}</h3>
          <p className="text-sm opacity-90">{type.size} sq.ft</p>
        </div>
        {type.availability === 'Available Now' && (
          <div className="absolute top-4 left-4 z-10">
            <div className="px-3 py-1 rounded-full bg-[#0C2340] text-white text-sm font-medium">
              Available Now
            </div>
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <BedDouble className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{type.bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{type.bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{type.size} sq.ft</span>
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold text-[#0C2340]">
              ₵{type.price.toLocaleString()}
              <span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="flex gap-2 mt-1">
              <Badge className="bg-blue-50 text-blue-700">1 Year: ₵{(type.price * 11).toLocaleString()}/mo</Badge>
              <Badge className="bg-green-50 text-green-700">2 Years: ₵{(type.price * 10).toLocaleString()}/mo</Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Amenities Grid */}
      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
        {type.amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-6 h-6 rounded-full bg-[#0C2340]/10 flex items-center justify-center">
              <amenity.icon className="w-3 h-3 text-[#0C2340]" />
            </div>
            {amenity.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const ComparisonModal = ({ isOpen, onClose, roomTypes }) => {
  if (!isOpen) return null;

  const allFeatures = [...new Set(roomTypes.flatMap(room => 
    room.amenities.map(a => a.name)
  ))].sort();

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 border-b sticky top-0 bg-white z-10"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Compare Apartment Features</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-[76px]">
              <tr>
                <th className="p-4 text-left font-medium text-gray-500 w-[200px]">Features</th>
                {roomTypes.map(type => (
                  <th key={type.id} className="p-4 text-left min-w-[200px]">
                    <div className="font-bold text-lg">{type.name}</div>
                    <div className="text-[#0C2340] font-bold mt-1">
                      ₵{type.price.toLocaleString()}/mo
                    </div>
                    <div className="text-sm text-gray-500 mt-1">{type.size} sq.ft</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {/* Basic Info */}
              <tr className="bg-gray-50">
                <td className="p-4 font-medium">Basic Information</td>
                {roomTypes.map(type => (
                  <td key={type.id} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-gray-500" />
                        {type.bedrooms}
                      </div>
                      <div className="flex items-center gap-2">
                        <Bath className="w-4 h-4 text-gray-500" />
                        {type.bathrooms}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        {type.availability}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Lease Terms */}
              <tr>
                <td className="p-4 font-medium">Lease Terms</td>
                {roomTypes.map(type => (
                  <td key={type.id} className="p-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        1 Year: ₵{(type.price * 11).toLocaleString()}/mo
                      </div>
                      <div className="text-sm">
                        2 Years: ₵{(type.price * 10).toLocaleString()}/mo
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Amenities */}
              {allFeatures.map(feature => (
                <tr key={feature}>
                  <td className="p-4 text-gray-600">{feature}</td>
                  {roomTypes.map(type => (
                    <td key={type.id} className="p-4">
                      {type.amenities.some(a => a.name === feature) ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 border-t sticky bottom-0 bg-white"
        >
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SinglePropertyShowcase = ({ property }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden shadow-xl"
      >
        {/* Property Header */}
        <div className="relative h-[300px] md:h-[400px]">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center gap-4">
              <Badge className="bg-[#0C2340] text-white">Available Now</Badge>
              <Badge className="bg-white/20 backdrop-blur-sm">
                {property.type}
              </Badge>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
          <div className="text-center p-4 rounded-xl bg-white shadow-sm">
            <BedDouble className="w-6 h-6 text-[#0C2340] mx-auto mb-2" />
            <div className="font-semibold">{property.bedrooms}</div>
            <div className="text-sm text-gray-500">Bedrooms</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white shadow-sm">
            <Bath className="w-6 h-6 text-[#0C2340] mx-auto mb-2" />
            <div className="font-semibold">{property.bathrooms}</div>
            <div className="text-sm text-gray-500">Bathrooms</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white shadow-sm">
            <Square className="w-6 h-6 text-[#0C2340] mx-auto mb-2" />
            <div className="font-semibold">{property.size} sq.ft</div>
            <div className="text-sm text-gray-500">Living Space</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-white shadow-sm">
            <Key className="w-6 h-6 text-[#0C2340] mx-auto mb-2" />
            <div className="font-semibold">Ready to Move</div>
            <div className="text-sm text-gray-500">Availability</div>
          </div>
        </div>

        {/* Pricing and Lease Terms */}
        <div className="p-6 border-t">
          <div className="flex flex-wrap gap-6 items-end justify-between">
            <div>
              <div className="text-3xl font-bold text-[#0C2340]">
                ₵{property.price.toLocaleString()}
                <span className="text-sm font-normal text-gray-500">/month</span>
              </div>
              <div className="flex gap-3 mt-2">
                <Badge className="bg-blue-50 text-blue-700">
                  1 Year Lease: ₵{(property.price * 11).toLocaleString()}/mo
                </Badge>
                <Badge className="bg-green-50 text-green-700">
                  2 Year Lease: ₵{(property.price * 10).toLocaleString()}/mo
                </Badge>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#0C2340] text-white rounded-xl 
                         hover:bg-[#0C2340]/90 transition-colors"
            >
              Schedule Viewing
            </motion.button>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Property Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property.amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
              >
                <div className="w-8 h-8 rounded-full bg-[#0C2340]/10 flex items-center justify-center">
                  <amenity.icon className="w-4 h-4 text-[#0C2340]" />
                </div>
                <span className="text-gray-700">{amenity.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ApartmentDetail = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const { updateBookingDetails, calculatePricing } = useBooking();

  // Calculate number of nights between dates
  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Price calculations
  const basePrice = 100;
  const extraGuestFee = 100; 
  const baseCleaning = 150; // Base cleaning fee
  const baseService = 100; // Base service fee

  const apartment = {
    id,
    name: "Ba hao Residence x SANTIPHAP ROOM",
    location: "Room in Bangkok, Thailand",
    description: "1 queen bed · Dedicated bathroom",
    rating: 4.95,
    reviews: 441,
    price: basePrice,
    virtualTourScenes: {
      scene1: {
        panorama: '/images/pano011.jpeg',
        title: 'Living Room',
        description: 'Spacious living area with natural lighting'
      },
      scene2: {
        panorama: '/images/pano02.jpg',
        title: 'Kitchen',
        description: 'Modern kitchen with updated appliances'
      },
      scene3: {
        panorama: '/images/pano03.jpg',
        title: 'Bathroom',
        description: 'Clean and modern bathroom'
      }
    },
    host: {
      name: "Bua",
      type: "Superhost",
      experience: "8 years hosting",
      image: "/api/placeholder/64/64"
    },
    highlights: [
      "Superhost with 8 years of experience",
      "Great location with 4.9 rating",
      "Superior cleaning standards",
      "Free cancellation for 48 hours"
    ],
    languages: ["English", "Thai", "Chinese"],
    houseRules: [
      "Check-in: 3:00 PM - 10:00 PM",
      "Checkout: 11:00 AM",
      "No smoking",
      "No pets",
      "No parties or events",
      "Maximum 2 guests"
    ],
    nearbyAttractions: [
      { name: "Grand Palace", distance: "1.2 km" },
      { name: "Wat Pho Temple", distance: "0.8 km" },
      { name: "Khao San Road", distance: "1.5 km" },
      { name: "Chao Phraya River", distance: "0.3 km" }
    ],
    cancellationPolicy: "Free cancellation for 48 hours. After that, cancel before 3:00 PM on [date] and get a full refund, minus the first night and service fee.",
    coordinates: {
      latitude: 5.6037, // Example: Accra coordinates
      longitude: -0.1870,
    }
  };

  const amenities = [
    { icon: Lock, label: "Lock on bedroom door", category: "Safety" },
    { icon: Wifi, label: "Fast wifi – 345 Mbps", category: "Basic" },
    { icon: Briefcase, label: "Dedicated workspace", category: "Work" },
    { icon: Car, label: "Free street parking", category: "Parking" },
    { icon: Tv, label: "HDTV with Netflix", category: "Entertainment" },
    { icon: Wind, label: "Air conditioning", category: "Comfort" },
  ];

  const handleReserveClick = () => {
    const nights = calculateNights();
    const pricing = calculatePricing(basePrice, nights, guests);
    
    updateBookingDetails({
      startDate,
      endDate,
      guests,
      basePrice,
      apartment: {
        id,
        name: apartment.name,
        location: apartment.location,
        image: apartment.images?.[0],
        rating: apartment.rating,
        reviews: apartment.reviews,
        type: "Room in rental unit"
      },
      ...pricing
    });
    
    navigate('/checkout');
  };

  const scenes = {
    livingRoom: {
      imageSource: "/images/pano011.jpeg",
      title: "Living Room",
      hotSpots: []
    },
    kitchen: {
      imageSource: "/images/pano022.jpeg",
      title: "Kitchen",
      hotSpots: []
    },
    bathroom: {
      imageSource: "/images/pano033.jpeg",
      title: "Bathroom",
      hotSpots: []
    }
  };

  const [selectedRoomType, setSelectedRoomType] = useState(null);

  const roomTypes = [
    {
      id: 1,
      name: "Studio Apartment",
      size: 450,
      bedrooms: "Studio",
      bathrooms: "1 Bathroom",
      price: 1200,
      availability: "Available Now",
      image: "/images/apart011.jpeg",
      amenities: [
        { name: "Air Conditioning", icon: Wind },
        { name: "High-Speed WiFi", icon: Wifi },
        { name: "Built-in Wardrobe", icon: Square },
        { name: "Kitchen", icon: Utensils }
      ]
    },
    {
      id: 2,
      name: "1 Bedroom Apartment",
      size: 650,
      bedrooms: "1 Bedroom",
      bathrooms: "1 Bathroom",
      price: 1800,
      availability: "October 1st",
      image: "/images/apart022.jpeg",
      amenities: [
        { name: "Air Conditioning", icon: Wind },
        { name: "High-Speed WiFi", icon: Wifi },
        { name: "Built-in Wardrobe", icon: Square },
        { name: "Full Kitchen", icon: Utensils },
        { name: "Washer/Dryer", icon: Wind },
        { name: "Balcony", icon: Mountain }
      ]
    },
    {
      id: 3,
      name: "2 Bedroom Apartment",
      size: 950,
      bedrooms: "2 Bedrooms",
      bathrooms: "2 Bathrooms",
      price: 2500,
      availability: "Available Now",
      image: "/images/apart044.jpeg",
      amenities: [
        { name: "Air Conditioning", icon: Wind },
        { name: "High-Speed WiFi", icon: Wifi },
        { name: "Built-in Wardrobes", icon: Square },
        { name: "Full Kitchen", icon: Utensils },
        { name: "Washer/Dryer", icon: Wind },
        { name: "Balcony", icon: Mountain },
        { name: "Storage Room", icon: Lock },
        { name: "Parking Space", icon: Car }
      ]
    }
  ];

  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Check if it's a single unit property
  const isSingleUnit = apartment.type === 'single-unit';

  return (
    <div className="max-w-[2000px] mx-auto">
      <VirtualTourSection 
        scenes={scenes} 
        name={apartment.name}
      />
      
      {isSingleUnit ? (
        <SinglePropertyShowcase property={apartment} />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Choose Your Perfect Space</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select from our range of thoughtfully designed floor plans, 
              each offering unique features and amenities to match your lifestyle.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roomTypes.map((type, index) => (
              <RoomTypeCard
                key={type.id}
                type={type}
                index={index}
                selected={selectedRoomType?.id === type.id}
                onClick={() => setSelectedRoomType(type)}
              />
            ))}
          </div>

          {/* Compare Features Button */}
          <div className="text-center mt-8">
            <button 
              onClick={() => setIsComparisonOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-xl 
                         hover:bg-gray-200 transition-colors text-gray-700"
            >
              <Square className="w-4 h-4" />
              Compare All Features
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Enhanced Location and Rating Bar */}
        <div className="flex flex-wrap items-center justify-between py-6 border-b mb-8">
          {/* <div className="flex flex-wrap items-center gap-6">
            <Badge className="bg-[#0C2340]/10 text-[#0C2340] px-4 py-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {apartment.location}
            </Badge>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="ml-2 font-semibold">{apartment.rating}</span>
              </div>
              <span className="text-gray-400">·</span>
              <a href="#reviews" className="text-[#0C2340] hover:underline">
                {apartment.reviews} reviews
              </a>
            </div>
          </div> */}
          {/* <FeatureTag>
            <Medal className="w-4 h-4 inline mr-2" />
            {apartment.host.type}
          </FeatureTag> */}
        </div>

        {/* Main Grid with Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Host Section */}
            {/* <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10">
                    <img 
                      src={apartment.host.image} 
                      alt={apartment.host.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">
                      Meet your host, {apartment.host.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{apartment.host.experience}</p>
                    <div className="flex flex-wrap gap-2">
                      {apartment.languages.map((lang, idx) => (
                        <Badge 
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-4 py-1"
                        >
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Enhanced About Section */}
            <div className="bg-gradient-to-r from-[#0C2340]/5 to-transparent p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">About this place</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                SANTIPHAP ROOM is a spacious en-suite located on the top floor of the renovated 
                40-year-old Ba hao Residence. Enjoy a unique blend of modern comfort and traditional 
                charm, with easy access to local attractions and dining.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {[
                  { icon: KeyRound, label: "Private entrance" },
                  { icon: Bath, label: "Dedicated bathroom" },
                  { icon: Coffee, label: "Shared kitchen" }
                ].map((feature, idx) => (
                  <IconBox key={idx} icon={feature.icon} label={feature.label} />
                ))}
              </div>
            </div>

            {/* Additional Apartment Images */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-6">Additional Views</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {/* Large image on the left */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img 
                      src="/images/add011.jpeg" 
                      alt="Kitchen Details"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Two smaller images below */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src="/images/app022.jpeg" 
                        alt="Bathroom Amenities"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src="/images/app066.jpeg" 
                        alt="Work Space"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Two smaller images on top */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src="/images/app033.jpeg" 
                        alt="Bedroom Storage"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden">
                      <img 
                        src="/images/app044.jpeg" 
                        alt="Window View"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  {/* Large image below */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img 
                      src="/images/app055.jpeg" 
                      alt="Living Area Details"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">
                These images show additional details and angles not visible in the 360° tour
              </p>
            </div>

            {/* Enhanced Amenities Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {amenities.map((amenity, idx) => (
                  <Card key={idx} hover className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#0C2340]/10 flex items-center justify-center">
                          <amenity.icon className="w-6 h-6 text-[#0C2340]" />
                        </div>
                        <div>
                          <h3 className="font-medium">{amenity.label}</h3>
                          <p className="text-sm text-gray-500">{amenity.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Location Map Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <LocationMap 
                    latitude={apartment.coordinates.latitude}
                    longitude={apartment.coordinates.longitude}
                    name={apartment.name}
                  />
                </CardContent>
              </Card>
              
              {/* Location Details */}
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Location Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#0C2340] mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">123 Sukhumvit Road, Bangkok 10110, Thailand</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-[#0C2340] mt-1" />
                    <div>
                      <h4 className="font-medium">Getting There</h4>
                      <p className="text-gray-600">
                        10 minutes walk from BTS Asok Station
                        <br />
                        15 minutes from Suvarnabhumi Airport by taxi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Star className="w-5 h-5 text-[#0C2340] mt-1" />
                    <div>
                      <h4 className="font-medium">Neighborhood</h4>
                      <p className="text-gray-600">
                        Located in the heart of Sukhumvit, surrounded by restaurants, 
                        shopping centers, and nightlife venues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Booking Card */}
          {/* <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-xl overflow-hidden">
              <div className="bg-primary/5 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-3xl font-bold text-[#B71C1C]">
                    $ {apartment.price.toLocaleString()}
                    <span className="text-base font-normal text-gray-600"> / night</span>
                  </div>
                  <Badge className="bg-primary text-white">
                    <Star className="w-4 h-4 inline mr-1" />
                    {apartment.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-xl bg-gray-50">
                      <div className="text-sm font-medium mb-2">Check-in</div>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="w-full border-none bg-transparent"
                      />
                    </div>
                    <div className="p-4 border rounded-xl bg-gray-50">
                      <div className="text-sm font-medium mb-2">Check-out</div>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="w-full border-none bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="p-4 border rounded-xl bg-gray-50">
                    <div className="text-sm font-medium mb-2">Guests</div>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full border-none bg-transparent text-lg"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">
                      ${basePrice.toLocaleString()} × {calculateNights()} nights
                    </span>
                    <span>${(basePrice * calculateNights()).toLocaleString()}</span>
                  </div>
                  
                  {guests > 1 && (
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-600">
                        Extra guest fee ({guests - 1} guests)
                      </span>
                      <span>${((guests - 1) * extraGuestFee * calculateNights()).toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg">
                    <div>
                      <span className="text-gray-600">Cleaning fee</span>
                      <span className="block text-xs text-gray-500">
                        Based on {guests} guests
                      </span>
                    </div>
                    <span>${(baseCleaning + (Math.max(0, guests - 1) * 50)).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <div>
                      <span className="text-gray-600">Service fee</span>
                      <span className="block text-xs text-gray-500">
                        12% of booking subtotal
                      </span>
                    </div>
                    <span>${(baseService * calculateNights()).toLocaleString()}</span>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span>${calculatePricing(basePrice, calculateNights(), guests).total.toLocaleString()}</span>
                  </div>

                  <Button 
                    className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-[#B71C1C] to-[#7f1616] hover:from-[#7f1616] hover:to-[#B71C1C] transition-all duration-300"
                    onClick={handleReserveClick}
                  >
                    Reserve now
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    You won't be charged yet
                  </p>
                </div>
              </CardContent>
            </Card>
          </div> */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Request a Tour</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Time
                      </label>
                      <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent">
                        <option>Morning (9AM - 12PM)</option>
                        <option>Afternoon (12PM - 4PM)</option>
                        <option>Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                      rows="3"
                      placeholder="Any specific questions or requests?"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full px-8 py-3 bg-[#0C2340] text-white rounded-xl hover:bg-[#0C2340]/90 transition-colors"
                  >
                    Schedule Tour
                  </button>
                </form>
              </div>
        </div>
      </div>

      <ComparisonModal 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        roomTypes={roomTypes}
      />
    </div>
  );
};

export default ApartmentDetail;