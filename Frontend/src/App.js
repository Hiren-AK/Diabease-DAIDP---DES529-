import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Login/LandingPage';
import SignUp from './Login/SignUp';
import Dashboard from './Dashboard';
import SignUpDetails from './SignUpDetails';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path = "/signupdetails" element = {<SignUpDetails/>
                }/> 
            </Routes>

        </Router>
    );
}

export default App;
