
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';
import { MdMenu, MdClose } from 'react-icons/md';

const Navbar = ({ isAdmin, isLoggedIn, onLogout }) => {
  const [isMobile, setIsMobile] = useState(false); // State for mobile toggle

  return (
    <nav className="navbar">
      <h3 className="logo"><img src='/images/Pawspa.jpg' className='image' alt='Logo'></img></h3>
      <ul className={isMobile ? "links-mobile" : "nav-list"}>
        {/* Common Links */}
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>

        {!isLoggedIn ? (
          <>
            <li className="nav-item">
              <Link to="/user-login" className="nav-link">User Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin-login" className="nav-link">Admin Login</Link>
            </li>
          </>
        ) : isAdmin ? (
          <>
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Appointments</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/add-service" className="nav-link">Add Service</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/feedbacks" className="nav-link">View Feedbacks</Link>
              </li>

          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/service" className="nav-link">Available Services</Link>
            </li>
            <li className="nav-item">
              <Link to="/appointment" className="nav-link">Book Appointment</Link>
            </li>
            <li className="nav-item">
              <Link to="/user-appointments" className="nav-link">My Appointments</Link>
            </li>
            <li className="nav-item">
              <Link to="/feedback" className="nav-link">User Feedback</Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <li className="nav-item">
            <button onClick={onLogout} className="nav-link logout-button"><FaSignOutAlt className="logout-icon" /> Logout</button>
          </li>
        )}
      </ul>
      {/* Hamburger icon for mobile */}
      <button className="icon" onClick={() => setIsMobile(!isMobile)}>
         {isMobile ? <MdClose style={{ fontSize: '2rem', width:'55px'}}/> : <MdMenu style={{ fontSize: '2rem', width:'55px' }} />}
      </button>
    </nav>
  );
};

export default Navbar;
