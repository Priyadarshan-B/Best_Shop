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
import "./add_product.css";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import "../Tables/table.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

// AddStocks func..

function AddStocks() {
  //define  usestate
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [field, setFields] = useState([]);
  const [selling_price, setSellingPrice] = useState("");
  const [mrp, setMrpPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState(1);
  const [model, setModel] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showQty, setShowQty] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // navigate

  const handleNavigate = (path) => {
    navigate(path);
  };

  // distributor TextBox

  const [distValue, setDistValue] = useState("");
  const [isContentVisible, setIsContentVisible] = useState(true);
  const handleTextChange = (event) => {
    setDistValue(event.target.value);
  };

  // validation of dist textbox
  const checkInput = () => {
    if (distValue.trim() === "") {
      console.log("textbox is empty");
      notifyError("Failed to add Distributor");
    } else {
      notifySuccess("Distributor added successfully");
      console.log("textbox filled");
      setIsContentVisible(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      checkInput();
    }
  };

  // dialog const

  
  // const [image, setImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [fieldOptions, setFieldOptions] = useState([]);
  const [formData, setFormData] = useState({
    category_id: "",
    field_name: "",
    type: "",
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

  const updateImage = (inputId) => {
    const input = document.getElementById(inputId);
    const label = document.querySelector(`label[for=${inputId}]`);

    if (input && label) {
      const fileName = input.files[0]?.name || "No file chosen";
      label.innerHTML = `<b>${
        inputId === "image" ? "Image" : "Camera"
      }:</b> ${fileName}`;
    }
  };

  const submitForm = () => {
    const formData = new FormData();
    formData.append("category_name", categoryName);
    const imageInput = document.getElementById("image");
    const cameraInput = document.getElementById("camera");
    formData.append("image", imageInput.files[0] || cameraInput.files[0]);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }
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
        notifySuccess("Category added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError("Failed to add Category");
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

  // Detail Dialog Box
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };

  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const addFieldDetails = () => {
    const formData = new FormData();

    formData.append(
      "category_name",
      document.getElementById("category_name").value
    );
    formData.append(
      "field_id",
      document.getElementById("field_name").value.split(",")[0]
    );
    formData.append(
      "field_name",
      document.getElementById("field_name").value.split(",")[1]
    );
    formData.append(
      "details_name",
      document.getElementById("details_name").value
    );
    const imageInput = document.getElementById("image");
    const cameraInput = document.getElementById("camera");
    formData.append("image", imageInput.files[0] || cameraInput.files[0]);

    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    console.log("Form Data:", formData);

    fetch(`${apiHost}/field-details`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        notifySuccess("Field detail added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError("Failed to add field details");
      });
  };

  const getCategoryOptions = () => {
    fetch(`${apiHost}/dropdown/category`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Category Data:", data);
        setCategoryOptions(["", ...data]);
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  };

  const getFields = () => {
    const selectedCategory = document.getElementById("category_name").value;

    fetch(`${apiHost}/dropdown/category_fields/${selectedCategory}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Field Data:", data);

        const modifiedFieldOptions = data.map((field) => ({
          value: `${field.field_id},${field.field_name}`,
          label: field.field_name,
        }));

        setFieldOptions(["", ...modifiedFieldOptions]);
      })
      .catch((error) => {
        console.error("Error fetching field data:", error);
      });
  };

  React.useEffect(() => {
    getCategoryOptions();
    fetchDetailData();
  }, []);

  const updateDetailImage = (inputId) => {
    const input = document.getElementById(inputId);
    const label = document.querySelector(`label[for=${inputId}]`);

    if (input && label) {
      const fileName = input.files[0]?.name || "No file chosen";
      label.innerHTML = `<b>${
        inputId === "image" ? "Image" : "Camera"
      }:</b> ${fileName}`;
    }
  };

  const fetchDetailData = async () => {
    try {
      const response = await requestApi("GET", "/categories/0/0", {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //field dialog Box
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
        console.error("Error fetching categories:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addCategoryField = () => {
    fetch(`${apiHost}/category-fields`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        handleCloseDialog();
        notifySuccess("Field added successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
        notifyError("Failed to add field");
      });
  };
  const fetchFieldData = async () => {
    try {
      const response = await requestApi("GET", "/categories/0", {});
      console.log(response);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const notifySuccess = (message) => {
    toast.success(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  const notifyError = (message) => {
    toast.error(message, { position: toast.POSITION.BOTTOM_LEFT });
  };

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // });

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSelectCategory = async (item) => {
    setIsLoading(true);

    setSelectedCategory([...selectedCategory, item]);

    setName((prevName) => {
      return (
        prevName +
        (prevName.length > 0 ? "," : "") +
        (item.category_name || item.details_name)
      );
    });

    if (selectedCategory.length === 0) {
      await fetchFields(item.category_id);
    } else {
      if (selectedIndex < field.length - 1) {
        await fetchOptions(
          selectedCategory[0].category_id,
          field[selectedIndex + 1].field_id
        );
        setSelectedIndex(selectedIndex + 1);
      } else {
        setShowQty(true);
      }
    }

    setIsLoading(false);
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

  // generate button function
  const handleGenerate = async () => {
    const selectedDetails = selectedCategory.map((item, i) =>
      i !== 0 ? item.detail_id : null
    );

    // size n quantity value int
    const sizes = inputs.map((input) => parseInt(input.size, 10));
    const quantities = inputs.map((input) => parseInt(input.quantity, 10));

    // data to be send to backend

    const requestData = {
      dist_id: parseInt(distValue),
      category_id: selectedCategory[0].category_id,
      field_details_id: selectedDetails.filter((item) => item !== null),
      name: `${name.replace(/,/g, "-")}`,
      price: parseFloat(price),
      selling_price: parseFloat(selling_price),
      mrp: parseFloat(mrp),
      sizes: sizes,
      quantities: quantities,
      model: model,
    };
    for (const key in requestData) {
      console.log(`${key}: ${typeof requestData[key]}`);
    }

    console.log(requestData);
    fetch(`${apiHost}/stocks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        notifySuccess("Stock Added successfully");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
        notifyError("Failed to Add Stocks");
      });
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // text as number
  const handleNumberChange = (e, setValue) => {
    const inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  //  refresh func..
  const handleRefresh = () => {
    setSellingPrice("");
    setMrpPrice("");
    setPrice("");
    setCount("");
    setInputs([]);
  };

  // count, size and quantity

  const [count, setCount] = useState();
  const [inputs, setInputs] = useState([]);

  const handleCountChange = (event) => {
    const newCount = parseInt(event.target.value, 10) || 0;
    setCount(newCount);
    setInputs(
      Array.from({ length: newCount }, () => ({ size: "", quantity: "" }))
    );
  };

  const handleInputValueChange = (index, key, value) => {
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };

  // render the return function
  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <ToastContainer />
        <div className="dashboard-body">
          {/* to show the dist.. text box */}
          {isContentVisible ? (
            <div>
              <label>Distributor ID:</label>
              <input
                onKeyPress={handleKeyPress}
                className="dist_input"
                type="text"
                value={distValue}
                onChange={handleTextChange}
                placeholder="Enter Distrbutor ID"
              />

              <button onClick={checkInput} className="dist_button">
                Next
                <NavigateNextOutlinedIcon style={{ marginLeftt: "10px" }} />
              </button>
            </div>
          ) : (
            // category selection page
            <div className="category-page">
              <div className="select-category-card">
                {selectedCategory.length !== 0 ? (
                  selectedCategory.map((item) =>
                    item.details_image === "null" ? (
                      <h2 key={item.id}>{item.details_name}</h2>
                    ) : (
                      <img
                        className="pinned-items"
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
                  {/* search bar */}
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="form-input-ss"
                  />
                  {/* add button for category, feild , details */}
                  <button
                    className="add-button"
                    type="button"
                    onClick={handleClickOpenDialog}
                  >
                    <b>ADD </b>
                    <div>
                      <LibraryAddIcon />
                    </div>
                  </button>
                </div>
                {/* cards */}
                {/* {!showQty ? (
                  <div className="product-type-grid">
                    <div className="item_boxes">
                      {!isLoading &&
                        category.map((item, i) => (
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
                  </div>
                ) : ( */}
                {!showQty ? (
                  <div className="product-type-grid">
                    <div className="item_boxes">
                      {!isLoading ? (
                        category.length > 0 ? (
                          category.map((item, i) => (
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
                          ))
                        ) : (
                          <p>No fields</p>
                        )
                      ) : (
                        <p>Loading...Wait</p>
                      )}
                    </div>
                  </div>
                ) : (
                  // last page for size and price
                  <>
                    <div className="last">
                      <div className="part_for_size">
                        <div className="count-size-quantity-box">
                          <div className="count-div">
                            <label htmlFor="model" className="count_lable">
                              Model No.
                            </label>
                            <input
                              placeholder="Enter Model No."
                              className="count_field"
                              type="text"
                              id="model"
                              name="model"
                              value={model}
                              onChange={(e) => setModel(e.target.value)}
                            />
                            <label htmlFor="count" className="count_lable">
                              Count:
                            </label>
                            <input
                              placeholder="Enter Count"
                              className="count_field"
                              type="number"
                              id="count"
                              name="count"
                              value={count}
                              onChange={handleCountChange}
                            />
                          </div>
                          <div className="size-and-quantity">
                            {inputs.map((input, index) => (
                              <div key={index}>
                                <label htmlFor={`size-${index}`}>Size:</label>
                                <input
                                  className="size_field"
                                  type="number"
                                  id={`size-${index}`}
                                  name={`size-${index}`}
                                  value={input.size}
                                  onChange={(e) =>
                                    handleInputValueChange(
                                      index,
                                      "size",
                                      e.target.value
                                    )
                                  }
                                />
                                <label htmlFor={`quantity-${index}`}>
                                  Quantity:
                                </label>
                                <input
                                  className="quantity_field"
                                  type="number"
                                  id={`quantity-${index}`}
                                  name={`quantity-${index}`}
                                  value={input.quantity}
                                  onChange={(e) =>
                                    handleInputValueChange(
                                      index,
                                      "quantity",
                                      e.target.value
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="part_for_price">
                        <div className="price-boxes">
                          <div className="centering">
                            <div className="input-container">
                              <label htmlFor="selling_price">
                                Selling Price:
                              </label>
                              <input
                                placeholder="Enter Selling Price"
                                className="input_box"
                                type="text"
                                id="selling_price"
                                value={selling_price}
                                onChange={(e) =>
                                  handleNumberChange(e, setSellingPrice)
                                }
                              />
                            </div>
                            <div className="input-container">
                              <label htmlFor="mrp">MRP:</label>
                              <input
                                placeholder="Enter MRP"
                                className="input_box"
                                type="text"
                                id="mrp"
                                value={mrp}
                                onChange={(e) =>
                                  handleNumberChange(e, setMrpPrice)
                                }
                              />
                            </div>
                            <div className="input-container">
                              <label htmlFor="price">Purchasing Price:</label>
                              <input
                                placeholder="Enter Purchasing Price"
                                className="input_box"
                                type="text"
                                id="price"
                                value={price}
                                onChange={(e) =>
                                  handleNumberChange(e, setPrice)
                                }
                              />
                            </div>
                            <div className="buttons-in-line">
                              <button
                                className="generate_button"
                                onClick={() => {
                                  handleGenerate();
                                  handleNavigate("/productdashboard");
                                }}
                              >
                                Generate +
                              </button>
                              <button
                                className="generate_button"
                                onClick={() => {
                                  handleGenerate();
                                  handleRefresh();
                                }}
                              >
                                Add other
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {isLoading && <div className="loader"></div>}
              </div>
            </div>
          )}
          {/* dialog box (category, fields, details) */}
          <Dialog
            open={open}
            onClose={handleCloseDialog}
            PaperProps={{
              style: {
                // width: "50%",
                // height: "30%",
                // padding: "10px",
                display: "flex",
                flexWrap: "wrap",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
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
                  <div
                    className="dialog-box"
                    onClick={handleOpenCategoryDialog}
                  >
                    Category
                  </div>

                  <div className="dialog-box" onClick={handleOpenFieldDialog}>
                    Field
                  </div>
                  <div className="dialog-box" onClick={handleOpenDetailDialog}>
                    Field details
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseDialog}
                  style={{
                    fontWeight: 700,
                  }}
                >
                  Cancel
                </Button>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      </div>

      {/* category dialog box */}

      <Dialog
        open={openCategoryDialog}
        onClose={handleCloseCategoryDialog}
        PaperProps={{
          style: {
            // width: "500px",
            // height: "390px",
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
              <b className="field-title">Category Name </b>
            </label>
            <input
              className="form-input-sp"
              placeholder="Enter Category Name"
              type="text"
              id="categoryName"
              name="category_name"
              value={categoryName}
              onChange={handleCategoryNameChange}
              required
            />
            <br />

            <label for="image">
              <b>Image:</b>
              <br />
              <div class="custom-file-label">
                {" "}
                <b className="choose_file_placeHolder">Choose File:</b>{" "}
              </div>
            </label>
            <input
              class="custom-file-input"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required
              onChange={() => updateImage("image")}
            />

            <label for="camera">
              <b>Camera</b>
              <br />
              <div class="custom-file-label">
                {" "}
                <b className="choose_file_placeHolder">Take Photo:</b>{" "}
              </div>
            </label>
            <input
              class="custom-file-input"
              type="file"
              id="camera"
              name="camera"
              accept="image/*"
              capture="environment"
              required
              onChange={() => updateImage("camera")}
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseCategoryDialog}
              style={{
                fontWeight: 700,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                submitForm();
                handleCloseCategoryDialog();
              }}
              style={{
                fontWeight: 700,
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* detail dialog box*/}

      <Dialog
        open={openDetailDialog}
        onClose={handleCloseDetailDialog}
        PaperProps={{
          style: {
            // width: "500px",
            // height: "500px",
            padding: "20px",
          },
        }}
      >
        <div>
          <DialogTitle
            style={{
              textAlign: "center",
            }}
          >
            <h2>Add Field Details</h2>
          </DialogTitle>
          <DialogContent
            style={{
              fontSize: 20,
            }}
          >
            <form id="addFieldDetailsForm" encType="multipart/form-data">
              <div className="flex-container">
                <div className="field-inside-flex">
                  <div>
                    <label className="form-label" htmlFor="category_name">
                      <b>Category Name:</b>
                    </label>
                  </div>
                  <div>
                    <select
                      className="form-select"
                      id="category_name"
                      name="category_name"
                      onChange={getFields}
                      required
                    >
                      {categoryOptions.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="field-inside-flex">
                  <div>
                    <label htmlFor="field_name">
                      <b>Field Name </b>
                    </label>
                  </div>
                  <div>
                    <select
                      className="form-select-none"
                      id="field_name"
                      name="field_name"
                    >
                      {fieldOptions.map((field, index) => (
                        <option key={index} value={field.value}>
                          {field.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field-inside-flex">
                  <div>
                    <label
                      style={{
                        marginTop: 20,
                      }}
                      htmlFor="details_name"
                    >
                      <b>Details Name:</b>
                    </label>
                  </div>
                  <div>
                    <input
                      className="form-input"
                      placeholder="Enter Detail Name"
                      type="text"
                      id="details_name"
                      name="details_name"
                      required
                    />
                  </div>
                </div>
                <div className="field-inside-flex">
                  <label For="image">
                    <b>Image:</b>
                    <div className="custom-file-label">
                      <b className="choose_file_placeHolder">Choose File</b>
                    </div>
                  </label>
                  <input
                    className="custom-file-input"
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    required
                    onChange={() => updateDetailImage("image")}
                  />
                  <br />
                  <label For="camera">
                    <b>Camera:</b>
                    <div className="custom-file-label">
                      <b className="choose_file_placeHolder">Take Photo</b>
                    </div>
                  </label>
                  <input
                    className="custom-file-input"
                    type="file"
                    id="camera"
                    name="image"
                    accept="image/*"
                    capture="environment"
                    required
                    onChange={() => updateDetailImage("camera")}
                  />
                </div>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDetailDialog}
              style={{
                fontWeight: 700,
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                addFieldDetails();
                handleCloseDetailDialog();
              }}
              variant="contained"
              color="primary"
              style={{
                fontWeight: 700,
              }}
            >
              Add Field Details
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      {/* field dialog  box*/}

      <Dialog
        open={openFieldDialog}
        onClose={handleCloseFieldDialog}
        PaperProps={{
          style: {
            // width: "500px",
            // height: "370px",
            padding: "20px",
          },
        }}
      >
        <div>
          <DialogTitle style={{ textAlign: "center" }}>
            <h2>Add Fields</h2>
          </DialogTitle>
          <DialogContent
            style={{
              fontSize: 20,
            }}
          >
            <div className="flex-container">
              <div className="field-inside-flex">
                <div>
                  <label className="form-label" htmlFor="category_id">
                    <b>Category:</b>
                  </label>
                </div>
                <div>
                  <select
                    className="form-select"
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    {category.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field-inside-flex">
                <div>
                  <label
                    className="form-label"
                    htmlFor="field_name"
                    style={{
                      width: "20px",
                      height: "8px",
                      paddingRight: "10px",
                    }}
                  >
                    <b>Field Name:</b>
                  </label>
                </div>
                <div>
                  <input
                    className="form-input"
                    type="text"
                    id="field_name"
                    name="field_name"
                    placeholder="Enter Field Name"
                    value={formData.field_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="field-inside-flex">
                <div>
                  <label
                    htmlFor="type"
                    style={{
                      width: "20px",
                      height: "8px",
                      paddingRight: "10px",
                    }}
                  >
                    <b>Field Type:</b>
                  </label>
                </div>
                <div>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Field Type</option>
                    <option value="list">list</option>
                  </select>
                </div>
              </div>
              <div className="field-inside-flex">
                <div>
                  <label
                    htmlFor="has_separate_page"
                    style={{
                      width: "20px",
                      height: "8px",
                      padding: "0",
                      marginRight: "5px",
                    }}
                  >
                    <b>Separate Page:</b>
                  </label>
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    id="has_separate_page"
                    name="has_separate_page"
                    checked={formData.has_separate_page}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ fontWeight: 700 }}
              onClick={handleCloseFieldDialog}
            >
              Cancel
            </Button>
            <Button
              style={{ fontWeight: 700 }}
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
