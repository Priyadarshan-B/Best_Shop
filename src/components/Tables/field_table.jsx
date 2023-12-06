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

const API_BASE_URL = `${apiHost}`;
const FieldTable = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState([])
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


  const populateCategoriesDropdown = () => {
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then((category) => {
        setCategory(category);
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
    fetch(`${API_BASE_URL}/category-fields`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        handleCloseDialog(); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchData = async () => {
    try {
      const response = await requestApi("GET", '/categories/0', {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: <b>S.No</b>, width: 90 },
    { field: 'category_name', headerName: <b>Category Name</b>, width: 200 },
    { field: 'field_name', headerName: <b>Field Name</b>, width: 160 },

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
    field_name:category.field_name,
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
        <div className="dashboard-body">
          <div className="category-table-container">
           <div  style={{
            display:'flex',
            flexDirection:'row',
            gap:'40px'
           }}> <h2>Category with Field Table</h2>
            <button
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
                  backgroundColor:'white',
                  marginTop:'20px',
                  height:'600px',
                  width:'700px',
                  justifyContent:'center',
                  justifyItems:'center',
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
          

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            width: '500px',
            height: '350px',
            padding: '20px',

          },
        }}
      >
        <div>
          <DialogTitle 
          style={{
            textAlign:'center'
          }}>
            <h2>Add Fields</h2></DialogTitle>
          <DialogContent 
          style={{
           fontSize: 20,
           
          }

          }>
          <label htmlFor="category_id"
          style={{
            width:'20px',
            height:'8px',
           
          }}
          >
            
            <b>Category:</b></label>
        <select
        style={{
            marginLeft:'10px',
            width:'200px',
            height:'35px',
            backgroundColor:'e8e4fcc7'
        }}
          id="category_id"
          name="category_id"
          value={formData.category_id}
          onChange={handleInputChange}
          required
        >
          {category.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>
        <br />
        
        <label htmlFor="field_name"
        style={{
            width:'20px',
            height:'8px',
            
            paddingRight:'10px'
          }}
        
        ><b>Field Name:</b></label><br/>
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
          id="field_name"
          name="field_name"
          value={formData.field_name}
          onChange={handleInputChange}
          required
        />
        <br />

        <label htmlFor="type"
         style={{
            width:'20px',
            height:'8px',
            paddingRight:'10px'
          }}>
            <b>Field Type:</b></label><br/>
        <input
        style={{
            width:'250px',
           height:'35px',
           paddingLeft:'10px',
           fontSize: '20px',
           backgroundColor: '#e8e4fcc7',
           borderRadius:'5px',
           border:'none',
           marginTop:'5px'
           
          }}
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        />
        <br />

        <label htmlFor="has_separate_page"
        style={{
            width:'20px',
            height:'8px',
            padding:'0',
            marginRight:'5px'
            
          }}><b>Separate Page:</b></label>
        <input
        style={{
            height:'17px',
            width:'17px',
            paddingLeft:'10px',
            marginTop:'6px'
        }}
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
            <Button onClick={addCategoryField} variant="contained" color="primary">
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
