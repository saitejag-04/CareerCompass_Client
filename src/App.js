import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import JobOpportunities from './pages/JobOpportunities';
import Analysis from './pages/Analysis';
import ResumeUpload from './components/ResumeUpload';
import ResumePage from './pages/ResumePage';
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register onRegister={() => setIsLoggedIn(true)} />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/opportunities" element={<PrivateRoute><JobOpportunities /></PrivateRoute>} />
        <Route path="/analysis" element={<PrivateRoute><Analysis /></PrivateRoute>} />
        <Route path="/resume" element={<PrivateRoute><ResumeUpload /></PrivateRoute>} />
        <Route path="/resumes" element={ <PrivateRoute><ResumePage /></PrivateRoute>} />

      </Routes>
    </Router>
  );
};

export default App;
