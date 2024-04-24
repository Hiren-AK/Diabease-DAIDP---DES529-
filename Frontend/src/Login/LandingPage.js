import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div>
            <h1>Welcome to the Diabetes Management Platform</h1>
            <Link to="/auth"><button>Register / Login</button></Link>
        </div>
    );
}

export default LandingPage;
