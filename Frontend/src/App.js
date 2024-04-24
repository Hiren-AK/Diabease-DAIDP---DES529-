import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Login/LandingPage';
import SignUp from './Login/SignUp';
import SignUpDetails from './SignUpDetails';
import EditProfile from './Login/EditProfile';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<SignUp />} />
        <Route path="/signupdetails" element={<SignUpDetails />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
