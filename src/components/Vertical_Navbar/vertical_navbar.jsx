import React, { useState } from 'react';
import { FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './vertical_navbar.css';

const VerticalNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showMasterSubMenu, setShowMasterSubMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMasterSubMenu = () => {
    setShowMasterSubMenu(!showMasterSubMenu);
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
    navigate("/productdashboard");
    console.log('Productstocks clicked');
  };

  const handleMasterClick = () => {
    toggleMasterSubMenu();
  };

  const handleAddCategoryClick = () => {
    navigate("/categorytable");
    console.log('Add Category clicked');
  };

  const handleNavigate = (path) => {
    navigate(path);
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
        <li onClick={() => { handleNavigate("/addStock") }}><b>Add Stocks</b></li>
        <li onClick={handleProductStocksClick}><b>Products</b></li>
        <div className='sub-navbar'>
        <li onClick={handleMasterClick}>
          <b>
            Master
            {showMasterSubMenu ? <FaAngleUp /> : <FaAngleDown />}
          </b>
          {showMasterSubMenu && (
            <ul className="sub-menu">
              <li onClick={handleAddCategoryClick}><b>Category</b></li>
              <li onClick={() => { handleNavigate("/fieldtable") }}><b>Fields</b></li>
              <li onClick={() => { handleNavigate("/detailtable") }}><b>Field Details</b></li>

            </ul>
          )}
        </li>
        </div>
      </ul>
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
