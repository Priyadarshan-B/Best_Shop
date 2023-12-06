import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHost from "../../utils/api";
import './master.css';


const MasterWithDialog = () => {
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleCategoryNameChange = (event) => {
      setCategoryName(event.target.value);
    };
  
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
  
    const submitForm = () => {
        const formData = new FormData();
        formData.append('category_name', categoryName);
        formData.append('image', image);
      
        fetch(`${apiHost}/categories`, {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse the response body as JSON
          })
          .then((data) => {
            console.log('Success:', data);
            // Do something with the successful response data if needed
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
  
    const handleOpenDialog = () => {
      setOpen(true);
    };
  
    const handleCloseDialog = () => {
      setOpen(false);
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
              width : '500px',
              height: '290px',
              padding: '10px', 
            },
          }}
        >
          <div>
            <DialogTitle
            style={{
                textAlign:'center'
              }}>
                <h2>Add Category</h2></DialogTitle>
            <DialogContent
             style={{
                fontSize: 20,
                
               }
     
               }>
              <label htmlFor="categoryName"
              
              style={{
                width:'20px',
                height:'8px',
                
                paddingRight:'10px'
              }}>
                <b>Category Name:</b></label>
              <br />
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
                className='c_name'
                type="text"
                id="categoryName"
                name="category_name"
                value={categoryName}
                onChange={handleCategoryNameChange}
                required
              />
              <br />
  
              <label htmlFor="image"><b>Select an image:</b></label>
              <br />
  
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
              <Button onClick={() => {
                submitForm();
                 handleCloseDialog(); 
              }}>Submit</Button>
           
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  };
  
  export default MasterWithDialog;
  