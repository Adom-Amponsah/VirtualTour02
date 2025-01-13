import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Hospital, ShoppingCart, Utensils, Clock, X, MapPin, 
  ChevronRight, Building, Car, School, Bus, Coffee,
  Dumbbell, ChevronLeft, Shield, AlertTriangle 
} from 'lucide-react';

const NeighborhoodModal = ({ isOpen, onClose }) => {
  const [currentCategory, setCurrentCategory] = useState(0);

  const categories = [
    {
      title: "Essential Services",
      subtitle: "Healthcare & Emergency",
      icon: Hospital,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      gradient: "from-rose-500/20 via-rose-500/10 to-transparent",
      places: [
        {
          name: "Nyaho Medical Centre",
          distance: "5 min drive",
          type: "24/7 Medical Center",
          rating: "4.8",
          features: ["Emergency Care", "Pharmacy", "Lab Services"]
        },
        {
          name: "Ridge Hospital",
          distance: "10 min drive",
          type: "Government Hospital",
          rating: "4.5",
          features: ["24/7 Emergency", "Specialist Care", "Ambulance"]
        }
      ]
    },
    {
      title: "Shopping & Markets",
      subtitle: "Groceries & Retail",
      icon: ShoppingCart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
      places: [
        {
          name: "Marina Mall",
          distance: "8 min walk",
          type: "Shopping Mall",
          rating: "4.7",
          features: ["Supermarket", "Fashion", "Food Court"]
        },
        {
          name: "Makola Market",
          distance: "12 min walk",
          type: "Traditional Market",
          rating: "4.4",
          features: ["Fresh Produce", "Local Goods", "Street Food"]
        }
      ]
    },
    {
      title: "Lifestyle & Entertainment",
      subtitle: "Dining & Recreation",
      icon: Coffee,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      gradient: "from-amber-500/20 via-amber-500/10 to-transparent",
      places: [
        {
          name: "The Terrace Café",
          distance: "3 min walk",
          type: "Restaurant & Café",
          rating: "4.9",
          features: ["Breakfast", "Wi-Fi", "Outdoor Seating"]
        },
        {
          name: "Urban Fitness Hub",
          distance: "7 min walk",
          type: "Gym & Wellness",
          rating: "4.6",
          features: ["24/7 Access", "Classes", "Personal Training"]
        }
      ]
    },
    {
      title: "Fitness & Wellness",
      subtitle: "Stay Active & Healthy",
      icon: Dumbbell,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
      places: [
        {
          name: "Icon Fitness Center",
          distance: "4 min walk",
          type: "Modern Gym",
          rating: "4.8",
          features: [
            "24/7 Access",
            "Personal Training",
            "Modern Equipment",
            "Group Classes"
          ]
        },
        {
          name: "Pulse Yoga Studio",
          distance: "6 min walk",
          type: "Yoga & Wellness",
          rating: "4.9",
          features: [
            "Hot Yoga",
            "Meditation Sessions",
            "Expert Instructors",
            "Beginner Friendly"
          ]
        },
        {
          name: "CrossFit Arena",
          distance: "10 min walk",
          type: "CrossFit Box",
          rating: "4.7",
          features: [
            "Group Training",
            "Olympic Lifting",
            "Skilled Coaches",
            "Community Events"
          ]
        }
      ]
    },
    {
      title: "Safety & Security",
      subtitle: "Area Security Assessment",
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
      gradient: "from-red-500/20 via-red-500/10 to-transparent",
      places: [
        {
          name: "Area Security Status",
          distance: "Current Area",
          type: "Security Assessment",
          rating: "3.5",
          features: [
            "⚠️ Moderate theft risk after dark",
            "🚨 Police patrol every 2-3 hours",
            "🏘️ Active neighborhood watch",
            "⚡ Well-lit main streets"
          ]
        },
        {
          name: "Police & Emergency",
          distance: "10 min drive",
          type: "Emergency Services",
          rating: "4.2",
          features: [
            "👮‍♂️ Police station nearby",
            "🚔 Quick response time (15-20 mins)",
            "🆘 Emergency hotline available",
            "🔒 Regular security updates"
          ]
        },
        {
          name: "Safety Tips",
          distance: "Important Notice",
          type: "Resident Advisory",
          rating: "Important",
          features: [
            "🔐 Use additional door locks",
            "📱 Join community security group",
            "🚶‍♂️ Avoid walking alone at night",
            "💡 Install security lights"
          ]
        }
      ],
      alert: {
        type: "warning",
        message: "While the area is generally safe during daytime, there have been reported incidents of theft and burglary, particularly after dark. We recommend taking standard security precautions.",
        recommendations: [
          "Install security cameras",
          "Use double-lock systems",
          "Keep valuables in a safe",
          "Join the neighborhood watch program"
        ]
      }
    }
  ];

  const handleNext = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentCategory > 0) {
      setCurrentCategory(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const category = categories[currentCategory];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl bg-white 
                  md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 z-10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${((currentCategory + 1) / categories.length) * 100}%` }}
            className="h-full bg-[#0C2340]"
          />
        </div>

        {/* Header */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-[#0C2340] to-[#1B3B66] shrink-0">
          <div className="flex justify-between items-center">
            {/* Back button on the left */}
            <div>
              {currentCategory > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={handleBack}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}
            </div>

            {/* Title in center */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Explore Your Neighborhood
              </h2>
              <p className="text-white/80 mt-2 text-base md:text-lg">
                {`Step ${currentCategory + 1} of ${categories.length}: ${category.title}`}
              </p>
            </motion.div>

            {/* Close button on the right */}
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Category Header Card */}
                <motion.div 
                  className={`p-6 rounded-xl bg-gradient-to-r ${category.gradient} 
                            border border-${category.color}/10`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${category.bgColor}`}>
                      <category.icon className={`w-8 h-8 ${category.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600">{category.subtitle}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Places List - Changed from grid to stack on mobile */}
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
                  {category.alert && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="col-span-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-red-700">Security Alert</h4>
                          <p className="text-red-600 mt-1">{category.alert.message}</p>
                          
                          <div className="mt-4 space-y-2">
                            <h5 className="font-medium text-red-700">Recommended Precautions:</h5>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {category.alert.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-red-600">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                  <span className="text-sm">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  {category.places.map((place, index) => (
                    <motion.div
                      key={place.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-xl border border-gray-200 
                               hover:border-[#0C2340]/20 transition-colors bg-white"
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{place.name}</h4>
                            <p className="text-sm text-gray-600">{place.type}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-sm font-medium 
                                       bg-[#0C2340]/10 text-[#0C2340]">
                            {place.distance}
                          </span>
                        </div>

                        {/* Features */}
                        <div className="mt-3 space-y-2">
                          {place.features.map((feature, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + (idx * 0.1) }}
                              className="flex items-center gap-2"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#0C2340]" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        {/* Rating */}
                        <div className="mt-3 flex items-center gap-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <motion.svg
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                                className="w-4 h-4 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </motion.svg>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-600">{place.rating}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer - Fixed at bottom on mobile */}
        <div className="p-4 md:p-6 bg-gray-50 border-t mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full px-6 py-4 bg-[#0C2340] text-white rounded-xl 
                     hover:bg-[#0C2340]/90 transition-all duration-300 font-medium
                     flex items-center justify-center gap-2"
          >
            {currentCategory === categories.length - 1 ? 'Explore the Property' : 'Next Category'}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NeighborhoodModal; 