// StockPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import SelectCategoryCard from '../SelectCategory/SelectCategory';
import CategorySelection from '../CategorySelection/CategorySelection';
import GenderSelection from '../GenderSelection/GenderSelection';
import BrandSelection from '../BrandSelection/BrandSelection';
import ModelSelection from '../ModelSelection/ModelSelection';
import SizeColorSelection from '../SizeColorSelection/SizeColorSelection';
import VerticalNavbar from '../../Vertical_Navbar/vertical_navbar';
import HorizontalNavbar from '../../Horizontal_Navbar/horizontal_navbar';
import '../../Dashboard/dashboard.css';

const StockPage = () => {
  const [category, setCategory] = useState(null);
  const [gender, setGender] = useState(null);
  const [brand, setBrand] = useState(null);
  const [model, setModel] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedIds, setSelectedIds] = useState({
    category: null,
    gender: null,
    brand: null,
    model: null,
    size: null,
    color: null,
  });

  const apiUrl = 'http://your-backend-api-url';  

  const handleSaveStock = () => {
    axios.post(`${apiUrl}/saveStock`, {
      category,
      gender,
      brand,
      model,
      size,
      color,
      price,
    })
    .then(response => {
      console.log('Stock saved successfully!', response.data);
    })
    .catch(error => {
      console.error('Error saving stock:', error);
    });
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div style={{ width: '100%', height: '100%' }} className='addstock'>
          <div className='home-page'>
            <SelectCategoryCard
              category={category}
              gender={gender}
              brand={brand}
              model={model}
              size={size}
              color={color}
              price={price}
            />

            {category === null && (
              <CategorySelection
                onSelectCategory={(selectedCategory, selectedImageURL) => {
                  setCategory({ type: selectedCategory, imageURL: selectedImageURL });
                  setSelectedIds((prevIds) => ({ ...prevIds, category: selectedCategory.id }));
                }}
              />
            )}

            {category && gender === null && (
              <GenderSelection
                onSelectGender={(selectedGender, selectedImageURL) => {
                  setGender({ type: selectedGender, imageURL: selectedImageURL });
                  setSelectedIds((prevIds) => ({ ...prevIds, gender: selectedGender.id }));
                }}
              />
            )}

            {gender && brand === null && (
              <BrandSelection
                onSelectBrand={(selectedBrand, selectedImageURL) => {
                  setBrand({ type: selectedBrand, imageURL: selectedImageURL });
                  setSelectedIds((prevIds) => ({ ...prevIds, brand: selectedBrand.id }));
                }}
              />
            )}

            {brand && model === null && (
              <ModelSelection
                onSelectModel={(selectedModel, selectedModelNo, selectedImageURL) => {
                  setModel({ model: selectedModel, modelNo: selectedModelNo, imageURL: selectedImageURL });
                  setSelectedIds((prevIds) => ({ ...prevIds, model: selectedModel.id }));
                }}
              />
            )}

            {model && size === null && color === null && (
              <SizeColorSelection
                onSelectSize={(selectedSize) => {
                  setSize(selectedSize);
                  setSelectedIds((prevIds) => ({ ...prevIds, size: selectedSize }));
                }}
                onSelectColor={(selectedColor) => {
                  setColor(selectedColor);
                  setSelectedIds((prevIds) => ({ ...prevIds, color: selectedColor.id }));
                }}
                onSelectPrice={(selectedPrice) => setPrice(selectedPrice)}
                category={category}
                gender={gender}
                brand={brand}
              />
            )}

            <button onClick={handleSaveStock}>Generate +</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
