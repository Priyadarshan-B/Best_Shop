// Product.js
import React from 'react';

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      {/* Add more details if needed */}
    </div>
  );
};

export default Product;
