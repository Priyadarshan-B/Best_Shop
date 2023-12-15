import React, { useState } from 'react';
import { FaBell, FaUser, FaEnvelope } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './horizontal_navbar.css';
import { useNavigate } from 'react-router-dom';
import assets from '../../assets/img/bestshop.jpg'

const HorizontalNavbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <nav className="navbar">
      <div className="logo">
        {/* <img src="../../assets/img/bestshop.jpg" alt="Logo" style={{ width: '50px', height: '50px' }} /> */}
      <h2>Best Shop</h2>
      </div>

      <div className="icons">
        <div className="icon" onClick={() => setNotifications(notifications + 1)}>
          <FaBell />
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>

        <div className="icon" onClick={() => setMessages(messages + 1)}>
          <FaEnvelope />
          {messages > 0 && <span className="badge">{messages}</span>}
        </div>

  <Popup className="popup-container" trigger={<button style={{
    border:'none',
    background:'white',
    fontSize:'20px',
    cursor:'pointer'
  }}><FaUser /></button>} position="bottom right">
    <div className="popup-content">
      <div className="popup-text">Hi Best Shop</div>
      <button className="popup-button" onClick={() => { handleNavigate("/login") }}>Logout</button>
    </div>
  </Popup>



      </div>
    </nav>
  );
};

export default HorizontalNavbar;
