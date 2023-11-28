// SizeColorSelection.jsx

import React, { useState } from 'react';

const SizeCard = ({ label, onSelect, isSelected }) => (
  <div className={`size-card ${isSelected ? 'active' : ''}`} onClick={onSelect}>
    <p>{label}</p>
  </div>
);

const ColorCard = ({ label, onSelect, isSelected }) => (
  <div className={`color-card ${isSelected ? 'active' : ''}`} onClick={() => onSelect(label)}>
    <div className="color-outer-div">
      <div className="color-preview" style={{ backgroundColor: label }}></div>
    </div>
    <p>{label}</p>
  </div>
);

const PriceCard = ({ onSelect, isSelected }) => (
  <div className={`price-card ${isSelected ? 'active' : ''}`}>
    <input type="text" placeholder="Enter Price" onChange={(e) => onSelect(e.target.value)} />
  </div>
);

const QuantityInput = ({ onSelectQuantity }) => (
  <div className="quantity-input">
    <input type="number" placeholder="Enter Quantity" onChange={(e) => onSelectQuantity(e.target.value)} />
  </div>
);

const SizeColorSelection = ({ onSelectSize, onSelectColor, onSelectPrice, onSelectQuantity, category, gender, brand }) => {
  const sizes = [6, 7, 8, 9, 10, 11, 12, 13];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Cyan', 'Pink'];

  const [selectedValues, setSelectedValues] = useState({
    size: null,
    color: null,
    price: null,
    quantity: null,
  });

  const handleGenerate = () => {
    // Display a popup or perform any other action with the selected values
    alert(`
      Selected Category: ${category?.type} (ID: ${category?.id})
      Selected Gender: ${gender?.type} (ID: ${gender?.id})
      Selected Brand: ${brand?.type} (ID: ${brand?.id})
      Selected Size: ${selectedValues.size}
      Selected Color: ${selectedValues.color}
      Entered Price: ${selectedValues.price}
      Entered Quantity: ${selectedValues.quantity}
    `);
  };

  return (
    <div className='size-color-quantity-selection'>
      <div className="size-color-selection">
        <div className='size'>
          <h3>SIZE</h3>
          <div className="size-grid">
            {sizes.map((size) => (
              <SizeCard
                key={size}
                label={size}
                isSelected={selectedValues.size === size}
                onSelect={() => {
                  onSelectSize(size);
                  setSelectedValues((prev) => ({ ...prev, size }));
                }}
              />
            ))}
          </div>
        </div>

        <div className='color'>
          <h3>COLOR</h3>
          <div className="color-grid">
            {colors.map((color) => (
              <ColorCard
                key={color}
                label={color}
                isSelected={selectedValues.color === color}
                onSelect={() => {
                  onSelectColor(color);
                  setSelectedValues((prev) => ({ ...prev, color }));
                }}
              />
            ))}
          </div>
        </div>

        <div className='price'>
          <h3>PRICE</h3>
          <PriceCard
            isSelected={selectedValues.price !== null}
            onSelect={(value) => setSelectedValues((prev) => ({ ...prev, price: value }))}
          />
        </div>
      </div>
      <div className='generate'>
        <div className='quantity-select'>
          <h3>QUANTITY</h3>
          <QuantityInput onSelectQuantity={(value) => setSelectedValues((prev) => ({ ...prev, quantity: value }))} />
        </div>
        <button onClick={handleGenerate}>Generate +</button>
      </div>
    </div>
  );
};

export default SizeColorSelection;
