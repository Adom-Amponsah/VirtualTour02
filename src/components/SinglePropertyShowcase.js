import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VirtualTour from '../virtualTour';
import { 
  BedDouble, Bath, Square, Key, Wind, Wifi, 
  Car, Lock, Mountain, MapPin, ArrowLeft,
  Star, Share, Heart, ChevronLeft, ChevronRight
} from 'lucide-react';

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
    ],
    scenes: {
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
    },
    images: [
      { id: 1, src: "/images/apart022.jpeg", alt: "Living Room" },
      { id: 2, src: "/images/apart02.jpg", alt: "Kitchen" },
      { id: 3, src: "/images/apart03.jpg", alt: "Bedroom" },
      { id: 4, src: "/images/apart04.jpg", alt: "Bathroom" },
      { id: 5, src: "/images/apart05.jpg", alt: "Exterior" },
    ],
  };

  const PhotoGallery = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const previousImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="relative bg-gray-900">
        {/* Main Image */}
        <div className="relative h-[60vh]">
          <img
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-gray-900 p-4">
          <div className="flex gap-2 overflow-x-auto max-w-7xl mx-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 relative ${
                  currentImageIndex === index 
                    ? 'ring-2 ring-white' 
                    : 'opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-20 w-32 object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
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
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Virtual Tour Section */}
      <div className="relative h-[70vh]">
        <VirtualTour scenes={property.scenes} />
        <div className="absolute top-4 left-4 z-10">
          <div className="px-3 py-1 rounded-full bg-[#0C2340] text-white text-sm font-medium">
            Available Now
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      {/* <div className="mb-8">
        <PhotoGallery images={property.images} />
      </div> */}

      {/* Property Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Split into two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Property Info */}
              <div className="space-y-8">
                {/* Title and Location */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.location}
                  </div>
                </div>

                {/* Price Section */}
                <div>
                  <div className="text-3xl font-bold text-[#0C2340]">
                    ₵{property.price.toLocaleString()}
                    <span className="text-sm font-normal text-gray-500">/month</span>
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="p-2 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      1 Year: ₵{(property.price * 11).toLocaleString()}/mo
                    </div>
                    <div className="p-2 bg-green-50 text-green-700 rounded-lg text-sm">
                      2 Years: ₵{(property.price * 10).toLocaleString()}/mo
                    </div>
                  </div>
                </div>

                {/* Property Features */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-[#0C2340]" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-[#0C2340]" />
                    <span>{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5 text-[#0C2340]" />
                    <span>{property.size} sqft</span>
                  </div>
                </div>

                {/* Photo Gallery moved here
                <div className="mt-8">
                  <PhotoGallery images={property.images} />
                </div> */}

                {/* Amenities */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {property.amenities.map((amenity, index) => (
                      <div 
                        key={index} 
                        className="flex items-center gap-3 p-2 rounded-lg bg-gray-50"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#0C2340]/10 flex items-center justify-center">
                          <amenity.icon className="w-4 h-4 text-[#0C2340]" />
                        </div>
                        <span className="text-gray-700">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">About this property</h2>
                  <p className="text-gray-600">{property.description}</p>
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
              </div>

              

              {/* Right Column - Request Tour Form */}
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
        </div>
      </div>
    </div>
  );
};

export default SinglePropertyShowcase; 