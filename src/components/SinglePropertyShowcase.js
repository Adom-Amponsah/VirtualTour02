import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VirtualTour from '../virtualTour';
import {
  BedDouble, Bath, Square, Key, Wind, Wifi,
  Car, Lock, Mountain, MapPin, ArrowLeft,
  Star, Share, Heart, ChevronLeft, ChevronRight,
  ThumbsUp, MessageCircle, User, Send, Reply, MoreVertical
} from 'lucide-react';

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

const ReviewModal = ({ review, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6">
            {/* User Info - Updated with Avatar Icon */}
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
          </div>

          {/* Add Comment Section */}
          <div className="border-t">
            <div className="p-6">
              <CommentSection review={review} />
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
    </AnimatePresence>
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

const styles = {
  scrollContainer: `
    scrollbar-hide overflow-x-auto whitespace-nowrap flex gap-4 pb-4
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari and Opera */
    }
  `
};

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

        {/* Review Preview - Made larger */}
        <p className="text-white/90 text-lg leading-relaxed mb-6 line-clamp-6">
          {review.content}
        </p>
      </div>

      {/* Actions - Moved to bottom */}
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

const ScrollArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full 
                bg-white shadow-lg hover:bg-gray-50 transition-all duration-300
                ${direction === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'}`}
  >
    {direction === 'left' ? (
      <ChevronLeft className="w-6 h-6 text-[#0C2340]" />
    ) : (
      <ChevronRight className="w-6 h-6 text-[#0C2340]" />
    )}
  </button>
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
                className={`flex-shrink-0 relative ${currentImageIndex === index
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

const reviews = [
  {
    id: 1,
    userName: "Sarah K.",
    userImage: "/images/user1.jpg",
    date: "2 weeks ago",
    content: "The location is fantastic, and the amenities exceeded my expectations.",
    fullContent: "The location is fantastic, and the amenities exceeded my expectations. The spacious layout, the modern decor, and the peaceful environment made my stay memorable. The customer service team was always responsive and helpful. Highly recommended for anyone looking for a luxurious experience in Cantonments.",
    likes: 42,
    replies: 5
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
  {
    id: 7,
    userName: "Linda M.",
    userImage: "/images/user7.jpg",
    date: "1 month ago",
    content: "Amazing hospitality! The staff went above and beyond.",
    fullContent: "Amazing hospitality! The staff went above and beyond to make sure we were comfortable. The rooms were spacious, and the amenities were well-maintained. I especially enjoyed the breakfast service. It’s rare to find such excellent service these days.",
    likes: 36,
    replies: 7
  },
  {
    id: 8,
    userName: "Tom H.",
    userImage: "/images/user8.jpg",
    date: "2 weeks ago",
    content: "A great property, but the noise from the nearby road was noticeable.",
    fullContent: "A great property, but the noise from the nearby road was noticeable during the day. Aside from that, everything else was perfect—the location, the furnishings, and the cleanliness. I'd stay here again, but I’d recommend requesting a room on the quieter side of the property.",
    likes: 12,
    replies: 2
  },
  {
    id: 9,
    userName: "Martha L.",
    userImage: "/images/user9.jpg",
    date: "4 days ago",
    content: "The property was lovely, but the check-in process was slow.",
    fullContent: "The property was lovely, but the check-in process was slow. It took almost 30 minutes before I could get my room key, which was frustrating. However, the staff apologized and made up for it with complimentary drinks. The property itself was amazing and very well-maintained.",
    likes: 22,
    replies: 4
  },
  {
    id: 10,
    userName: "James P.",
    userImage: "/images/user10.jpg",
    date: "6 days ago",
    content: "Beautiful property with stunning gardens and outdoor spaces.",
    fullContent: "Beautiful property with stunning gardens and outdoor spaces. I loved spending my mornings in the garden area—it was so peaceful. The rooms were clean, and the staff was very courteous. Overall, it’s a great place to unwind and relax.",
    likes: 40,
    replies: 5
  }
];



  const [selectedReview, setSelectedReview] = useState(null);

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

      <div className="mt-16 ml-36 mr-36">
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
    </div>
  );
};

export default SinglePropertyShowcase; 