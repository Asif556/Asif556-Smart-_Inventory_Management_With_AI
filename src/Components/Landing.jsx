import React, { useState, useEffect } from 'react';
import './Landing.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import app from './Firebase';

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  function goout() {
    signOut(auth).then(() => {
      alert("Signed out successfully");
      navigate('/');
      setMenuOpen(false);
    });
  }

  function changetofeatures() {
    navigate('/features');
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    { 
      title: "Smart Inventory Tracking", 
      icon: "📊",
      description: "Real-time inventory monitoring with predictive stock alerts" 
    },
    { 
      title: "AI Price Optimization", 
      icon: "💰",
      description: "Dynamic pricing based on market trends and demand patterns" 
    },
    { 
      title: "Freshness Verification", 
      icon: "✅",
      description: "Automated quality control and expiration management" 
    },
    { 
      title: "Supply Chain Analytics", 
      icon: "🔄",
      description: "End-to-end visibility with actionable insights" 
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="app-container">
      {/* Sticky Header */}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container header-container">
          <div className="logo-container">
            <div className="logo-icon">
              <span className="logo-text">S</span>
            </div>
            <h1 className="logo-title">StockSense</h1>
          </div>
          <button className="menu-button" onClick={toggleMenu}>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
          </button>

          {/* Navigation menu that appears when hamburger is clicked */}
          {menuOpen && (
            <div className="nav-menu">
              <ul className="nav-links">
                <li><Link to="/Main" onClick={() => setMenuOpen(false)}>Home</Link></li>
                <li><Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link></li>
                <li><Link onClick={changetofeatures}>Features</Link></li>
                <li><Link onClick={goout}>Logout</Link></li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-card">
            <h2 className="hero-title">
              Machine learning-powered inventory management
            </h2>
            <p className="hero-description">
              Revolutionize your item tracking, pricing prediction, and freshness verification with our AI-powered solution.
            </p>
            <button className="cta-button" onClick={changetofeatures}>
              Try Our Features
            </button>
          </div>

          {/* Device Mockup */}
          <div className="device-mockup">
            <div className="device-outer"></div>
            <div className="device-inner">
              <div className="device-notch"></div>
              <div className="device-content">
                <div className="app-screen">
                  <div className="app-header">
                    <div className="app-title">Dashboard</div>
                    <div className="app-dots">
                      <div className="app-dot"></div>
                      <div className="app-dot"></div>
                      <div className="app-dot"></div>
                    </div>
                  </div>
                  <div className="inventory-status">
                    <div className="inventory-icon">
                      <span>📊</span>
                    </div>
                    <div className="inventory-info">
                      <div className="inventory-label">Inventory Status</div>
                      <div className="inventory-value">Optimal</div>
                    </div>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-box">
                      <div className="metric-label">Items</div>
                      <div className="metric-value">1,248</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-label">Alerts</div>
                      <div className="metric-value alert">3</div>
                    </div>
                  </div>
                  <div className="chart-container">
                    <div className="chart-title">Stock Trends</div>
                    <div className="chart-bars">
                      <div className="chart-bar bar-1"></div>
                      <div className="chart-bar bar-2"></div>
                      <div className="chart-bar bar-3"></div>
                      <div className="chart-bar bar-4"></div>
                      <div className="chart-bar bar-5"></div>
                      <div className="chart-bar bar-6"></div>
                      <div className="chart-bar bar-7"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Key Features</h2>

          <div className="feature-carousel">
            <div className="carousel-track" style={{ transform: `translateX(-${activeFeature * 100}%)` }}>
              {features.map((feature, index) => (
                <div key={index} className="carousel-slide">
                  <div className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-indicators">
              {features.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`carousel-dot ${index === activeFeature ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="cta-card">
            <h3 className="cta-title">Ready to transform your inventory management?</h3>
            <p className="cta-description">Join innovative businesses already using StockSense to optimize their operations.</p>
            <button className="cta-button inverted" onClick={changetofeatures}>
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">
              StockSense has revolutionized how we manage our inventory. The AI predictions have reduced our waste by 37% in just three months.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <div className="author-name">Sarah Johnson</div>
                <div className="author-position">Operations Director, TechRetail</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <span>S</span>
              </div>
              <span className="footer-logo-text">StockSense</span>
            </div>
            <div className="footer-social">
              <div className="social-icon">
                <span>📱</span>
              </div>
              <div className="social-icon">
                <span>💬</span>
              </div>
              <div className="social-icon">
                <span>📧</span>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 StockSense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;