import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleScrollToAddJob = () => {
    const section = document.getElementById('add-job-section');
    
    if (section) {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    //   section.scrollIntoView({ top: 0 ,behavior: 'smooth' });
    }
    
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">CareerCompass</Link>
      </div>
      <div className="navbar-right">
        {token ? (
            <>
                <button className="nav-link" onClick={handleScrollToAddJob}>Add Job</button>
                <Link to="/resumes" className="nav-link">My Resumes</Link>
                <Link to="/analysis" className="nav-link">Analysis</Link>
                <Link to="/opportunities" className="nav-link">Job Opportunities</Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
            ) : location.pathname === '/login' ? (
            <>
                <button className="nav-link" onClick={handleScrollToAddJob}>Add Job</button>
                <Link to="/analysis" className="nav-link">Analysis</Link>
                <Link to="/opportunities" className="nav-link">Job Opportunities</Link>
                <Link to="/register" className="logout-btn">Register</Link>
            </>
            ) : location.pathname === '/register' ? (
            <Link to="/login" className="logout-btn">Login</Link>
            ) : null}

      </div>
    </nav>
  );
};

export default Navbar;
