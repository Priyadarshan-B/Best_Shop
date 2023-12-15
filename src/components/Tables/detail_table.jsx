import React, { useState, useEffect } from 'react';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import requestApi from '../../utils/axios';
import apiHost from '../../utils/api';
import { toast,  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './table.css'

const API_BASE_URL = `${apiHost}`;

const DetailTable = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);

 
  const addFieldDetails = () => {
    const formData = new FormData();

    formData.append('category_name', document.getElementById('category_name').value);
    formData.append('field_id', document.getElementById('field_name').value.split(',')[0]); // Extract field_id
    formData.append('field_name', document.getElementById('field_name').value.split(',')[1]); // Extract field_name
    formData.append('details_name', document.getElementById('details_name').value);
    const imageInput = document.getElementById('image');
    formData.append('image', imageInput.files[0]);

    console.log('Form Data:', formData);

    fetch(`${API_BASE_URL}/field-details`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(data.message);
        notifySuccess('Field added successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        notifyError('Failed to add field');
      });
  };

  const getCategoryOptions = () => {
    fetch(`${API_BASE_URL}/dropdown/category`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Category Data:', data);
        setCategoryOptions(['', ...data]);
      })
      .catch((error) => {
        console.error('Error fetching category data:', error);
      });
  };

  const getFields = () => {
    const selectedCategory = document.getElementById('category_name').value;

    fetch(`${API_BASE_URL}/dropdown/category_fields/${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Field Data:', data);

        const modifiedFieldOptions = data.map((field) => ({
          value: `${field.field_id},${field.field_name}`,
          label: field.field_name,
        }));

        setFieldOptions(['', ...modifiedFieldOptions]);
      })
      .catch((error) => {
        console.error('Error fetching field data:', error);
      });
  };

  React.useEffect(() => {
    getCategoryOptions();
    fetchData();
  }, []);

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };
  


  const updateImage = () => {
    const input = document.getElementById('image');
    const label = document.querySelector('.custom-file-label');
    const fileName = input.files[0].name;
    label.innerHTML = '<b>Image:</b> ' + fileName;
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

 

  

  const fetchData = async () => {
    try {
      const response = await requestApi("GET", '/categories/0/0', {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: <b>S.No</b>, width: 100 },
    { field: 'category_name', headerName: <b>Category Name</b>, width: 190 },
    { field: 'field_name', headerName: <b>Field Name</b>, width: 190 },
    { field: 'details_name', headerName: <b>Details Name</b>, width: 190 },
    {
      field: 'actions',
      headerName: <b>Actions</b>,
      width: 140,
      renderCell: (params) => (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px'
        }}>
          <EditIcon
            style={{
              color: "#5676f5",
              cursor: "pointer",
            }}
            onClick={() => handleEdit(params.row.id)} />
          <DeleteIcon style={{
            color: "#ed4545",
            cursor: "pointer",
          }} onClick={() => handleDelete(params.row.id)} />
        </div>
      ),
    },
  ];

  const rows = categories.map((category, i) => ({
    id: i + 1,
    category_name: category.category_name,
    field_name: category.field_name,
    details_name: category.details_name,
  }));

  const handleEdit = (id) => {
    console.log(`Edit action clicked for id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete action clicked for id ${id}`);
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          <div >
          {categories && categories.length > 0 ? (
            <>
            <div className='category-header-container'>
              <h2>Category with Detail Table</h2>
              <button className='add-button'
                type="button"
                onClick={handleOpenDialog}
               
              >
                <b>Add +</b>
              </button>
            </div>
      
              <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={5}
                style={{
                  backgroundColor: 'white',
                  marginTop: '20px',
                  height: '560px',
                  width: '900px',
                  borderRadius: '30px',
                  padding: "35px",
                  boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)',
                  fontSize: "15px",
                }}
              />
              </>
            ) : (
              <div className="loader">
              </div>
            )}
          </div>

          <Dialog
            open={open}
            onClose={handleCloseDialog}
            PaperProps={{ 
              style: {
                width: '500px',
                height: '500px',
                padding: '20px',
              },
            }}
          >
            <div>
              <DialogTitle
                style={{
                  textAlign: 'center'
                }}><h2>Add Field Details</h2></DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <form id="addFieldDetailsForm" encType="multipart/form-data">
        <label className='form-label' htmlFor="category_name"><b>Category Name:</b></label>
        <select className='form-select'

        id="category_name" name="category_name" onChange={getFields}>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br />

        <label htmlFor="field_name"><b>Field Name:</b></label>
        <select className='form-select'

        id="field_name" name="field_name">
          {fieldOptions.map((field, index) => (
            <option key={index} value={field.value}>
              {field.label}
            </option>
          ))}
        </select>
        <br />

        <label 
        style={{
         marginTop:20
        }}
        htmlFor="details_name"><b>Details Name:</b></label><br/>
        <input className='form-input'

                  type="text" id="details_name" name="details_name" required />
        <br />

        {/* <label htmlFor="image"><b>Image:</b></label><br/>
        <input className='form-image'

                  type="file" id="image" name="image" accept="image/*" required /> */}

                  <label for="image" ><b>Image:</b><br/>
   <div class="custom-file-label"> <b>Choose File</b> </div>
  </label>
  <input class="custom-file-input" type="file" id="image" name="image" accept="image/*" required  onChange={updateImage} />
        <br />


      </form>
                
                <br />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button  onClick={() => {
                    addFieldDetails();
                    handleCloseDialog();
                  }} variant="contained" color="primary">
                  Add Field Details
                </Button>
              </DialogActions>
            </div>
          </Dialog>

        </div>
      </div>
    </div>
  );
};

export default DetailTable;
