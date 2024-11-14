import React, { useState, useEffect } from 'react';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    // Fetch all bookings from backend API
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div>
      <h3 className="mb-4">Manage Bookings</h3>
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="flex justify-between items-center p-4 bg-white rounded-lg shadow">
            <div>
              <h4 className="text-lg font-semibold">{booking.roomId.roomName}</h4>
              <p>User: {booking.userId.name}</p>
              <p>Date: {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p>Time: {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingManagement;
