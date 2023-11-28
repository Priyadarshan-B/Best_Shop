import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './vertical_navbar.css';

const VerticalNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
    console.log('Dashboard clicked');
  };

  const handleInventoryClick = () => {
    navigate("/inventory");
    console.log('Inventory clicked');
  };

  const handleEnquiriesClick = () => {
    navigate("/enquiries");
    console.log('Enquiries clicked');
  };
  const handleStocksClick = () => {
    navigate("/stocks");
    console.log('Stocks clicked');
  };
  const handleProductStocksClick = () => {
    navigate("/productstocks");
    console.log('Productstocks clicked');
  };

  return (
    <div className="vertical-navbar">
      <div className="menu-icon" onClick={toggleMenu}>
        <FaBars />
      </div>
      <ul className={showMenu ? 'nav-links show' : 'nav-links'}>
        <li onClick={handleDashboardClick}><b>Dashboard</b></li>
        <li onClick={handleInventoryClick}><b>Inventory</b></li>
        <li onClick={handleEnquiriesClick}><b>Enquiries</b></li>
        <li onClick={handleStocksClick}><b>Add Stocks</b></li>
        <li onClick={handleProductStocksClick}><b>Products</b></li>


      </ul>
      <Link to="/login">
      <button
                        style={{
                            background: 'linear-gradient(to right,#9181F4,#5038ED)',
                            border: 'none',
                            outline: "none",
                            justifyItems:"center",
                            marginTop: 20,
                            marginLeft:35,
                            padding: 10,
                            fontSize: 20,
                            borderRadius: 8,
                            color: 'white',
                            letterSpacing: 1.4,
                            width:'100%',
                            cursor:'pointer',
                            }}
      
                    ><b>Login</b></button>
      </Link>
      <div className='down-vertical-navbar'>
      <ul className='sep-vertical'>
      <li><FiSettings /><b>Settings</b></li>
        <li className='logout'><FiLogOut /> <b>Logout</b></li>
        </ul> 

      </div>
    </div>
  );
};

export default VerticalNavbar;
