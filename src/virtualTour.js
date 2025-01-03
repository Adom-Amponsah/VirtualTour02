import React, { useState, useEffect } from 'react';
import { Pannellum } from 'pannellum-react';
import './virtualTour.css';

const VirtualTour = ({ scenes }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(Object.keys(scenes)[0]);
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!scenes || !scenes[currentScene]?.imageSource) {
      setError('No panorama image was selected');
      return;
    }

    // Create a low-res blur preview
    const img = new Image();
    img.src = scenes[currentScene].imageSource;
    
    img.onerror = () => {
      setError('Failed to load panorama image');
      setIsLoading(false);
    };

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 50;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'blur(8px)';
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        setPreviewImage(canvas.toDataURL());
        setError(null);
      } catch (err) {
        setError('Error processing image preview');
      }
    };
  }, [currentScene, scenes]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center text-gray-600">
          <div className="text-lg font-medium mb-2">{error}</div>
          <div className="text-sm">Please check the image path and try again</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Blur Preview */}
      {isLoading && previewImage && (
        <div 
          className="absolute inset-0 z-10 animate-pulse"
          style={{
            backgroundImage: `url(${previewImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="inline-block w-16 h-16 mb-4">
                <svg className="animate-spin w-full h-full" viewBox="0 0 24 24">
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                    fill="none"
                  />
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
              <div className="text-lg font-medium">Loading Virtual Tour</div>
              <div className="text-sm text-white/70">Please wait while we prepare your experience</div>
            </div>
          </div>
        </div>
      )}

      {/* Room Navigation Tabs */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center space-x-2">
        {Object.entries(scenes).map(([sceneId, scene]) => (
          <button 
            key={sceneId} 
            onClick={() => setCurrentScene(sceneId)}
            className={`px-6 py-3 rounded-lg backdrop-blur-md transition-colors duration-300
              ${sceneId === currentScene 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-black/30 text-white hover:bg-black/40'
              }`}
          >
            {scene.title}
          </button>
        ))}
      </div>

      {/* Actual Pannellum View */}
      <Pannellum
        width="100%"
        height="100%"
        image={scenes[currentScene]?.imageSource}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        onLoad={() => setIsLoading(false)}
        hotSpots={scenes[currentScene]?.hotSpots || []}
        onScenechange={(id) => {
          setIsLoading(true);
          setCurrentScene(id);
        }}
      />
    </div>
  );
};

export default VirtualTour;