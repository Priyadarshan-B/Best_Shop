import React, { useState, useEffect } from 'react';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import { Link, useNavigate } from 'react-router-dom';
import FormDialogCategory from './formcategory';
import AddFieldDetailsForm from './fromfieldadd';
import AddCategoryFieldForm from './formfeilds';
import './master_category.css';

const Master_Box = () => {
  const navigate = useNavigate();
  const [openDialogId, setOpenDialogId] = useState(null);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleOpenDialog = (boxId) => {
    setOpenDialogId(boxId);
  };

  const handleCloseDialog = () => {
    setOpenDialogId(null);
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="container">
            <div className="box" onClick={() => handleOpenDialog(1)}>
              <h1>Add Category</h1>
              {openDialogId === 1 && (
                <FormDialogCategory open={true} handleClose={handleCloseDialog} />
              )}
            </div>
            <div className="box" onClick={() => handleOpenDialog(2)}>
              <h1>Add Fields</h1>
              {openDialogId === 2 && (
                <AddCategoryFieldForm  open={true} handleClose={handleCloseDialog} />
              )}
            </div>
            <div className="box" onClick={() => handleOpenDialog(3)}>
              <h1>Add Field Details</h1>
              {openDialogId === 3 && (
                <AddFieldDetailsForm open={true} handleClose={handleCloseDialog} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Master_Box;
