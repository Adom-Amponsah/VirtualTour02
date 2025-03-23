import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  Star,
  Calendar,
  Users,
  CreditCard,
  Lock,
  Shield,
  Clock,
  Info
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const ReservationCheckout = () => {
  const { bookingDetails, updateBookingDetails, calculatePricing } = useBooking();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(bookingDetails.startDate || new Date());
  const [endDate, setEndDate] = useState(bookingDetails.endDate || new Date());
  const [guests, setGuests] = useState(bookingDetails.guests || 1);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateNights = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleDateChange = (type, date) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    
    const nights = calculateNights();
    const newPricing = calculatePricing(bookingDetails.basePrice, nights, guests);
    updateBookingDetails({
      startDate: type === 'start' ? date : startDate,
      endDate: type === 'end' ? date : endDate,
      ...newPricing
    });
  };

  const handleGuestsChange = (newGuests) => {
    setGuests(newGuests);
    const nights = calculateNights();
    const newPricing = calculatePricing(bookingDetails.basePrice, nights, newGuests);
    updateBookingDetails({
      guests: newGuests,
      ...newPricing
    });
  };

  const listing = {
    id: 1,
    title: "Cozy room in the Langen Reihe",
    location: "St. Georg",
    type: "Room in rental unit",
    rating: 4.99,
    reviews: 348,
    image: "/images/rent01.jpg",
    host: "Superhost",
    price: {
      nightly: 1058.83,
      nights: 5,
      cleaning: 747.42,
      service: 747.42,
      total: 6041.56
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/booking-confirmation');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-8">Request to book</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Your trip</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dates</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleDateChange('start', date)}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          className="w-full p-3 border rounded-lg"
                          placeholderText="Check-in"
                        />
                        <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                      </div>
                      <div className="relative">
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => handleDateChange('end', date)}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          minDate={startDate}
                          className="w-full p-3 border rounded-lg"
                          placeholderText="Check-out"
                        />
                        <Calendar className="absolute right-3 top-3 text-gray-400" size={20} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <div className="relative">
                      <select
                        value={guests}
                        onChange={(e) => handleGuestsChange(Number(e.target.value))}
                        className="w-full p-3 border rounded-lg appearance-none"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>
                            {num} guest{num > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                      <Users className="absolute right-3 top-3 text-gray-400" size={20} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Pay with</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="radio"
                      id="credit"
                      name="payment"
                      value="credit"
                      checked={paymentMethod === 'credit'}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <label htmlFor="credit" className="flex-1">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Credit or debit card
                      </div>
                    </label>
                  </div>

                  {paymentMethod === 'credit' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 pt-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2">Card number</label>
                        <div className="relative">
                          <input
                            type="text"
                            className="w-full p-3 border rounded-lg"
                            placeholder="1234 5678 9012 3456"
                          />
                          <Lock className="absolute right-3 top-3 text-gray-400" size={20} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiration</label>
                          <input
                            type="text"
                            className="w-full p-3 border rounded-lg"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            className="w-full p-3 border rounded-lg"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium mb-2">Free cancellation for 48 hours</h3>
                    <p className="text-gray-600 text-sm">
                      Cancel before Jan 8 for a partial refund. After that, this reservation is non-refundable.
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Confirm and pay'
                )}
              </button>
            </form>
          </div>

          <div className="lg:pl-12">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex space-x-4 pb-6 border-b">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium">{listing.title}</h3>
                    <p className="text-gray-600 text-sm">{listing.type}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1 text-sm">{listing.rating}</span>
                      <span className="mx-1 text-gray-400">·</span>
                      <span className="text-sm text-gray-600">{listing.reviews} reviews</span>
                    </div>
                  </div>
                </div>

                <div className="py-6 space-y-4">
                  <h3 className="font-semibold text-lg">Price details</h3>
                  
                  <div className="flex justify-between">
                    <span>
                      ${bookingDetails.basePrice?.toLocaleString() || 0} × {calculateNights()} nights
                    </span>
                    <span>${bookingDetails.nightlyTotal?.toLocaleString() || 0}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${bookingDetails.cleaningFee?.toLocaleString() || 0}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${bookingDetails.serviceFee?.toLocaleString() || 0}</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t font-bold">
                    <span>Total</span>
                    <span>${bookingDetails.total?.toLocaleString() || 0}</span>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="flex items-start space-x-4">
                    <Shield className="w-6 h-6 text-gray-600" />
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and you're protected by our secure payment system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationCheckout; 