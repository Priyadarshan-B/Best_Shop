import React, { useEffect, useState } from "react";
import Navbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import requestApi from "../../utils/axios";
import apiHost from "../../utils/api";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import "./add_product.css";
import { Diversity3 } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddStocks() {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [field, setFields] = useState([]);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showQty, setShowQty] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  // dialog const
  const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [formData, setFormData] = useState({
    category_id: '',
    field_name: '',
    type: '',
    has_separate_page: false,
  });
  const [openFieldDialog, setOpenFieldDialog] = useState(false);

  useEffect(() => {
    fetchFieldData();
    populateCategoriesDropdown();
  }, []);

  const handleOpenCategoryDialog = () => {
    setOpenCategoryDialog(true);
  };

  const handleCloseCategoryDialog = () => {
    setOpenCategoryDialog(false);
  };




  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const updateImage = (event) => {
    const input = document.getElementById('image');
    const label = document.querySelector('.custom-file-label');
    const fileName = input.files[0].name;
    label.innerHTML = '<b>Image File:</b> ' + fileName;
    setImage(event.target.files[0]);
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("category_name", categoryName);
    formData.append("image", image);

    fetch(`${apiHost}/categories`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        fetchCategoryData();
        notifySuccess('Field added successfully');
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError('Failed to add field');
      });
  };
  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await requestApi("GET", "/categories", {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Detail Dialog
  const handleOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const addFieldDetails = () => {
    const formData = new FormData();

    formData.append('category_name', document.getElementById('category_name').value);
    formData.append('field_id', document.getElementById('field_name').value.split(',')[0]); // Extract field_id
    formData.append('field_name', document.getElementById('field_name').value.split(',')[1]); // Extract field_name
    formData.append('details_name', document.getElementById('details_name').value);
    const imageInput = document.getElementById('image');
    formData.append('image', imageInput.files[0]);

    console.log('Form Data:', formData);

    fetch(`${apiHost}/field-details`, {
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
    fetch(`${apiHost}/dropdown/category`)
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

    fetch(`${apiHost}/dropdown/category_fields/${selectedCategory}`)
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
    fetchDetailData();
  }, []);

  const updateDetailImage = () => {
    const input = document.getElementById('image');
    const label = document.querySelector('.custom-file-label');
    const fileName = input.files[0].name;
    label.innerHTML = '<b>Image:</b> ' + fileName;
  };

  const fetchDetailData = async () => {
    try {
      const response = await requestApi("GET", '/categories/0/0', {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//field dialog
  const handleOpenFieldDialog = () => {
    setOpenFieldDialog(true);
  };

  const handleCloseFieldDialog = () => {
    setOpenFieldDialog(false);
  };

  const populateCategoriesDropdown = () => {
    fetch(`${apiHost}/categories`)
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

  const addCategoryField = () => {
    fetch(`${apiHost}/category-fields`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // alert(data.message);
        handleCloseDialog();
        notifySuccess('Field added successfully');

      })
      .catch((error) => {
        console.error('Error:', error);
        notifyError('Failed to add field');

      });
  };
  const fetchFieldData = async () => {
    try {
      const response = await requestApi('GET', '/categories/0', {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSelectCategory = (item) => {
    setSelectedCategory([...selectedCategory, item]);

    setName((prevName) => {
      return (
        prevName +
        (prevName.length > 0 ? "," : "") +
        (item.category_name || item.details_name)
      );
    });

    if (selectedCategory.length === 0) {
      fetchFields(item.category_id);
    } else {
      if (selectedIndex < field.length - 1) {
        fetchOptions(
          selectedCategory[0].category_id,
          field[selectedIndex + 1].field_id
        );
        setSelectedIndex(selectedIndex + 1);
      } else {
        setShowQty(true);
      }
    }
  };

  const fetchCategory = async () => {
    const res = await requestApi("GET", "/categories", {});
    console.log(res);
    if (res.success) {
      setCategory(res.data);
    }
  };

  const fetchFields = async (id) => {
    const res = await requestApi("GET", "/categories/" + id);
    console.log(res);
    if (res.success) {
      setFields(res.data);
      await fetchOptions(id, res.data[0].field_id);
    }
  };

  const fetchOptions = async (id, field_id) => {
    const res = await requestApi(
      "GET",
      `/categories/${id === 0 ? selectedCategory[0].category_id : id}/${
        field_id === 0 ? field[selectedIndex].field_id : field_id
      }`
    );
    console.log(res);
    if (res.success) {
      setCategory(res.data);
    }
  };

  const handleGenerate = async () => {
    const selectedDetails = selectedCategory.map((item, i) =>
      i !== 0
        ? item.detail_id 
        : null
    );

    const requestData = {
        category_id: selectedCategory[0].category_id,
        field_details_id: selectedDetails.filter((item) => item !== null),
        name: name.replace(/,/g, '-'),
        quantity: parseInt(quantity),
        price: parseFloat(price),
      };
      
    
      fetch(`${apiHost}/stocks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },
        body: JSON.stringify(requestData),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the backend response
          notifySuccess('Stock Added successfully');
          console.log(data);
        })
        .catch(error => {
          console.error('Error sending data to the backend:', error);
          notifyError('Failed to Add Stocks');
        });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div className="category-page">
            <div style={{ width: "90%" }} className="select-category-card">
              {selectedCategory.length !== 0 ? (
                selectedCategory.map((item) =>
                  item.details_image === "null" ? (
                    <h2 key={item.id}>{item.details_name}</h2>
                  ) : (
                    <img
                      key={item.id}
                      src={`${apiHost}/${
                        item.category_image === undefined
                          ? item.details_image
                          : item.category_image
                      }`}
                      alt={`${item.category_name} image`}
                    />
                  )
                )
              ) : (
                <h2>Select your category</h2>
                
              )}
            </div>
            <div className="search-and-product-type-grid">
              <div className="search-bar">
                <h2>
                  {showQty ||
                  selectedCategory.length === 0 ||
                  field.length === 0
                    ? "Category"
                    : field[selectedIndex].field_name}
                </h2>
                <input type="text" placeholder="Search products..." />
                <button className="add-button"
                type="button"
                onClick={handleClickOpenDialog}
              >
                <b>Add +</b>
              </button>
              </div>
              {!showQty ? (
                <div className="product-type-grid">
                  {category.map((item, i) => (
                    <div
                      key={i}
                      className="product-type-item"
                      onClick={() => {
                        handleSelectCategory(item);
                        if (selectedCategory.length === 0) {
                          fetchFields(item.category_id);
                        } else {
                          if (selectedIndex < field.length - 1) {
                            fetchOptions(
                              selectedCategory[0].category_id,
                              field[selectedIndex + 1].field_id
                            );
                            setSelectedIndex(selectedIndex + 1);
                          } else {
                            setShowQty(true);
                          }
                        }
                      }}
                    >
                      <p>
                        {item.category_name === undefined
                          ? item.details_name
                          : item.category_name}
                      </p>
                      {item.details_image !== "null" ? (
                        <img
                          src={`${apiHost}/${
                            item.category_image === undefined
                              ? item.details_image
                              : item.category_image
                          }`}
                          alt={`${item.category_name} image`}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <>
                <div className="last">
                  <div className="input-container">
                    <label htmlFor="price">Price:</label>
                    <input className="input_box"
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="quantity">Quantity:</label>
                    <input className="input_box"
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <button className="generate_button"
                    onClick={handleGenerate}
                    
                  >
                    Generate +
                  </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            PaperProps={{
              style: {
                width: "800px",
                height: "250px",
                padding: "10px",
              },
            }}
          >
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>New Items</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
           <div className="popup-content">
           <div className="dialog-box" onClick={handleOpenCategoryDialog}>
  Category
</div>

            <div  className="dialog-box" onClick={handleOpenFieldDialog} >Field</div>
            <div  className="dialog-box"onClick={handleOpenDetailDialog}>Field details</div>
            
           </div>
         

              
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
             
                >
                  Submit
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      </div>
      <Dialog
            open={openCategoryDialog}
            onClose={handleCloseCategoryDialog}
            PaperProps={{
              style: {
                width: "500px",
                height: "390px",
                padding: "10px",
              },
            }}
          >
            <div>
              <DialogTitle
                style={{
                  textAlign: "center",
                }}
              >
                <h2>Add Category</h2>
              </DialogTitle>
              <DialogContent
                style={{
                  fontSize: 20,
                }}
              >
                <label htmlFor="categoryName">
                  <b>Category Name:</b>
                </label>
                <br />
                <input className="form-input"
                  type="text"
                  id="categoryName"
                  name="category_name"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  required
                />
                <br />

                <label for="image" ><b>Image:</b><br/>
                  <div class="custom-file-label"> <b>Choose File:</b> </div>
                </label>
                <input class="custom-file-input" type="file" id="image" name="image" accept="image/*" required  onChange={updateImage} />
                <br />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseCategoryDialog}>Cancel</Button>
                <Button
                  onClick={() => {
                    submitForm();
                    handleCloseCategoryDialog();
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </div>
          </Dialog>

{/* detail dialog */}
          <Dialog
            open={openDetailDialog}
            onClose={handleCloseDetailDialog}
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
  <input class="custom-file-input" type="file" id="image" name="image" accept="image/*" required  onChange={updateDetailImage} />
        <br />


      </form>
                
                <br />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDetailDialog}>Cancel</Button>
                <Button  onClick={() => {
                    addFieldDetails();
                    handleCloseDetailDialog();
                  }} variant="contained" color="primary">
                  Add Field Details
                </Button>
              </DialogActions>
            </div>
          </Dialog>

          {/* field dialog */}

          <Dialog
            open={openFieldDialog}
            onClose={handleCloseFieldDialog}
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
                <select className='form-select'

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
                <Button onClick={handleCloseFieldDialog}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleCloseFieldDialog();
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
  );
}

export default AddStocks;
