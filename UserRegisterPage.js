import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/userAuthService';

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} required />

        <label>Password:</label>
        <input name="password" type="password" value={formData.password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegisterPage;
