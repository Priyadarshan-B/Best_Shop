import React, { useState } from 'react';
import { FaBell, FaUser, FaEnvelope } from 'react-icons/fa';
import './horizontal_navbar.css'

const Navbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);

  return (
    <nav className="navbar">
      <div className="logo">Your Logo</div>

      <div className="icons">
        <div className="icon" onClick={() => setNotifications(notifications + 1)}>
          <FaBell />
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>

        <div className="icon" onClick={() => setMessages(messages + 1)}>
          <FaEnvelope />
          {messages > 0 && <span className="badge">{messages}</span>}
        </div>

        <div className="icon">
          <FaUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
