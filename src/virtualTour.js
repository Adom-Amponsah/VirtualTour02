import React, { useState, useRef, useEffect } from 'react';

const VirtualTour = ({ scenes }) => {
  const [currentScene, setCurrentScene] = useState(Object.keys(scenes)[0]);
  const viewerRef = useRef(null);
  const panoramaRef = useRef(null);

  useEffect(() => {
    if (window.pannellum && panoramaRef.current) {
      viewerRef.current = window.pannellum.viewer(panoramaRef.current, {
        type: 'equirectangular',
        panorama: scenes[currentScene].panorama,
        autoLoad: true,
        compass: true,
        northOffset: 90,
        hfov: 120,
        minHfov: 50,
        maxHfov: 120,
        showControls: true,
        sceneFadeDuration: 1000,
        mouseZoom: true,
        callback: () => {
          console.log('Panorama loaded');
        }
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [currentScene, scenes]);

  return (
    <div className="h-full">
      <div 
        ref={panoramaRef} 
        className="w-full h-full bg-gray-200"
      />
      
      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2 text-white">
        {Object.entries(scenes).map(([sceneId, scene]) => (
          <button 
            key={sceneId} 
            onClick={() => setCurrentScene(sceneId)}
            className={`px-6 py-3 rounded-lg backdrop-blur-md transition-colors duration-300
              ${sceneId === currentScene 
                ? 'bg-[#B71C1C]/90 text-white' 
                : 'bg-black/30 text-white hover:bg-black/40'
              }`}
          >
            {scene.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VirtualTour;