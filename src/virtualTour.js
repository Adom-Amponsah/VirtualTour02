import React, { useState, useRef, useEffect } from 'react';
import './virtualTour.css';

// Simplified scene configuration without hotspots
const sceneConfig = {
  scene1: {
    panorama: '/images/test01.jpg',
    title: 'Living Room',
    description: 'Spacious living area with natural lighting'
  },
  scene2: {
    panorama: '/images/test02.jpg',
    title: 'Kitchen',
    description: 'Modern kitchen with updated appliances'
  },
  scene3: {
    panorama: '/images/test03.jpg',
    title: 'Bedroom',
    description: 'Comfortable bedroom with built-in storage'
  }
};

const VirtualTour = () => {
  const [currentScene, setCurrentScene] = useState('scene1');
  const viewerRef = useRef(null);
  const panoramaRef = useRef(null);

  useEffect(() => {
    if (window.pannellum && panoramaRef.current) {
      viewerRef.current = window.pannellum.viewer(panoramaRef.current, {
        type: 'equirectangular',
        panorama: sceneConfig[currentScene].panorama,
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
  }, [currentScene]);

  return (
    <div className="virtual-tour">
      <div className="room-selector">
        {Object.entries(sceneConfig).map(([sceneId, scene]) => (
          <button 
            key={sceneId} 
            onClick={() => setCurrentScene(sceneId)}
            className={`room-button ${sceneId === currentScene ? 'active' : ''}`}
          >
            {scene.title}
          </button>
        ))}
      </div>

      <div 
        ref={panoramaRef} 
        className="panorama-viewer"
      />
      
      <div className="room-info">
        <h2>{sceneConfig[currentScene].title}</h2>
        <p>{sceneConfig[currentScene].description}</p>
      </div>
    </div>
  );
};

export default VirtualTour;