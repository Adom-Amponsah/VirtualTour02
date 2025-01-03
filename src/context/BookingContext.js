import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState({
    startDate: null,
    endDate: null,
    guests: 1,
    basePrice: 0,
    nightlyTotal: 0,
    cleaningFee: 0,
    serviceFee: 0,
    total: 0,
    apartment: null
  });

  const updateBookingDetails = (details) => {
    setBookingDetails(prev => ({
      ...prev,
      ...details
    }));
  };

  const calculatePricing = (basePrice, nights, guests) => {
    const extraGuests = Math.max(0, guests - 1);
    const extraGuestFee = 100;
    const baseCleaning = 150;
    
    const nightlyTotal = basePrice * nights;
    const extraGuestsTotal = extraGuests * extraGuestFee * nights;
    const cleaningFee = baseCleaning + (extraGuests * 50);
    const serviceFee = Math.round((nightlyTotal + extraGuestsTotal) * 0.12);
    const total = nightlyTotal + extraGuestsTotal + cleaningFee + serviceFee;

    return {
      nightlyTotal,
      extraGuestsTotal,
      cleaningFee,
      serviceFee,
      total
    };
  };

  return (
    <BookingContext.Provider value={{ bookingDetails, updateBookingDetails, calculatePricing }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 