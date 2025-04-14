import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { getAllBookings, updateBookingStatus, deleteBooking } from '../services/bookingsService';
import { getAllProperties } from '../services/propertiesService';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const bookingsData = await getAllBookings();
    const propertiesData = await getAllProperties();
    setBookings(bookingsData);
    setProperties(propertiesData);
  };

  const handlePropertyChange = (e) => {
    setSelectedPropertyId(e.target.value);
  };

  const filteredBookings = bookings.filter(
    (booking) => selectedPropertyId === 'all' || booking.property._id === selectedPropertyId
  );

  const events = filteredBookings.map((booking) => ({
    id: booking._id,
    title: `${booking.property.title} (${booking.status})`,
    start: booking.startDate,
    end: booking.endDate,
    backgroundColor: getStatusColor(booking.status),
    borderColor: 'black',
    textColor: 'black',
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return '#ccc';
      case 'fully-booked':
        return '#555';
      case 'in-occupancy':
        return '#000';
      default:
        return '#ddd';
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="filter-bar">
        <label>Select Property: </label>
        <select value={selectedPropertyId} onChange={handlePropertyChange}>
          <option value="all">All Properties</option>
          {properties.map((property) => (
            <option key={property._id} value={property._id}>
              {property.title}
            </option>
          ))}
        </select>
      </div>
      <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={events} firstDay={1} height="auto" />
    </div>
  );
};

export default AdminDashboard;
