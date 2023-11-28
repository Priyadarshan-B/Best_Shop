
import React from 'react';
import ProductList from '../Products/ProductList.jsx';

const ProductStock = () => {
  const products = [
    { id: 1, name: 'Product 1', price: '$19.99', imageUrl: 'url-to-image-1' },
    { id: 2, name: 'Product 2', price: '$29.99', imageUrl: 'url-to-image-2' },
    // Add more products as needed
  ];

  return (
    <div className="app">
      <h1>Product Inventory</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductStock;
