// HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="signup-details">
      <div className="container">
        <div className="left-panel">
          <h1 className="title">Diab-Ease</h1>
          <p className="tagline">Elevate your wellness experience.</p>
          <div className="about-you">
            <h2>About You</h2>
            <p>Name: </p>
            <p>Gender: </p>
            <p>Diabetes Type: </p>
            <p>Dietary Preference: </p>
            <p>Allergies: </p>
            <button className="edit-button">Edit</button>
          </div>
         
        </div>
        <div className="right-panel">
          <h1 className="ai-title">Converse with our AI-Bot!</h1>
          <div className="ai-description">
            <p>Loren Ipsum text...</p>
            {/* Repeat the "Loren Ipsum" line as needed */}
          </div>
          <button className="ai-button">Say Hi!</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
