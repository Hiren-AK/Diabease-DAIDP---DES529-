import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';


function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <button onClick={toggleForm}>
                Switch to {isLogin ? "Register" : "Login"}
            </button>
            {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
    );
}

function LoginForm() {
    return (
        <form>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        height: '',
        weight: '',
        dietaryPreference: null,
        allergies: [],
        dob: ''
    });

    const dietaryOptions = [
        { value: 'veg', label: 'Vegetarian' },
        { value: 'nonVeg', label: 'Non-Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'jain', label: 'Jain' }
    ];

    const allergyOptions = [
        { value: 'nuts', label: 'Nuts' },
        { value: 'gluten', label: 'Gluten' },
        { value: 'dairy', label: 'Dairy' },
        { value: 'shellfish', label: 'Shellfish' },
        { value: 'eggs', label: 'Eggs' },
        { value: 'soy', label: 'Soy' }
    ];

    const handleChange = (field, value) => {
        if (field === 'dietaryPreference' || field === 'allergies') {
            setFormData({ ...formData, [field]: value });
        } else {
            setFormData({ ...formData, [field]: value.target.value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const submitData = {
            ...formData,
            dietaryPreference: formData.dietaryPreference?.value,
            allergies: formData.allergies.map(a => a.value)
        };
        axios.post('http://localhost:8000/api/register/', submitData)
            .then(response => {
                console.log('Registration successful:', response.data);
                // Handle further actions upon successful registration like redirect or display success message
            })
            .catch(error => {
                console.error('Registration failed:', error);
                // Handle errors or show error messages
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" required onChange={e => handleChange('name', e)} />
            <input type="email" placeholder="Email" required onChange={e => handleChange('email', e)} />
            <input type="password" placeholder="Password" required onChange={e => handleChange('password', e)} />
            <input type="number" placeholder="Height (cm)" required onChange={e => handleChange('height', e)} />
            <input type="number" placeholder="Weight (kg)" required onChange={e => handleChange('weight', e)} />
            <Select options={dietaryOptions} placeholder="Select Dietary Preference" isClearable={true}
                    onChange={option => handleChange('dietaryPreference', option)} />
            <Select options={allergyOptions} placeholder="Select Allergies (Optional)" isMulti={true} isSearchable={true}
                    onChange={option => handleChange('allergies', option)} />
            <input type="date" placeholder="Date of Birth" required onChange={e => handleChange('dob', e)} />
            <button type="submit">Register</button>
        </form>
    );
}

export default AuthPage;
