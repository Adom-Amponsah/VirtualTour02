import React, { useState } from 'react';
import { Wifi, Construction, Lightbulb, Info, X, AlertTriangle, CheckCircle2, Shield, ArrowRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RatingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const categories = [
    {
      id: 'internet',
      icon: Wifi,
      title: 'Internet Connectivity',
      rating: 'excellent',
      mainPoints: [
        "Fiber optic connection available throughout",
        "Multiple ISP options (Vodafone, MTN, etc.)",
        "Strong 4G/5G mobile coverage",
        "Average speeds of 100Mbps+"
      ],
      description: "The area enjoys excellent internet infrastructure with multiple connectivity options. Fiber optic cables are laid throughout the neighborhood, and all major ISPs provide service here. Mobile internet is particularly strong with consistent 4G/5G coverage."
    },
    {
      id: 'road',
      icon: Construction,
      title: 'Road Access',
      rating: 'good',
      mainPoints: [
        "Paved roads in good condition",
        "Easy access to main highways",
        "Regular maintenance schedule",
        "Moderate traffic during peak hours"
      ],
      description: "Road infrastructure is well-maintained with recent renovations. The area connects easily to major highways and commercial districts. Some traffic during rush hours but generally flows smoothly."
    },
    {
      id: 'streetLights',
      icon: Lightbulb,
      title: 'Street Lighting',
      rating: 'bad',
      mainPoints: [
        "Limited coverage in some areas",
        "Maintenance needs improvement",
        "Some dark spots between posts",
        "Ongoing upgrade project planned"
      ],
      description: "Street lighting coverage needs improvement. While main roads are lit, some residential areas have gaps in coverage. The local authority has planned upgrades, but current conditions may require additional personal lighting."
    }
  ];

  const ratingStyles = {
    bad: {
      gradient: 'from-red-500/20 via-red-500/10 to-transparent',
      badge: 'bg-red-500',
      icon: 'text-red-500',
      lightBg: 'bg-red-50',
      border: 'border-red-200',
      indicator: AlertTriangle
    },
    good: {
      gradient: 'from-green-500/20 via-green-500/10 to-transparent',
      badge: 'bg-green-500',
      icon: 'text-green-500',
      lightBg: 'bg-green-50',
      border: 'border-green-200',
      indicator: CheckCircle2
    },
    excellent: {
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      badge: 'bg-blue-500',
      icon: 'text-blue-500',
      lightBg: 'bg-blue-50',
      border: 'border-blue-200',
      indicator: Shield
    }
  };

  const handleNext = () => {
    if (currentStep < categories.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const currentCategory = categories[currentStep];
  const style = ratingStyles[currentCategory.rating];
  const StatusIcon = style.indicator;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 bg-gradient-to-br from-[#0C2340] to-[#1B3B66]">
          <div className="flex justify-between items-center">
            <div>
              {currentStep > 0 && (
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center"
            >
              <h2 className="text-2xl font-bold text-white">Area Infrastructure Review</h2>
              <p className="text-white/80 mt-1">
                {`Step ${currentStep + 1} of ${categories.length}: ${currentCategory.title}`}
              </p>
            </motion.div>

            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="w-full md:w-1/3 rounded-xl border mb-6 md:mb-0 ${style.border} overflow-hidden"
              >
                <div className={`p-6 bg-gradient-to-br ${style.gradient}`}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start justify-between"
                  >
                    <div className={`p-3 rounded-xl ${style.lightBg}`}>
                      <currentCategory.icon className={`w-6 h-6 ${style.icon}`} />
                    </div>
                    <StatusIcon className={`w-5 h-5 ${style.icon}`} />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-lg font-semibold text-gray-900"
                  >
                    {currentCategory.title}
                  </motion.h3>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-4"
                  >
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${style.badge}`}>
                      {currentCategory.rating.toUpperCase()}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="flex-1"
              >
                <div className="space-y-4">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-600"
                  >
                    {currentCategory.description}
                  </motion.p>
                  <ul className="space-y-2">
                    {currentCategory.mainPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: 0.4 + (index * 0.1),
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4 + (index * 0.1) }}
                          className={`w-2 h-2 rounded-full ${style.badge}`} 
                        />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full px-6 py-3 bg-[#0C2340] text-white rounded-xl 
                     hover:bg-[#0C2340]/90 transition-all duration-300 font-medium
                     flex items-center justify-center gap-2"
          >
            {currentStep === categories.length - 1 ? 'View Property Details' : 'Next'}
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default RatingModal;