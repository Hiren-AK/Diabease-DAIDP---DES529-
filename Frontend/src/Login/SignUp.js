// SignUp.js
import React, { useState } from 'react';
import './SignUp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    diagnosed_duration: '',
    diabetesType: '',
    dietary_preference: '',
    allergies: [],


  });
  const navigate = useNavigate();


  const [loginData, setloginData] = useState({
    email: '',
    password: '',
  });

  const toggleActive = () => {
    setIsLoginActive(!isLoginActive);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (isLoginActive) {
      // Update loginData for login form
      setloginData(prevLoginData => ({
        ...prevLoginData,
        [name]: value
      }));
    } else {
      if (type === 'checkbox') {
        setFormData(prevFormData => {
          let newAllergies;
          if (value === 'none') {
            // If "None" is selected, clear all other selections.
            newAllergies = checked ? ['none'] : [];
          } else {
            // Otherwise, add or remove the checked allergy.
            newAllergies = checked ? [...prevFormData.allergies.filter(a => a !== 'none'), value]
                                  : prevFormData.allergies.filter(a => a !== value);
          }
          return {
            ...prevFormData,
            allergies: newAllergies
          };
        });
      } else {
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: value
        }));
      }
    };
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register/', formData);
      console.log('Signup successful:', response.data);
      navigate('/HomePage');
      // Handle success, e.g., redirect or display a success message
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle error, e.g., display an error message
    }
  };

  const handleLogin = async (e) => {

    
    e.preventDefault();
    try {
      console.log(loginData)
      const response = await axios.post('http://localhost:8000/api/login/', loginData);
      console.log('Login successful:', response.data);
      //data.user will give -> 
      
      // In your handleLogin or handleSignup function after the successful API call
  navigate('/HomePage', { state: { ...response.data.user } });


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
              <option value="not diagonsed/don't have">Not diagonsed/don't have</option>
              <option value="less than 6 months">Less than 6 months</option>
              <option value="6 months to 1 year">6 months to 1 year</option>
              <option value="1 year to 18 months">1 year to 18 months</option>
              <option value="more than 2 years">More than 2 years</option>
            </select>
            <div className="diabetes-type-section">
  
{/* ... existing code ... */}

  <label htmlFor="diabetesType">Diabetes Type (Select one if needed):</label>
  <div className="diabetes-type-options">
    {['type 1', 'type 2', 'pre-diabetes', 'gestational', 'none'].map(type => (
      <div key={type} className="diabetes-type-option">
        <input
          type="radio"
          id={type}
          name="diabetesType"
          value={type}
          checked={formData.diabetesType === type}
          onChange={handleChange}
        />
        <label htmlFor={type}>{type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</label>
      </div>
    ))}
  </div>
  <div className="diabetes-info">
    <span className="info-icon">i</span>
    <div className="info-text">
      <p>Type 2 diabetes: A chronic condition that affects the way the body processes blood sugar (glucose).</p>
      <p>Type 1 diabetes: A chronic condition in which the pancreas produces little or no insulin.</p>
      <p>Prediabetes: A condition in which blood sugar is high, but not high enough to be type 2 diabetes.</p>
      <p>Gestational diabetes: A form of high blood sugar affecting pregnant women.</p>
    </div>
  </div>
</div>
{/* ... rest of the form ... */}

    <select name="dietary_preference" required onChange={handleChange}>
    <option value="">Dietary Preference</option>
    <option value="vegan">Vegan</option>
    <option value="vegetarian">Vegetarian</option>
    <option value="non_vegetarian">Non-Vegetarian</option>
    {/* Add more dietary preferences as needed */}
  </select>

  <label htmlFor="allergies">Allergies (Select multiple if needed):</label>
  {/* Replace the select element with this block of checkboxes */}
  <div className="allergies-checkboxes">
  <div>
    <input
      type="checkbox"
      id="none"
      name="allergies"
      value="none"
      checked={formData.allergies.includes('none')}
      onChange={handleChange}
    />
    <label htmlFor="none">None</label>
  </div>
  {['dairy', 'eggs', 'gluten', 'peanuts'].map(allergy => (
    <div key={allergy}>
      <input
        type="checkbox"
        id={allergy}
        name="allergies"
        value={allergy}
        checked={formData.allergies.includes(allergy)}
        disabled={formData.allergies.includes('none')}
        onChange={handleChange}
      />
      <label htmlFor={allergy}>{allergy.charAt(0).toUpperCase() + allergy.slice(1)}</label>
    </div>
  ))}
</div>



  <button type="submit" className="form-submit">Signup</button>
  {/* ... rest of the form ... */}
</form>
        )}
      </div>
    </div>
  );
};

export default SignUp;