import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import app from './Firebase';
import './Nav.css';

const Nav = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  function goout() {
    const auth = getAuth(app);
    signOut(auth).then(() => {
      alert("Signed out successfully");
      navigate('/');
    });
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={`stock-nav ${scrolled ? 'scrolled' : ''}`}>
      <nav className="stock-nav-main">
        <div className="stock-logo">
          {/* <img src="/logo.png" alt="StockSense" className="logo-img" /> */}
          <span className="logo-text">StockSense</span>
        </div>

        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${menuOpen ? 'menu-active' : ''}`}>
          <li><Link to="/Main" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/features" onClick={() => setMenuOpen(false)}>Features</Link></li>
          <li><Link onClick={() => { goout(); setMenuOpen(false); }}>Logout</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;