import React, { useState } from 'react';
import './BackButton.css';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      navigate(-1);
    }, 600); // Match this with the animation duration
  };

  return (
    <button 
      className={`back-button ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="back-button-content">
        <div className="arrow-container">
          <span className="arrow-left"></span>
        </div>
        <span className="button-text">Back</span>
      </div>
      <div className="ripple-container"></div>
    </button>
  );
};

export default BackButton;