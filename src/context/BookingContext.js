import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(null);

  const updateBookingDetails = (details) => {
    setBookingDetails(details);
  };

  const calculatePricing = (basePrice, nights, guests) => {
    const subtotal = basePrice * nights;
    const extraGuestFee = Math.max(0, guests - 1) * 100 * nights;
    const cleaningFee = 150 + (Math.max(0, guests - 1) * 50);
    const serviceFee = Math.round(subtotal * 0.12);
    const total = subtotal + extraGuestFee + cleaningFee + serviceFee;

    return {
      subtotal,
      extraGuestFee,
      cleaningFee,
      serviceFee,
      total
    };
  };

  return (
    <BookingContext.Provider 
      value={{ 
        bookingDetails, 
        updateBookingDetails,
        calculatePricing 
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}; 