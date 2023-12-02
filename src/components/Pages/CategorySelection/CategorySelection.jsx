import React, { useState, useEffect } from "react";

const ProductTypeItem = ({ category, onClick }) => (
  <div className="product-type-item" onClick={() => onClick(category)}>
    <p>{category.category_name}</p>
    <img src={category.category_image} alt={`${category.category_name} image`} />
  </div>
);

const CategorySelection = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://10.10.161.160:5000/categories")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories", error));
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <div className="category-page">
      <div className="search-and-product-type-grid">
        <div className="search-bar">
          <h2>CATEGORY</h2>
          <input type="text" placeholder="Search products..." />
        </div>
        <div className="product-type-grid">
          {Array.isArray(categories) &&
            categories.map((category) => (
              <ProductTypeItem
                key={category.category_id}
                category={category}
                onClick={onSelectCategory}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
