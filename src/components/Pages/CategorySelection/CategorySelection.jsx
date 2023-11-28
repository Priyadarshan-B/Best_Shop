// CategorySelection.jsx

import React from "react";


const ProductTypeItem = ({ type, imageURL, onClick }) => (
  <div className="product-type-item" onClick={() => onClick(type, imageURL)}>
    <p>{type}</p>
    <img src={imageURL} alt={`${type} image`} />
  </div>
);

const CategorySelection = ({ onSelectCategory }) => {
  const productTypes = [
    { type: "Footwear", imageURL: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { type: "Stationery", imageURL: "https://images.unsplash.com/flagged/photo-1556569950-a8c536b24443?q=80&w=2601&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { type: "Toys", imageURL: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { type: "Cosmetics", imageURL: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { type: "Clothes", imageURL: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
    { type: "Jewels", imageURL: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" },
  ];

  return (
    <div className="category-page">
      <div className="search-and-product-type-grid">
        <div className="search-bar">
          <h2>CATEGORY</h2>
          <input type="text" placeholder="Search products..." />
        </div>
        <div className="product-type-grid">
          {productTypes.map(({ type, imageURL }) => (
            <ProductTypeItem
              key={type}
              type={type}
              imageURL={imageURL}
              onClick={onSelectCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
