import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/userAuthService';

const UserLoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(credentials);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input name="email" type="email" value={credentials.email} onChange={handleChange} required />

        <label>Password:</label>
        <input name="password" type="password" value={credentials.password} onChange={handleChange} required />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLoginPage;
