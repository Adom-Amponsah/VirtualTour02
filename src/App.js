import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ApartmentList from './components/ApartmentList';
import ApartmentDetail from './components/ApartmentDetail';
import ReservationCheckout from './components/ReservationCheckout';
import { BookingProvider } from './context/BookingContext';

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ApartmentList />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/checkout" element={<ReservationCheckout />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
};

export default App;