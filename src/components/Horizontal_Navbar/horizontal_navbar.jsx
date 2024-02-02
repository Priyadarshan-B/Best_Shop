import React, { useState } from 'react';
import { FaBell, FaUser, FaEnvelope, FaBars } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './horizontal_navbar.css';
import { useNavigate } from 'react-router-dom';
import apiHost from '../../utils/api';
import '../Vertical_Navbar/vertical_navbar.css'
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const HorizontalNavbar = () => {
  const [notifications, setNotifications] = useState(0);
  const [messages, setMessages] = useState(0);
  const [showMenu, setShowMenu]= useState(false);
  const navigate = useNavigate();
  
  // const notifySuccess = (message) => {
  //   toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  // };

  // const notifyError = (message) => {
  //   toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  // };
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {

        console.error('Token is missing');
        return;
      }

      const response = await fetch(`${apiHost}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        

        localStorage.removeItem('token');
        console.log('token removed');
        // notifySuccess('Logout successfully');
        navigate('/', { state: { successMessage: 'Logout successfully' } });
      } else {

        console.error('Logout failed');
        // notifyError('Failed to logout');
       
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const toggleMenu =() =>{
    setShowMenu(!showMenu);
  }

  // const handleNavigate = (path) => {
  //   navigate(path);
  // };
  return (
    <nav className="navbar">
      <div className='menu-icon' onClick={toggleMenu}><FaBars/></div>
      <div className="logo">
      {/* <ToastContainer/> */}
       
      <h2 className='website_name'>Best Shop</h2>
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
      <div className="popup-text"></div>
      <button className="popup-button" onClick={handleLogout}>Logout</button>
    </div>
  </Popup>



      </div>
    </nav>
  );
};

export default HorizontalNavbar;