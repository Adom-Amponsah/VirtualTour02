import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, Construction, Lightbulb, Users, Church, Moon, 
  Coffee, BookOpen, Heart, Volume2, X, ChevronLeft, ArrowRight,
  Home, Building
} from 'lucide-react';

const PreferencesModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const questions = [
    {
      id: 'lifestyle',
      icon: Users,
      title: 'Lifestyle Preferences',
      question: 'What type of lifestyle matters most to you?',
      options: [
        { value: 'family', label: 'Family-Oriented', icon: Home },
        { value: 'introvert', label: 'Quiet & Private', icon: BookOpen },
        { value: 'nightlife', label: 'Active Nightlife', icon: Moon },
        { value: 'social', label: 'Social & Community', icon: Heart }
      ]
    },
    {
      id: 'amenities',
      icon: Wifi,
      title: 'Important Amenities',
      question: 'Rate the importance of these amenities:',
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
      question: 'What community features matter to you?',
      options: [
        { value: 'religious', label: 'Religious Facilities', icon: Church },
        { value: 'cafes', label: 'Cafes & Restaurants', icon: Coffee },
        { value: 'community', label: 'Community Centers', icon: Users },
        { value: 'education', label: 'Educational Institutions', icon: BookOpen }
      ]
    }
  ];

  const [preferences, setPreferences] = useState({});

  const handleOptionSelect = (questionId, option, importance) => {
    setPreferences(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [option.value]: importance
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-[#0C2340] to-[#1B3B66]">
          <div className="flex justify-between items-center">
            {/* Back button */}
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

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 text-center"
            >
              <h2 className="text-2xl font-bold text-white">Help Us Find Your Perfect Home</h2>
              <p className="text-white/80 mt-1">
                {`Step ${currentStep + 1} of ${questions.length}: ${currentQuestion.title}`}
              </p>
            </motion.div>

            {/* Close button */}
            <button 
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => (
              <div key={option.value} className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#0C2340]/10">
                    <option.icon className="w-5 h-5 text-[#0C2340]" />
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
                
                <div className="flex gap-2">
                  {['Not Important', 'Somewhat', 'Very Important'].map((importance) => (
                    <button
                      key={importance}
                      onClick={() => handleOptionSelect(currentQuestion.id, option, importance)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm transition-all ${
                        preferences[currentQuestion.id]?.[option.value] === importance
                          ? 'bg-[#0C2340] text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {importance}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full px-6 py-3 bg-[#0C2340] text-white rounded-xl 
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