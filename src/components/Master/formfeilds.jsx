import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHost from '../../utils/api';

/* const API_BASE_URL = 'http://10.10.162.193:5000';
 */
const API_BASE_URL = `${apiHost}`;

const AddCategoryFieldForm = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    field_name: '',
    type: '',
    has_separate_page: false,
  });

  const [open, setOpen] = useState(false); // Add state for dialog visibility

  useEffect(() => {
    populateCategoriesDropdown();
  }, []);

  const populateCategoriesDropdown = () => {
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then((categories) => {
        setCategories(categories);
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
        handleCloseDialog(); // Close the dialog after successful addition
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button
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
      </button>

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
          {categories.map((category) => (
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
  );
};

export default AddCategoryFieldForm;
