import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/adminAuthService';

const AdminLoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(credentials);
      navigate('/admin');
    } catch (error) {
      console.error('Admin login failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input name="username" value={credentials.username} on
::contentReference[oaicite:0]{index=0}
 
