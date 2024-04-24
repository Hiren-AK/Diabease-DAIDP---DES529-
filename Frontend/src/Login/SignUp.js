// SignUp.js
import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';

const SignUp = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    diagnosed: '',
    dietaryPreference: '',
    allergies: [],
  });

  const toggleActive = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleChange = (e) => {
    if (e.target.name === 'allergies') {
      const options = e.target.options;
      const selectedAllergies = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedAllergies.push(options[i].value);
        }
      }
      setFormData({ ...formData, allergies: selectedAllergies });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log('Signup successful:', response.data);
      // Handle success, e.g., redirect or display a success message
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error, e.g., display an error message
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', formData);
      console.log('Login successful:', response.data);
      // Handle success, e.g., redirect or display a success message
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error, e.g., display an error message
    }
  };

  return (
    <div className="signup-background">
      <div className="form-container">
        <div className="toggle-buttons">
          <button 
            className={`toggle-btn ${isLoginActive ? '' : 'active'}`} 
            onClick={() => setIsLoginActive(false)}
          >
            Signup
          </button>
          <button 
            className={`toggle-btn ${isLoginActive ? 'active' : ''}`} 
            onClick={() => setIsLoginActive(true)}
          >
            Login
          </button>
        </div>
        {isLoginActive ? (
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" name="email" required onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" required onChange={handleChange} />
         
            <button type="submit" className="form-submit">Login</button>
            <div className="form-footer">
              <a href="#" className="form-link">Forgot password?</a>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <input type="text" placeholder="Name" name="name" required onChange={handleChange} />
            <input type="email" placeholder="Email Address" name="email" required onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" required onChange={handleChange} />
            <input type="number" placeholder="Age" name="age" required onChange={handleChange} />
            <input type="number" placeholder="Height (cm)" name="height" required onChange={handleChange} />
            <input type="number" placeholder="Weight (kg)" name="weight" required onChange={handleChange} />
            <select name="gender" className="custom-select" required onChange={handleChange}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select name="diagnosed" required onChange={handleChange}>
              <option value="">Diagnosed Duration</option>
              <option value="less_6_months">Less than 6 months</option>
              <option value="6m_1y">6 months to 1 year</option>
              <option value="1y_18m">1 year to 18 months</option>
              <option value="more_2_years">More than 2 years</option>
            </select>
            <select name="dietaryPreference" required onChange={handleChange}>
    <option value="">Dietary Preference</option>
    <option value="vegan">Vegan</option>
    <option value="vegetarian">Vegetarian</option>
    <option value="non_vegetarian">Non-Vegetarian</option>
    {/* Add more dietary preferences as needed */}
  </select>

  <label htmlFor="allergies">Allergies (Select multiple if needed):</label>
  <select name="allergies" id="allergies" multiple required onChange={handleChange}>
    <option value="dairy">Dairy</option>
    <option value="eggs">Eggs</option>
    <option value="gluten">Gluten</option>
    <option value="peanuts">Peanuts</option>
    {/* Add more allergies as needed */}
  </select>

  <button type="submit" className="form-submit">Signup</button>
  {/* ... rest of the form ... */}
</form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
