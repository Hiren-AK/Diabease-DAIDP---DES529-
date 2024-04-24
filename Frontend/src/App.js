import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Login/LandingPage';
import SignUp from './Login/SignUp';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;
