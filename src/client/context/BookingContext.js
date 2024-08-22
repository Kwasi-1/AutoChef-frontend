// context/BookingContext.js
import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const updateBookingStatus = (invoiceNumber, newStatus) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.invoiceNumber === invoiceNumber
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, setBookings, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  );
};
