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
import DialogContentText from "@mui/material/DialogContentText";



const CategoryTable = () => {
  const [categories, setCategories] = useState([]);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSuccessPopup, setOpenSuccessPopup] = useState(false); // New state variable

  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log(`Edit action clicked for id ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality here
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

  const handleClickOpenSuccess = () => {
    setOpenSuccessPopup(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccessPopup(false);
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
        // Show the success popup
        handleClickOpenSuccess();
        // Fetch updated data if needed
        fetchData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await requestApi("GET", "/categories", {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRemoveRow = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
  };

  const columns = [
    { field: "id", headerName: <b>S.No</b>, width: 100 },
    { field: "category_name", headerName: <b>Category Name</b>, width: 200 },
    {
      field: "actions",
      headerName: <b>Actions</b>,
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#5676f5",
              color: "white",
            }}
            onClick={() => handleEdit(params.row.id)}
          >
            Edit{" "}
          </Button>
          <Button
            style={{
              backgroundColor: "#ed4545",
              color: "white",
            }}
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
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
        <div className="dashboard-body">
          <div className="category-table-container">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "40px",
              }}
            >
              <h2>Category Table</h2>
              <button
                type="button"
                onClick={handleClickOpenDialog}
                style={{
                  backgroundColor: "#2fcc54",
                  color: "white",
                  border: "none",
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
              <>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  style={{
                    backgroundColor: "white",
                    marginTop: "20px",
                    height: "600px",
                    width: "550px",
                    justifyContent: "center",
                    justifyItems: "center",
                    borderRadius: "10px",
                    boxShadow: "0 0 14px rgba(0, 0, 0, 0.1)",
                    fontWeight: "20px",
                    fontSize: "20px",
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
                height: "290px",
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
                <input
                  style={{
                    width: "250px",
                    height: "35px",
                    paddingLeft: "10px",
                    fontSize: "20px",
                    backgroundColor: "#e8e4fcc7",
                    borderRadius: "5px",
                    border: "none",
                    marginTop: "5px",
                  }}
                  className="c_name"
                  type="text"
                  id="categoryName"
                  name="category_name"
                  value={categoryName}
                  onChange={handleCategoryNameChange}
                  required
                />
                <br />

                <label htmlFor="image">
                  <b>Select an image:</b>
                </label>
                <br />

                <input
                  style={{
                    fontSize: "15px",
                    backgroundColor: "#e8e4fcc7",
                    textAlign: "center",
                    justifyContent: "center",
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
                <Button
                  onClick={() => {
                    submitForm();
                    handleCloseDialog();
                    handleClickOpenSuccess();
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </div>
          </Dialog>

          <Dialog
            open={openSuccessPopup}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseSuccess}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Success Popup"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Category Added Successfully
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSuccess}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CategoryTable;
