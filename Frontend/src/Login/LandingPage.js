import React from 'react';
import './LandingPage.css';
// If the image is in the src folder, you can import it like this:
import RightSideImage from './designright.jpeg'; // Use relative path
import { useNavigate } from 'react-router-dom';


function LandingPage() {
    const navigate = useNavigate();
  
    const navigateToAuth = () => {
      navigate('/auth'); // You might need to adjust this based on your actual route
    };

  return (
    <div className="LandingPage">
      <div className="BlackBox" />
      <div className="Container">
        <div className="ContentBox">
          <h1 className="Title">DiabEase <span role="img" aria-label="robot">🤖</span></h1>
          <p className="Description">A chatbot to help you manage your Diabetes.</p>
          <div className="FeaturesContainer">
            <ul className="FeaturesList">
              <li>Upload pictures of food to find out their nutritional content.</li>
              <li>Upload prescriptions and understand the medications better.</li>
              <li>Chat with an AI-powered chatbot that can answer all your Diabetes-related queries!</li>
            </ul>
          </div>
          <div className="ButtonContainer">
        <button className="Button" onClick={navigateToAuth}>Login</button>
        <button className="Button" onClick={navigateToAuth}>Register</button>
      </div>
        </div>
        {/* Add the image here */}
        <div className="RightImageContainer">
          <img src={RightSideImage} alt="Chatbot Illustration" className="RightSideImage" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
