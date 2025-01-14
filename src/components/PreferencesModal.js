import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Construction, Lightbulb, Users, Church, Moon, 
  Coffee, BookOpen, Heart, Volume2, X, ChevronLeft, ArrowRight,
  Home, Building, Shield, AlertTriangle
} from 'lucide-react';

const PreferencesModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  const questions = [
    {
      id: 'lifestyle',
      icon: Users,
      title: 'Lifestyle Preferences',
      subtitle: 'What matters most in your daily life?',
      color: 'blue',
      options: [
        { value: 'family', label: 'Family-Friendly Environment', icon: Home },
        { value: 'quiet', label: 'Peace and Quiet', icon: Moon },
        { value: 'social', label: 'Social Activities', icon: Heart },
        { value: 'education', label: 'Educational Facilities', icon: BookOpen }
      ]
    },
    {
      id: 'amenities',
      icon: Wifi,
      title: 'Infrastructure & Amenities',
      subtitle: 'Rate the importance of these features',
      color: 'green',
      options: [
        { value: 'internet', label: 'Fast Internet', icon: Wifi },
        { value: 'roads', label: 'Good Roads', icon: Construction },
        { value: 'streetLights', label: 'Street Lighting', icon: Lightbulb },
        { value: 'noise', label: 'Quiet Environment', icon: Volume2 }
      ]
    },
    {
      id: 'community',
      icon: Building,
      title: 'Community Features',
      subtitle: 'Select what you value in a neighborhood',
      color: 'purple',
      options: [
        { value: 'religious', label: 'Religious Facilities', icon: Church },
        { value: 'cafes', label: 'Cafes & Restaurants', icon: Coffee },
        { value: 'community', label: 'Community Centers', icon: Users },
        { value: 'security', label: 'Security & Safety', icon: Shield }
      ]
    }
  ];

  const colorStyles = {
    blue: {
      gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
      badge: 'bg-blue-500',
      icon: 'text-blue-500',
      lightBg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    green: {
      gradient: 'from-green-500/20 via-green-500/10 to-transparent',
      badge: 'bg-green-500',
      icon: 'text-green-500',
      lightBg: 'bg-green-50',
      border: 'border-green-200'
    },
    purple: {
      gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
      badge: 'bg-purple-500',
      icon: 'text-purple-500',
      lightBg: 'bg-purple-50',
      border: 'border-purple-200'
    }
  };

  const handleOptionSelect = (questionId, optionValue, importance) => {
    setPreferences(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [optionValue]: importance
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Show loading overlay
      setShowLoadingOverlay(true);
      
      // Wait 3 seconds before completing
      setTimeout(() => {
        setShowLoadingOverlay(false);
        onComplete(preferences);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const style = colorStyles[currentQuestion.color];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl"
          >
            Finding your perfect match...
          </motion.div>
        </motion.div>
      )}

      {/* Modal Container */}
      <motion.div 
        initial={{ opacity: 0, y: '100%' }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: '100%' }}
        className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl bg-white 
                  md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            className="h-full bg-[#0C2340]"
          />
        </div>

        {/* Header - Fixed */}
        <div className="sticky top-0 z-20 bg-gradient-to-br from-[#0C2340] to-[#1B3B66] p-4 md:p-6">
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
              <h2 className="text-xl md:text-2xl font-bold text-white">Help Us Find Your Perfect Home</h2>
              <p className="text-white/80 mt-1 text-sm md:text-base">
                {`Step ${currentStep + 1} of ${questions.length}: ${currentQuestion.title}`}
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Question Card */}
                <motion.div 
                  className={`p-4 md:p-6 rounded-xl bg-gradient-to-r ${style.gradient} 
                            border ${style.border}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 md:p-4 rounded-xl ${style.lightBg}`}>
                      <currentQuestion.icon className={`w-6 h-6 md:w-8 md:h-8 ${style.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900">{currentQuestion.title}</h3>
                      <p className="text-sm md:text-base text-gray-600">{currentQuestion.subtitle}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Options */}
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => {
                    const selectedImportance = preferences[currentQuestion.id]?.[option.value];
                    
                    return (
                      <motion.div
                        key={option.value}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          delay: index * 0.15,
                          duration: 0.4,
                          type: "spring",
                          stiffness: 100
                        }}
                        className={`p-4 rounded-xl border ${
                          selectedImportance ? style.border : 'border-gray-200'
                        } hover:border-[#0C2340]/20 transition-colors bg-white`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.15 + 0.2 }}
                            className={`p-2 rounded-lg ${style.lightBg}`}
                          >
                            <option.icon className={`w-5 h-5 ${style.icon}`} />
                          </motion.div>
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + 0.3 }}
                            className="font-medium text-gray-900"
                          >
                            {option.label}
                          </motion.span>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2">
                          {['Not Important', 'Somewhat', 'Very Important'].map((importance, impIndex) => (
                            <motion.button
                              key={importance}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ 
                                delay: index * 0.15 + 0.4 + (impIndex * 0.1),
                                type: "spring",
                                stiffness: 100
                              }}
                              onClick={() => handleOptionSelect(currentQuestion.id, option.value, importance)}
                              className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                                selectedImportance === importance
                                  ? 'bg-[#0C2340] text-white'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {importance}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="sticky bottom-0 p-4 md:p-6 bg-gray-50 border-t mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full px-6 py-3 md:py-4 bg-[#0C2340] text-white rounded-xl 
                     hover:bg-[#0C2340]/90 transition-all duration-300 font-medium
                     flex items-center justify-center gap-2"
          >
            {currentStep === questions.length - 1 ? 'Show Matched Properties' : 'Next'}
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

export default PreferencesModal; 