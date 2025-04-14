import React, { useEffect, useState } from 'react';
import { getAllProperties } from '../services/propertiesService';
import { createBooking } from '../services/bookingsService';

const UserBooking = () => {
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const propertiesData = await getAllProperties();
    setProperties(propertiesData);
  };

  const handleBooking = async () => {
    if (!selectedPropertyId || !startDate || !endDate) {
      alert('Please fill in all fields.');
      return;
    }
    const bookingData = {
      property: selectedPropertyId,
      startDate,
      endDate,
      status: 'booked',
    };
    await createBooking(bookingData);
    alert('Booking request submitted.');
  };

  return (
    <div className="user-booking">
      <h2>Book a Property</h2>
      <div>
        <label>Property:</label>
        <select value={selectedPropertyId} onChange={(e) => setSelectedPropertyId(e.target.value)}>
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option key={property._id} value={property._id}>
              {property.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div>
        <label>End Date:</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
};

export default UserBooking;
