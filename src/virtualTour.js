import React, { useState, useEffect, useRef } from 'react';
import { Pannellum } from 'pannellum-react';
import './virtualTour.css';

const VirtualTour = ({ scenes, onSceneChange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentScene, setCurrentScene] = useState(Object.keys(scenes)[0]);
  const [preloadedScenes, setPreloadedScenes] = useState({});
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const viewerRefs = useRef({});
  const autoRotationInterval = useRef(null);
  const currentYawRef = useRef(180); // Initial yaw value
  const autoRotationSpeed = 5; // Degrees per second

  // Preload all scenes
  useEffect(() => {
    const preloadImages = async () => {
      const loadedScenes = {};
      
      for (const [sceneId, scene] of Object.entries(scenes)) {
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = scene.imageSource;
            img.onload = () => {
              loadedScenes[sceneId] = img;
              resolve();
            };
            img.onerror = reject;
          });
        } catch (err) {
          console.error(`Failed to load scene: ${sceneId}`, err);
        }
      }
      
      setPreloadedScenes(loadedScenes);
      setIsLoading(false);
    };

    preloadImages();
  }, [scenes]);

  // Handle auto-rotation
  useEffect(() => {
    const startAutoRotation = () => {
      if (autoRotationInterval.current) return;

      autoRotationInterval.current = setInterval(() => {
        if (!isUserInteracting && viewerRefs.current[currentScene]) {
          try {
            // Get the underlying Pannellum viewer instance
            const viewer = viewerRefs.current[currentScene].getViewer();
            
            if (viewer) {
              // Update the yaw value
              currentYawRef.current += autoRotationSpeed / 10;
              viewer.setYaw(currentYawRef.current);
            }
          } catch (error) {
            console.error('Error updating viewer position:', error);
          }
        }
      }, 100); // Update every 100ms for smooth rotation
    };

    const stopAutoRotation = () => {
      if (autoRotationInterval.current) {
        clearInterval(autoRotationInterval.current);
        autoRotationInterval.current = null;
      }
    };

    // Start auto-rotation when component mounts
    startAutoRotation();

    // Cleanup on unmount
    return () => stopAutoRotation();
  }, [currentScene, isUserInteracting]);

  // Track viewer movement
  const handleViewerMove = (evt) => {
    if (!isUserInteracting) return;
    const viewer = viewerRefs.current[currentScene]?.getViewer();
    if (viewer) {
      currentYawRef.current = viewer.getYaw();
    }
  };

  // Handle user interaction events
  const handleMouseDown = () => {
    setIsUserInteracting(true);
  };

  const handleMouseUp = () => {
    const viewer = viewerRefs.current[currentScene]?.getViewer();
    if (viewer) {
      currentYawRef.current = viewer.getYaw();
    }
    setIsUserInteracting(false);
  };

  const handleTouchStart = () => {
    setIsUserInteracting(true);
  };

  const handleTouchEnd = () => {
    const viewer = viewerRefs.current[currentScene]?.getViewer();
    if (viewer) {
      currentYawRef.current = viewer.getYaw();
    }
    setIsUserInteracting(false);
  };

  // Handle scene transitions
  const handleSceneChange = (newScene) => {
    setCurrentScene(newScene);
    onSceneChange?.(newScene);
    // Reset yaw for new scene
    currentYawRef.current = 180;
  };

  // Add event listeners to document
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Initial Loading Screen */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gray-100">
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
              <div className="text-lg font-medium">Preparing Virtual Tour</div>
              <div className="text-sm text-white/70">Loading all rooms...</div>
            </div>
          </div>
        </div>
      )}

      {/* Room Navigation Tabs */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-center space-x-2">
        {Object.entries(scenes).map(([sceneId, scene]) => (
          <button 
            key={sceneId} 
            onClick={() => handleSceneChange(sceneId)}
            className={`px-6 py-3 rounded-lg backdrop-blur-md transition-all duration-300
              ${sceneId === currentScene 
                ? 'bg-[#B71C1C] text-white shadow-lg scale-105' 
                : 'bg-black/30 text-white hover:bg-black/40'
              }`}
          >
            {scene.title}
          </button>
        ))}
      </div>

      {/* Pannellum Views */}
      <div className="relative w-full h-full">
        {Object.entries(scenes).map(([sceneId, scene]) => (
          <div 
            key={sceneId}
            className={`absolute inset-0 transition-opacity duration-500 ${
              sceneId === currentScene ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Pannellum
              ref={el => viewerRefs.current[sceneId] = el}
              width="100%"
              height="100%"
              image={scene.imageSource}
              pitch={10}
              yaw={180}
              hfov={200}
              autoLoad
              hotSpots={scene.hotSpots || []}
              loadButtonLabel=""
              loadingLabel=""
              showLoadingBox={false}
              showFullscreenCtrl={false}
              showControls={false}
              onMousedown={handleMouseDown}
              onMouseup={handleMouseUp}
              onTouchstart={handleTouchStart}
              onTouchend={handleTouchEnd}
              onRender={handleViewerMove}
              config={{
                showLoadingBar: false,
                showFullscreenCtrl: false,
                autoLoad: true,
                loadingHTML: "",
                loadingMessage: "",
                uiText: {
                  loadingLabel: "",
                  loadButtonLabel: "",
                },
                showControls: false,
                showLoadingBox: false,
              }}
              onLoad={() => {
                if (sceneId === currentScene) {
                  setIsLoading(false);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualTour;