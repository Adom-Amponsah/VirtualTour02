import React from 'react';
import VirtualTour from '../virtualTour'; // Assuming the virtual tour component is in the same directory

const RoomTour = ({ roomId }) => {
  return (
    <div>
      <h2>Room Tour: {roomId}</h2>
      <VirtualTour />
    </div>
  );
};

export default RoomTour; 