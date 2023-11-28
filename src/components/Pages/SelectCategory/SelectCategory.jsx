import React from "react";


const SelectCategoryCard = ({ category, gender, brand, model }) => (
  <div className="select-category-card">
    {category && (
      <>
        <img src={category.imageURL} alt={`${category.type} image`} />
      </>
    )}
    {gender && (
      <>
        <img src={gender.imageURL} alt={`${gender.gender} image`} />
        <h2>{gender.gender}</h2>
      </>
    )}
    {brand && (
      <>
        <img src={brand.imageURL} alt={`${brand.brand} image`} />
        <h2>{brand.brand}</h2>
      </>
    )}
    {model && (
      <>
        <img src={model.imageURL} alt={`${model.model} image`} /> 
        {/* <h2>{model.model}</h2>
        <h2>{model.modelNo}</h2> */}
      </>
    )}
    {!category && <h2>Select your category</h2>}
  </div>
);

export default SelectCategoryCard;
