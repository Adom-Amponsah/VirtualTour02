import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BedDouble, Bath, Square, Key, Wind, Wifi, 
  Car, Lock, Mountain, MapPin, ArrowLeft
} from 'lucide-react';

const Badge = ({ children, className = '' }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </span>
);

const SinglePropertyShowcase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with your actual data fetching logic
  const property = {
    id,
    title: "Luxury Villa in Cantonments",
    type: "Standalone Villa",
    location: "Cantonments, Greater Accra",
    price: 3500,
    bedrooms: "3 Bedrooms",
    bathrooms: "3 Bathrooms",
    size: 2000,
    image: "/images/apart022.jpeg",
    description: "Modern luxury villa with spacious rooms and high-end finishes. Perfect for families looking for a premium living experience in Cantonments.",
    amenities: [
      { name: "Air Conditioning", icon: Wind },
      { name: "High-Speed WiFi", icon: Wifi },
      { name: "Double Garage", icon: Car },
      { name: "Security System", icon: Lock },
      { name: "Garden", icon: Mountain },
      { name: "Backup Generator", icon: Wind },
      { name: "Water Storage", icon: Wind },
      { name: "Staff Quarters", icon: Lock }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Search
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
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
                <Badge className="bg-green-600">Available Now</Badge>
                <Badge className="bg-white/20 backdrop-blur-sm">
                  {property.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
            <div className="text-center p-4 rounded-xl bg-white shadow-sm">
              <BedDouble className="w-6 h-6 text-[#B71C1C] mx-auto mb-2" />
              <div className="font-semibold">{property.bedrooms}</div>
              <div className="text-sm text-gray-500">Bedrooms</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white shadow-sm">
              <Bath className="w-6 h-6 text-[#B71C1C] mx-auto mb-2" />
              <div className="font-semibold">{property.bathrooms}</div>
              <div className="text-sm text-gray-500">Bathrooms</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white shadow-sm">
              <Square className="w-6 h-6 text-[#B71C1C] mx-auto mb-2" />
              <div className="font-semibold">{property.size} sq.ft</div>
              <div className="text-sm text-gray-500">Living Space</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white shadow-sm">
              <Key className="w-6 h-6 text-[#B71C1C] mx-auto mb-2" />
              <div className="font-semibold">Ready to Move</div>
              <div className="text-sm text-gray-500">Availability</div>
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-t">
            <h2 className="text-xl font-semibold mb-4">About this property</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
          </div>

          {/* Pricing and Lease Terms */}
          <div className="p-6 border-t">
            <div className="flex flex-wrap gap-6 items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-[#B71C1C]">
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
                className="px-6 py-3 bg-[#B71C1C] text-white rounded-xl 
                           hover:bg-[#8B1515] transition-colors"
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
                  <div className="w-8 h-8 rounded-full bg-[#B71C1C]/10 flex items-center justify-center">
                    <amenity.icon className="w-4 h-4 text-[#B71C1C]" />
                  </div>
                  <span className="text-gray-700">{amenity.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="p-6 border-t">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{property.location}</span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SinglePropertyShowcase; 