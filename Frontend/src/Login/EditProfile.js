import React, { useState } from 'react'; // Correct
import { useNavigate } from 'react-router-dom'; // Correct
import './EditProfile.css'; // Make sure the path to your CSS file is correct
// ... other imports ...

import backButtonImage from ''; // Update the path to your imageour project

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    diagnosedDuration: '',
    diabetesType: '',
    dietaryPreference: '',
    allergies: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
    // Handle form submission logic here
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <input
          className="edit-profile-input"
          type="text"
          placeholder="Name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
        />
        <input
          className="edit-profile-input"
          type="email"
          placeholder="Email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
        />
        <input
          className="edit-profile-input"
          type="number"
          placeholder="Age"
          name="age"
          value={profileData.age}
          onChange={handleChange}
        />
        <select
          className="edit-profile-select"
          name="gender"
          value={profileData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          className="edit-profile-input"
          type="number"
          placeholder="Height (cm)"
          name="height"
          value={profileData.height}
          onChange={handleChange}
        />
        <input
          className="edit-profile-input"
          type="number"
          placeholder="Weight (kg)"
          name="weight"
          value={profileData.weight}
          onChange={handleChange}
          ></input>
          <select
          className="edit-profile-select"
          name="diagnosedDuration"
          value={profileData.diagnosedDuration}
          onChange={handleChange}
        >
          <option value="">Diagnosed Duration</option>
          <option value="not diagnosed/don't have">Not diagnosed/don't have</option>
          <option value="less than 6 months">Less than 6 months</option>
          <option value="6 months to 1 year">6 months to 1 year</option>
          <option value="1 year to 18 months">1 year to 18 months</option>
          <option value="more than 2 years">More than 2 years</option>
        </select>
        
        <select
          className="edit-profile-select"
          name="diabetesType"
          value={profileData.diabetesType}
          onChange={handleChange}
        >
          <option value="">Diabetes Type</option>
          <option value="type 1">Type 1</option>
          <option value="type 2">Type 2</option>
          <option value="pre-diabetes">Pre-diabetes</option>
          <option value="gestational">Gestational</option>
        </select>
        
        <select
          className="edit-profile-select"
          name="dietaryPreference"
          value={profileData.dietaryPreference}
          onChange={handleChange}
        >
          <option value="">Dietary Preference</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          {/* Add more dietary preferences as needed */}
        </select>
        <div className="allergies-section">
        <h3 className="allergies-heading">Allergies</h3>
        <div className="checkbox-group">
            {['none','dairy', 'eggs', 'gluten', 'peanuts'].map(allergy => (
            <label key={allergy} className="checkbox-label">
        <input
          type="checkbox"
          name="allergies"
          value={allergy}
          checked={profileData.allergies.includes(allergy)}
          onChange={handleChange}
        />
        {allergy.charAt(0).toUpperCase() + allergy.slice(1)}
      </label>
    ))}
  </div>
</div>
        <button type="submit" className="save-profile-button">Save Changes</button>
        </form>
    </div>
  );
};

export default EditProfile;
