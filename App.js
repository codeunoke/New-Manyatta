import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';

import UserBookingPage from './pages/UserBookingPage';
import UserRegisterPage from './pages/UserRegisterPage';
import UserLoginPage from './pages/UserLoginPage';

import { isAdminLoggedIn, logoutAdmin } from './utils/adminAuthUtils';
import { isLoggedIn, logoutUser, getUser } from './utils/userAuthUtils';

const App = () => {
  const user = getUser();
  const adminLoggedIn = isAdminLoggedIn();

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    logoutAdmin();
    navigate('/');
  };

  const displayName = user?.name || (adminLoggedIn && 'Admin');

  return (
    <>
      <nav style={navStyle}>
        <Link style={linkStyle} to="/">User Booking</Link>
        <Link style={linkStyle} to="/admin">Admin Dashboard</Link>

        {!isLoggedIn() && !adminLoggedIn && (
          <>
            <Link style={linkStyle} to="/login">Login</Link>
            <Link style={linkStyle} to="/register">Register</Link>
          </>
        )}

        {(isLoggedIn() || adminLoggedIn) && (
          <div style={dropdownWrapperStyle}>
            <div style={dropdownTriggerStyle}>
              👤 {displayName} ▼
              <div style={dropdownMenuStyle} className="dropdown-content">
                <button onClick={handleLogout} style={dropdownItemStyle}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserBookingPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/register" element={<UserRegisterPage />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={isAdminLoggedIn() ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </>
  );
};

const navStyle = {
  backgroundColor: 'black',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative'
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
  padding: '0 10px'
};

const dropdownWrapperStyle = {
  position: 'relative',
  color: 'white',
  paddingRight: '20px'
};

const dropdownTriggerStyle = {
  position: 'relative',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: 'white',
  color: 'black',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  zIndex: 1000,
  display: 'block'
};

const dropdownItemStyle = {
  backgroundColor: 'white',
  border: 'none',
  padding: '10px',
  width: '100%',
  textAlign: 'left',
  cursor: 'pointer'
};

export default App;
