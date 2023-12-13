import React, { useState, useEffect } from "react";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import requestApi from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import apiHost from "../../utils/api";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast,  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './table.css'

const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  // const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleEdit = (id) => {
    console.log(`Edit action clicked for id ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete action clicked for id ${id}`);
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
        fetchData();
        notifySuccess('Field added successfully');
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError('Failed to add field');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const fetchData = async () => {
    try {
      const response = await requestApi("GET", "/categories", {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleRemoveRow = (id) => {
  //   const updatedCategories = categories.filter(
  //     (category) => category.id !== id
  //   );
  //   setCategories(updatedCategories);
  // };

  const columns = [
    { field: "id", headerName: <b>S.No</b>, width: 280 },
    { field: "category_name", headerName: <b>Category Name</b>, width: 300 },
    {
      field: "actions",
      headerName: <b>Actions</b>,
      width: 150,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <EditIcon
            style={{
              color: "#5676f5",
              cursor: "pointer",
            }}
            onClick={() => handleEdit(params.row.id)}
          />
          <DeleteIcon
            style={{
              color: "#ed4545",
              cursor: "pointer",
            }}
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ];

  const rows = categories.map((category, index) => ({
    id: category.id || index + 1,
    category_name: category.category_name,
  }));

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          <div >
            <div className="category-header-container"
            >
              <h2 style={{
                marginTop:'10px'
              }}>Category Table</h2>
              <button className="add-button"
                type="button"
                onClick={handleClickOpenDialog}
              >
                <b>Add +</b>
              </button>
            </div>
            {categories && categories.length > 0 ? (
              <>
                <DataGrid 
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  style={{
                    backgroundColor: "white",
                    marginTop: "20px",
                    padding: "35px",
                    height: "580px",
                    width: "900px",
                    borderRadius: "30px",
                    boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)",
                    fontSize: "15px",
                  }}
                />
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <Dialog
            open={open}
            onClose={handleCloseDialog}
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
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                  onClick={() => {
                    submitForm();
                    handleCloseDialog();
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
