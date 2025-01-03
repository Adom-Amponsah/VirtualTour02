import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ApartmentList from './components/ApartmentList';
import ApartmentDetail from './components/ApartmentDetail';
import ReservationCheckout from './components/ReservationCheckout';
import { BookingProvider } from './context/BookingContext';

const App = () => {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ApartmentList />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/checkout" element={<ReservationCheckout />} />
        </Routes>
      </BrowserRouter>
    </BookingProvider>
  );
};

export default App;