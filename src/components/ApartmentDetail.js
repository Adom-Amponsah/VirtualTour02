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
  ChevronLeft, ChevronRight, BedDouble, X, Check,
  Send, Reply, MoreVertical, ThumbsUp, User, MessageCircle
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

const gradientColors = [
  'from-[#0C2340] to-[#183A66]',  // Navy Blue
  'from-[#2E7D32] to-[#43A047]',  // Green
  'from-[#C62828] to-[#E53935]',  // Red
  'from-[#F9A825] to-[#FBC02D]',  // Yellow
  'from-[#6A1B9A] to-[#8E24AA]',  // Purple
  'from-[#00838F] to-[#00ACC1]',  // Teal
  'from-[#D84315] to-[#F4511E]',  // Orange
  'from-[#1565C0] to-[#1E88E5]'   // Royal Blue
];

const ReviewCard = ({ review, onViewMore, index }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review.likes);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const gradientColor = gradientColors[index % gradientColors.length];

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onViewMore}
      className={`bg-gradient-to-br ${gradientColor} rounded-xl p-6 cursor-pointer
                  w-[300px] h-[320px] flex flex-col justify-between 
                  shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      {/* User Info */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">{review.userName}</h3>
            <p className="text-white/60 text-sm">{review.date}</p>
          </div>
        </div>

        {/* Review Preview */}
        <p className="text-white/90 text-lg leading-relaxed mb-6 line-clamp-6">
          {review.content}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-auto">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full 
            ${isLiked
              ? 'bg-white text-[#0C2340]'
              : 'bg-white/10 text-white hover:bg-white/20'
            } transition-colors`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewMore();
          }}
          className="text-white/80 hover:text-white text-sm font-medium"
        >
          Read More →
        </button>
      </div>
    </motion.div>
  );
};

