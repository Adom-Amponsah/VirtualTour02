import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VirtualTour from '../virtualTour';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  Lock, Wifi, Briefcase, Car, Tv, Wind, Sun, Camera,
  Star, MapPin, Medal, Share, Heart, Coffee, Utensils,
  Bath, KeyRound, Leaf, Music, Globe, Square, Bed, Mountain, Building, Users, Baby, cigarette, Key,
  ChevronLeft, ChevronRight
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
  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
    {children}
  </span>
);

const IconBox = ({ icon: Icon, label, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-primary" />
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

const TourControls = ({ onPrevScene, onNextScene, currentScene, totalScenes }) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black/30 backdrop-blur-md rounded-full px-6 py-3 text-white">
    <button 
      onClick={onPrevScene}
      className="p-2 hover:bg-white/20 rounded-full transition-all"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
    <div className="font-medium">
      {currentScene} / {totalScenes}
    </div>
    <button 
      onClick={onNextScene}
      className="p-2 hover:bg-white/20 rounded-full transition-all"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  </div>
);

const SceneInfo = ({ title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute bottom-28 left-8 max-w-md bg-black/30 backdrop-blur-md rounded-2xl p-6 text-white"
  >
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-white/80">{description}</p>
  </motion.div>
);

const VirtualTourSection = ({ scenes, name }) => {
  const [currentScene, setCurrentScene] = useState(scenes[Object.keys(scenes)[0]]);

  const handleSceneChange = (sceneId) => {
    setCurrentScene(scenes[sceneId]);
  };

  return (
    <div className="relative h-[85vh] group">
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
            
            <div className="flex items-center gap-4">
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
            </div>
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
        panorama: '/images/pano01.jpg',
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
      imageSource: "/images/pano01.jpg",
      title: "Living Room",
      hotSpots: []
    },
    kitchen: {
      imageSource: "/images/pano02.jpg",
      title: "Kitchen",
      hotSpots: []
    },
    bathroom: {
      imageSource: "/images/pano03.jpg",
      title: "Bathroom",
      hotSpots: []
    }
  };

  return (
    <div className="max-w-[2000px] mx-auto">
      <VirtualTourSection 
        scenes={scenes} 
        name={apartment.name}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Enhanced Location and Rating Bar */}
        <div className="flex flex-wrap items-center justify-between py-6 border-b mb-8">
          <div className="flex flex-wrap items-center gap-6">
            <Badge className="bg-primary/10 text-primary px-4 py-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              {apartment.location}
            </Badge>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="ml-2 font-semibold">{apartment.rating}</span>
              </div>
              <span className="text-gray-400">·</span>
              <a href="#reviews" className="text-primary hover:underline">
                {apartment.reviews} reviews
              </a>
            </div>
          </div>
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
            <div className="bg-gradient-to-r from-primary/5 to-transparent p-8 rounded-xl">
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

            {/* Enhanced Amenities Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">What this place offers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {amenities.map((amenity, idx) => (
                  <Card key={idx} hover className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <amenity.icon className="w-6 h-6 text-primary" />
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
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-gray-600">123 Sukhumvit Road, Bangkok 10110, Thailand</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary mt-1" />
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
                    <Star className="w-5 h-5 text-primary mt-1" />
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
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-xl overflow-hidden">
              <div className="bg-primary/5 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-3xl font-bold text-primary">
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
                {/* Date Picker Section */}
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

                {/* Updated Price Breakdown Section */}
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
                    className="w-full py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetail;