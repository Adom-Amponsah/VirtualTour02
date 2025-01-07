import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import ApartmentDetail from './components/ApartmentDetail';
import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}

export default App;