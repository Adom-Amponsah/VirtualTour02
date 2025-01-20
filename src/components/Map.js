import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const Map = ({ properties, selectedProperty, onPropertySelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDLoloIXFnio5NG-9wGUak8RU-Lhc1cusw",
    libraries: ["places"]
  });

  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const center = selectedProperty 
    ? { lat: selectedProperty.coordinates[0], lng: selectedProperty.coordinates[1] }
    : { lat: 5.6037, lng: -0.1870 }; 

  if (loadError) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium mb-2">Failed to load map</p>
          <p className="text-gray-500 text-sm">{loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#0C2340] border-t-transparent rounded-full animate-spin mb-2"></div>
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={13}
      center={center}
      options={{
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: false,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      }}
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={{
            lat: property.coordinates[0],
            lng: property.coordinates[1]
          }}
          title={property.title}
          animation={window.google?.maps.Animation.DROP}
          onClick={() => onPropertySelect(property)}
          icon={{
            url: selectedProperty?.id === property.id 
              ? '/marker-selected.png'  // Create these custom marker images
              : '/marker.png',
            scaledSize: new window.google.maps.Size(40, 40)
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default Map; 