const ReviewModal = ({ review, isOpen, onClose }) => {
  if (!isOpen || !review) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#0C2340]/10 flex items-center justify-center">
              <User className="w-8 h-8 text-[#0C2340]" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{review.userName}</h3>
              <p className="text-gray-500 text-sm">{review.date}</p>
            </div>
          </div>

          {/* Full Review Content */}
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {review.fullContent}
          </p>

          {/* Engagement Stats */}
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{review.likes} likes</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{review.replies} replies</span>
            </div>
          </div>

          {/* Add Comment Section */}
          <div className="border-t mt-6">
            <div className="pt-6">
              <CommentSection review={review} />
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ScrollArrow = ({ direction, onClick }) => {
  // ... same as SinglePropertyShowcase ...
};

const CommentSection = ({ review }) => {
  const [comments, setComments] = useState(review.comments || []);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      user: "Current User", // Replace with actual user data
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked
        };
      }
      return comment;
    }));
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return b.likes - a.likes;
  });

  return (
    <div className="mt-6">
      {/* Comment Input */}
      <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#0C2340]/10 flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-[#0C2340]" />
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 pr-12 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#0C2340] hover:bg-[#0C2340]/10 rounded-full transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Sort Options */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-500">{comments.length} comments</span>
        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-sm text-gray-700 bg-transparent border-none focus:ring-0"
        >
          <option value="newest">Sort by newest</option>
          <option value="likes">Sort by most liked</option>
        </select>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.map(comment => (
          <div key={comment.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0C2340]/10 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-[#0C2340]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.user}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 text-sm mb-2">{comment.content}</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikeComment(comment.id)}
                  className={`flex items-center gap-1 text-xs ${
                    comment.isLiked ? 'text-[#0C2340]' : 'text-gray-500'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-xs text-gray-500 flex items-center gap-1">
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              </div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
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

  const [selectedReview, setSelectedReview] = useState(null);

  const reviews = [
    {
      id: 1,
      userName: "Sarah K.",
      userImage: "/images/user1.jpg",
      date: "2 weeks ago",
      content: "The location is fantastic, and the amenities exceeded my expectations.",
      fullContent: "The location is fantastic, and the amenities exceeded my expectations. The spacious layout, the modern decor, and the peaceful environment made my stay memorable. The customer service team was always responsive and helpful. Highly recommended for anyone looking for a luxurious experience in Cantonments.",
      likes: 42,
      replies: 5,
      comments: [
        {
          id: 1,
          user: "John D.",
          content: "I had a similar experience! The amenities are truly exceptional.",
          timestamp: "2024-03-10T10:30:00Z",
          likes: 5,
          isLiked: false
        },
        {
          id: 2,
          user: "Emma W.",
          content: "Did you try the rooftop garden? It's amazing!",
          timestamp: "2024-03-09T15:20:00Z",
          likes: 3,
          isLiked: false
        }
      ]
    },
    {
      id: 2,
      userName: "John D.",
      userImage: "/images/user2.jpg",
      date: "3 days ago",
      content: "A good property overall, but I had some minor issues with maintenance.",
      fullContent: "A good property overall, but I had some minor issues with maintenance. The air conditioning took a while to be fixed, but the staff handled it professionally. The location is convenient, and the property feels safe. A little improvement in response time would make it perfect!",
      likes: 15,
      replies: 2
    },
    {
      id: 3,
      userName: "Emily R.",
      userImage: "/images/user3.jpg",
      date: "1 month ago",
      content: "Perfect for families! The playground and swimming pool were a hit with my kids.",
      fullContent: "Perfect for families! The playground and swimming pool were a hit with my kids. The kitchen had all the modern appliances we needed, and the neighborhood was very quiet and family-friendly. I appreciated how secure the property felt. We had a great time staying here!",
      likes: 30,
      replies: 4
    },
    {
      id: 4,
      userName: "Michael T.",
      userImage: "/images/user4.jpg",
      date: "1 week ago",
      content: "This property offers great value for the price. Highly recommend it!",
      fullContent: "This property offers great value for the price. Highly recommend it! The living space was clean and well-maintained. The Wi-Fi was fast, and the furniture was comfortable. It's close to shops and restaurants, which was very convenient. Definitely worth it if you're visiting Cantonments.",
      likes: 20,
      replies: 1
    },
    {
      id: 5,
      userName: "Anna B.",
      userImage: "/images/user5.jpg",
      date: "5 days ago",
      content: "I absolutely loved the rooftop views and the cozy ambiance.",
      fullContent: "I absolutely loved the rooftop views and the cozy ambiance. The sunsets were breathtaking, and the property had a warm and inviting vibe. The staff was friendly and quick to address any concerns. It felt like a home away from home. Can't wait to return!",
      likes: 50,
      replies: 6
    },
    {
      id: 6,
      userName: "Paul W.",
      userImage: "/images/user6.jpg",
      date: "3 weeks ago",
      content: "The property was very clean, but the parking space was limited.",
      fullContent: "The property was very clean, but the parking space was limited. While the interior was well-furnished and the kitchen was equipped with modern appliances, I had to park quite far from the building. The staff was helpful, but I hope they address the parking issue soon.",
      likes: 18,
      replies: 3
    },
    // {
    //   id: 7,
    //   userName: "Linda M.",
    //   userImage: "/images/user7.jpg",
    //   date: "1 month ago",
    //   content: "Amazing hospitality! The staff went above and beyond.",
    //   fullContent: "Amazing hospitality! The staff went above and beyond to make sure we were comfortable. The rooms were spacious, and the amenities were well-maintained. I especially enjoyed the breakfast service. It’s rare to find such excellent service these days.",
    //   likes: 36,
    //   replies: 7
    // },
    // {
    //   id: 8,
    //   userName: "Tom H.",
    //   userImage: "/images/user8.jpg",
    //   date: "2 weeks ago",
    //   content: "A great property, but the noise from the nearby road was noticeable.",
    //   fullContent: "A great property, but the noise from the nearby road was noticeable during the day. Aside from that, everything else was perfect—the location, the furnishings, and the cleanliness. I'd stay here again, but I’d recommend requesting a room on the quieter side of the property.",
    //   likes: 12,
    //   replies: 2
    // },
    // {
    //   id: 9,
    //   userName: "Martha L.",
    //   userImage: "/images/user9.jpg",
    //   date: "4 days ago",
    //   content: "The property was lovely, but the check-in process was slow.",
    //   fullContent: "The property was lovely, but the check-in process was slow. It took almost 30 minutes before I could get my room key, which was frustrating. However, the staff apologized and made up for it with complimentary drinks. The property itself was amazing and very well-maintained.",
    //   likes: 22,
    //   replies: 4
    // },
    // {
    //   id: 10,
    //   userName: "James P.",
    //   userImage: "/images/user10.jpg",
    //   date: "6 days ago",
    //   content: "Beautiful property with stunning gardens and outdoor spaces.",
    //   fullContent: "Beautiful property with stunning gardens and outdoor spaces. I loved spending my mornings in the garden area—it was so peaceful. The rooms were clean, and the staff was very courteous. Overall, it’s a great place to unwind and relax.",
    //   likes: 40,
    //   replies: 5
    // }
  ];

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
                // onClick={() => {}}
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
              Compare All Apartments
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {/* Enhanced Location and Rating Bar */}
      

        {/* Main Grid with Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-10">
          
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
              <div className="grid grid-cols-2 gap-4 ">
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
            <div className="mb-12">
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

           
          </div>

          {/* Right Column - Request Tour Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 h-fit ">         
             <h2 className="text-xl font-semibold mb-4">Request a Tour</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0C2340] focus:border-transparent"
                  placeholder="Enter your name"
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

 {/* Add Reviews Section Here */}
 <div className="mt-16 mx-4 md:mx-8 lg:ml-36">
              <h2 className="text-2xl font-bold mb-6">What Residents Are Saying</h2>
              <div className="relative px-8">
                <div 
                  className="overflow-x-auto flex gap-1 pb-4 snap-x snap-mandatory scroll-smooth"
                  id="reviews-container"
                >
                  {reviews.map((review, index) => (
                    <div key={review.id} className="flex-none snap-center" style={{ width: '320px' }}>
                      <ReviewCard
                        review={review}
                        index={index}
                        onViewMore={() => setSelectedReview(review)}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Scroll Arrows */}
                <ScrollArrow 
                  direction="left" 
                  onClick={() => {
                    const container = document.getElementById('reviews-container');
                    container.scrollBy({ left: -340, behavior: 'smooth' });
                  }}
                />
                <ScrollArrow 
                  direction="right" 
                  onClick={() => {
                    const container = document.getElementById('reviews-container');
                    container.scrollBy({ left: 340, behavior: 'smooth' });
                  }}
                />
              </div>
            </div>

            {/* Review Modal */}
            <ReviewModal
              review={selectedReview}
              isOpen={!!selectedReview}
              onClose={() => setSelectedReview(null)}
            />
      <ComparisonModal 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        roomTypes={roomTypes}
      />
    </div>
  );
};

export default ApartmentDetail;