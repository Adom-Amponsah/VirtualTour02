import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import ApartmentDetail from './components/ApartmentDetail';
import { BookingProvider } from './context/BookingContext';
import SinglePropertyShowcase from './components/SinglePropertyShowcase';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/apartment/single/:id" element={<SinglePropertyShowcase />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;