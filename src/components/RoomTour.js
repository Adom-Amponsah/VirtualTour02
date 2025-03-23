import React from 'react';
import VirtualTour from '../virtualTour'; 

const RoomTour = ({ roomId }) => {
  return (
    <div>
      <h2>Room Tour: {roomId}</h2>
      <VirtualTour />
    </div>
  );
};

export default RoomTour; 