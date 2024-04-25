import React, { useEffect, useRef } from 'react';
import './HomePage.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const userData = location.state || {}; // Make sure to handle `undefined` state
  const voiceglowContainerRef = useRef(null); // Ref for the Voiceglow container

  // Effect for loading the Voiceglow widget script
  useEffect(() => {
    window.VG_CONFIG = {
      ID: "H7cRdq3GnT",
      region: 'na', // 'eu' or 'na' corresponding to Europe and North America
      render: 'full-width', // popup or full-width
      stylesheets: [
        "https://storage.googleapis.com/voiceglow-cdn/vg_live_build/styles.css",
        // Add your custom css stylesheets, Can also add relative URL ('/public/your-file.css)
      ],
      // userID: 'USER_ID', // If you want to use your own user_id
      // autostart: true, // Whether to autostart the chatbot with the proactive message
    };

    const VG_SCRIPT = document.createElement("script");
    VG_SCRIPT.src = "https://storage.googleapis.com/voiceglow-cdn/vg_live_build/vg_bundle.js";
    VG_SCRIPT.defer = true;
    document.body.appendChild(VG_SCRIPT);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(VG_SCRIPT);
    };
  }, []);

  const handleEditClick = () => {
    navigate('/editprofile'); // Adjust the route as needed
  };
  return (
    <div className="signup-details">
      <div className="container">
        <div className="left-panel">
          <h1 className="title">Diab-Ease</h1>
          <p className="tagline">Elevate your wellness experience.</p>
          <div className="about-you">
            <h2>About You</h2>
            <p>Name : {userData.name}!</p>
            <p>Gender : {userData.gender} </p>
            <p>Diabetes Type : {userData.diabetesType} </p>
            <p>Dietary Preference : {userData.dietary_preference}</p>
            <button className="edit-button" onClick={handleEditClick}>Edit</button>
          </div>
        </div>
        <div className="right-panel">
          <h1 className="ai-title">Converse with our AI-Bot!</h1>
            <div 
              style={{ width: '500px', height: '500px' }} 
              id="VG_OVERLAY_CONTAINER" 
              ref={voiceglowContainerRef}>
              {/* Voiceglow widget will render here */}
          </div>
          <button className="ai-button">Say Hi!</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
