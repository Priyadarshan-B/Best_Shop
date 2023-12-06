import React, { useState } from 'react';

const Master = () => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);

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

    fetch('http://10.10.165.103:5000/categories', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Create a New Category</h2>
      <form>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          name="category_name"
          value={categoryName}
          onChange={handleCategoryNameChange}
          required
        />

        <label htmlFor="image">Select an image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        <button type="button" onClick={submitForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Master;
