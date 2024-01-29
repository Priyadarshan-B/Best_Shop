import React, { useState, useEffect } from 'react';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import requestApi from '../../utils/axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHost from '../../utils/api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast,  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './table.css';

const API_BASE_URL = apiHost;

const FieldTable = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    field_name: '',
    type: '',
    has_separate_page: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchData();
    populateCategoriesDropdown();
  }, []);

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const populateCategoriesDropdown = () => {
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then((categories) => {
        setCategory(categories);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const addCategoryField = () => {
    console.log('FormData:', formData);
    fetch(`${API_BASE_URL}/category-fields`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(data.message);
        console.log(data);
        handleCloseDialog();
        notifySuccess('Field added successfully');

      })
      .catch((error) => {
        console.error('Error:', error);
        notifyError('Failed to add field');

      });
  };

  const fetchData = async () => {
    try {
      const response = await requestApi('GET', '/categories/0', {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: <b>S.No</b>, width: 160 },
    { field: 'category_name', headerName: <b>Category Name</b>, width: 250 },
    { field: 'field_name', headerName: <b>Field Name</b>, width: 190 },

    {
      field: 'actions',
      headerName: <b>Actions</b>,
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
          }}
        >
          <EditIcon
            style={{
              color: '#5676f5',
              cursor: 'pointer',
            }}
            onClick={() => handleEdit(params.row.id)}
          />
          <DeleteIcon
            style={{
              color: '#ed4545',
              cursor: 'pointer',
            }}
            onClick={() => handleDelete(params.row.field_id, params.row.field_name)}
          />
        </div>
      ),
    },
  ];

  const rows = categories.map((category, i) => ({
    id: i + 1,
    category_name: category.category_name,
    field_id:category.field_id,
    field_name: category.field_name,
  }));

  const handleEdit = (id) => {
    console.log(`Edit action clicked for id ${id}`);
  };


  // delete fields
  const deleteCategory = (field_id) => {
    const deleteUrl = `${apiHost}/category-fields/${field_id}`;
    console.log("DELETE request URL:", deleteUrl);
    fetch(`${apiHost}/category-fields/${field_id}`, {
      method: "DELETE",
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Field deleted successfully:", data);
        fetchData(); // Update the category list after deletion
        notifySuccess('Field deleted successfully');
      })
      .catch((error) => {
        console.error("Error deleting Field");
        notifyError('Failed to delete Field' );
      });
  };

  
  const handleDelete = (field_id, field_name) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the category "${field_name}"?`);
    if (isConfirmed) {
      console.log(`Delete action clicked for category_id ${field_id}`);
      deleteCategory(field_id);
    }
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          <div >
          <div className='category-header-container'>
              <h2
              style={{
                marginTop:'10px'
              }}>Category with Field Table</h2>
              <button className='add-button'
                type="button"
                onClick={handleOpenDialog}>
                <b>Add +</b>
              </button>
            </div>

          {categories && categories.length > 0 ? (
            <>
           
          
         
              <DataGrid className='data-grid-container'
                rows={rows}
                columns={columns}
                pageSize={5}
                style={{
                  backgroundColor: 'white',
                  marginTop: '20px',
                  height: '560px',
                  width: '900px',
                  borderRadius: '30px',
                  padding: '35px',
                  boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)',
                  fontSize: '15px',
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
                height: '370px',
                padding: '20px',
              },
            }}
          >
            <div>
              <DialogTitle style={{ textAlign: 'center' }}>
                <h2>Add Fields</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <label className='form-label'
                  htmlFor="category_id"

                >
                  <b>Category:</b>
                </label>
                {/* <select
  className='form-select'
  id="category_id"
  name="category_id"
  value={formData.category_id}
  onChange={handleInputChange}
  required
>
  {category.map((category) => (
    <option
      key={category.category_id}
      value={category.category_id}
    >
      {category.category_name}
    </option>
  ))}
</select> */}
<select
  className='form-select'
  id="category_id"
  name="category_id"
  value={formData.category_id}
  onChange={handleInputChange}
  required
>
  <option value="">Select Category</option>
  {category.map((category) => (
    <option
      key={category.category_id}
      value={category.category_id}
    >
      {category.category_name}
    </option>
  ))}
</select>
                <br />

                <label className='form-label'
                  htmlFor="field_name"
                  style={{
                    width: '20px',
                    height: '8px',
                    paddingRight: '10px',
                  }}
                >
                  <b>Field Name:</b>
                </label>
                <br />
                <input className='form-input'

                  type="text"
                  id="field_name"
                  name="field_name"
                  value={formData.field_name}
                  onChange={handleInputChange}
                  required
                />
                <br />

                <label
  htmlFor="type"
  style={{
    width: '20px',
    height: '8px',
    paddingRight: '10px',
  }}
>
  <b>Field Type:</b>
</label>

<select
  className='form-select'
  id="type"
  name="type"
  value={formData.type}
  onChange={handleInputChange}
  required
>
  <option value="">Select Field Type</option>
  <option value="list">list</option>
</select>

                <br />

                <label
                  htmlFor="has_separate_page"
                  style={{
                    width: '20px',
                    height: '8px',
                    padding: '0',
                    marginRight: '5px',
                  }}
                >
                  <b>Separate Page:</b>
                </label>
                <input className='form-checkbox'

                  type="checkbox"
                  id="has_separate_page"
                  name="has_separate_page"
                  checked={formData.has_separate_page}
                  onChange={handleInputChange}
                />
                <br />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleCloseDialog();
                    addCategoryField();
                    
                  }}
                  variant="contained"
                  color="primary"
                >
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

export default FieldTable;

