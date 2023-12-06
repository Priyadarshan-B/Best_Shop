import React, { useState, useEffect } from 'react';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';
import requestApi from '../../utils/axios';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHost from '../../utils/api';
import './style.css'

const API_BASE_URL = `${apiHost}`;


const DetailTable = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [formData, setFormData] = useState({
    category_name: '',
    field_name: '',
    details_name: '',
    image: null,
  });

  useEffect(() => {
    fetchData();
    fetch(`${API_BASE_URL}/dropdown/category`)
      .then(response => response.json())
      .then(data => {
        setCategoryOptions(data);
      })
      .catch(error => {
        console.error('Error fetching category data:', error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setFormData({ ...formData, category_name: selectedCategory });

    fetch(`${API_BASE_URL}/dropdown/category_fields/${selectedCategory}`)
      .then(response => response.json())
      .then(data => {
        setFieldOptions(data);
      })
      .catch(error => {
        console.error('Error fetching field data:', error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleAddFieldDetails = () => {
    const formDataObject = new FormData();

    Object.keys(formData).forEach(key => {
      formDataObject.append(key, formData[key]);
    });

    fetch(`${API_BASE_URL}/field-details`, {
      method: 'POST',
      body: formDataObject,
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    handleCloseDialog();
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
    { field: 'id', headerName: <b>S.No</b>, width: 90 },
    { field: 'category_name', headerName: <b>Category Name</b>, width: 170 },
    { field: 'field_name', headerName: <b>Field Name</b>, width: 170 },
    { field: 'details_name', headerName: <b>Details Name</b>, width: 170 },
    {
      field: 'actions',
      headerName: <b>Actions</b>,
      width: 200,
      renderCell: (params) => (
        <div style={{
          display:'flex',
          flexDirection: 'row',
          gap:'10px'
        }}>
          <Button style={{
            backgroundColor:'#5676f5',
            color:'white',

          }}  onClick={() => handleEdit(params.row.id)}>Edit </Button>
          <Button style={{
            backgroundColor:'#ed4545',
            color:'white',
          }} onClick={() => handleDelete(params.row.id)}>Delete</Button>
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
    // Implement edit functionality here
    console.log(`Edit action clicked for id ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log(`Delete action clicked for id ${id}`);
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="category-table-container">
           <div style={{
            display:'flex',
            flexDirection:'row',
            gap:'40px'
           }}><h2 style={{
              fontFamily:'sans-serif'
            }}>Category with Detail Table</h2><button
            type="button"
            onClick={handleOpenDialog}
            style={{
              backgroundColor:'#2fcc54',
              color:'white',
              border: 'none',
              outline: "none",
              
              padding: 10,
              fontSize: 20,
              borderRadius: 4,
              letterSpacing: 1.4,
            }}
          >
            Add
          </button>
    </div>
            {categories && categories.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                style={{
                  backgroundColor: 'white',
                  marginTop: '20px',
                  height: '600px',
                  width: '900px',
                  justifyContent: 'center',
                  justifyItems: 'center',
                  borderRadius:'10px',
                  boxShadow: '0 0 14px rgba(0, 0, 0, 0.1)',
                  fontWeight:'20px',
                  fontSize:'20px'
                }}
              />
            ) : (
              <p>Loading...</p>
            )}
          </div>
          {/* <button
        type="button"
        onClick={handleOpenDialog}
        style={{
          background: 'linear-gradient(to right,#9181F4,#5038ED)',
          border: 'none',
          outline: "none",
          marginTop: 20,
          padding: 10,
          fontSize: 17,
          borderRadius: 8,
          color: 'white',
          letterSpacing: 1.4
        }}
      >
        Add
      </button> */}

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            width: '500px',
            height: '340px',
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
            
           }
 
           }>
            <label htmlFor="category_name"
            style={{
                width:'20px',
                height:'8px',
                
                paddingRight:'10px'
              }}
            
            ><b>Category Name:</b></label>
            <select
            style={{
                marginLeft:'10px',
                width:'200px',
                height:'35px',
                backgroundColor:'e8e4fcc7'
            }}
              id="category_name"
              name="category_name"
              onChange={handleCategoryChange}
              value={formData.category_name}
            >
              <option value="" disabled>Select Category</option>
              {categoryOptions.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="field_name"
            
            style={{
            width:'20px',
            height:'8px',
            
            paddingRight:'10px'
          }}><b>Field Name:</b></label>
            <select
            style={{
                marginLeft:'10px',
                width:'200px',
                height:'35px',
                backgroundColor:'e8e4fcc7',
                marginTop:'5px'
            }}
              id="field_name"
              name="field_name"
              onChange={handleInputChange}
              value={formData.field_name}
            >
              <option 
              
              value="" disabled>Select Field</option>
              {fieldOptions.map(field => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
            <br />

            <label htmlFor="details_name"
            style={{
                width:'20px',
                height:'8px',
                
                paddingRight:'10px'
              }}
            >
                
                <b>Details Name:</b></label><br/>
            <input
            style={{
                width:'250px',
               height:'35px',
               paddingLeft:'10px',
               fontSize: '20px',
               backgroundColor: '#e8e4fcc7',
               borderRadius:'5px',
               border:'none',
               marginTop:'5px',
               
              }}
              type="text"
              id="details_name"
              name="details_name"
              onChange={handleInputChange}
              value={formData.details_name}
              required
            />
            <br />

            <label htmlFor="image"
            style={{
                width:'20px',
                height:'8px',
                paddingRight:'10px'
              }}
            
            ><b>Image:</b></label>
            <input
                
            style={{
                fontSize:'15px',
                backgroundColor:'#e8e4fcc7',
               
                textAlign:'center',
                justifyContent:'center'
            }}
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleAddFieldDetails} variant="contained" color="primary">
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
