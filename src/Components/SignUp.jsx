import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Box } from 'lucide-react';
import './SignUp.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import app from './Firebase';
import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect/dist/core';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const auth = getAuth(app);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const typewriter = new Typewriter('#typewriter', {
  //     strings: ['Hello👋', 'Create Account😎'],
  //     autoStart: true,
  //     loop: true,
  //   });

  //   return () => {
  //     typewriter.stop();
  //   };
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill out both fields.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Signup successful');
        navigate('/');
      })
      .catch((error) => {
        setError('Error creating account. Please try again.');
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="type">
        <span id="typewriter"></span>
      </div>
      <div className="login-box">
        {/* Signup Form */}
        <div className="login-form">
          <div className="logo-container">
            <div className="logo-icon">
              <Box className="text-white" size={24} />
            </div>
            <h1 className="logo-text">EcoTrack</h1>
          </div>

          <h2 className="welcome-text">Create an Account</h2>
          <p className="welcome-subtext">Sign up to manage your sustainable inventory</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group password-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="eye" size={20} />
                ) : (
                  <Eye className="eye" size={20} />
                )}
              </button>
            </div>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <span onClick={() => navigate('/')} className="footer-link">
                Log In
              </span>
            </p>
          </div>
        </div>

        {/* Sidebar with SDG Icons */}
        <div className="login-sidebar">
          <div className="sidebar-content">
            <h2 className="sidebar-title">Sustainable Inventory Management</h2>
            <p className="sidebar-text">
              Supporting SDG goals through efficient resource tracking and optimization
            </p>
            <div className="sdg-icons">
              {[1, 2, 7, 9, 12, 13].map((num) => (
                <div
                  key={num}
                  className="sdg-icon"
                  style={{ backgroundColor: getSDGColor(num) }}
                >
                  {num}
                </div>
              ))}
            </div>
            <div className="sidebar-footer">
              Our platform helps reduce waste, improve resource allocation, and track your contribution to sustainable development goals.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get SDG colors
const getSDGColor = (num) => {
  const colors = {
    1: '#e5243b', 2: '#dda63a', 7: '#fcc30b',
    9: '#f36d25', 12: '#cf8d2a', 13: '#48773e'
  };
  return colors[num] || '#1a7a3e';
};

export default Signup;