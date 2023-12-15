import React, { useState } from 'react';
import { FaBars, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './vertical_navbar.css';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import CategoryIcon from '@mui/icons-material/Category';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TableChartIcon from '@mui/icons-material/TableChart';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
        <li onClick={handleDashboardClick}><SpaceDashboardIcon 
        style={{
          marginRight: "10px",
        }}/><b>Dashboard </b></li>
        <li onClick={handleInventoryClick}><InventoryIcon style={{marginRight: "10px",}}/><b>Inventory</b></li>
        <li onClick={handleEnquiriesClick}><QueryStatsIcon style={{marginRight: "10px",}}/><b>Enquiries</b></li>
        <li onClick={() => { handleNavigate("/addStock") }}><AddBusinessIcon style={{marginRight: "10px",}}/><b>Add Stocks</b></li>
        <li onClick={handleProductStocksClick}><ShoppingCartIcon style={{marginRight: "10px",}}/><b>Products</b></li>
        <div className='sub-navbar'>
        <li onClick={handleMasterClick}>
          <SupervisorAccountIcon style={{marginRight: "10px",}}/>
          <b>
            Master
           
          </b>
          {showMasterSubMenu ? <FaAngleUp className='fa-angle-up'/> : <FaAngleDown className='fa-angle-down' />}
          {showMasterSubMenu && (
            <ul className="sub-menu">
              <li onClick={handleAddCategoryClick}><CategoryIcon style={{marginRight: "10px",fontSize:'18px' }}/><b>Category</b></li>
              <li onClick={() => { handleNavigate("/fieldtable") }}><TableChartIcon style={{marginRight: "10px",fontSize:'18px' }}/><b>Fields</b></li>
              <li onClick={() => { handleNavigate("/detailtable") }}><InfoIcon style={{marginRight: "10px",
                                                                                       fontSize:'18px'     
                                                                                            }}/><b>Field Details</b></li>

            </ul>
          )}
        </li>
        </div>
      </ul>
     
    </div>
  );
};

export default VerticalNavbar;