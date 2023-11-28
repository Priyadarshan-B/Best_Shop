import React from 'react';




const BrandCard = ({ brand, imageURL, onSelectBrand }) => (
  <div className="brand-card" onClick={() => onSelectBrand(brand, imageURL)}>
    {/* <h2>{brand}</h2> */}
    <img src={imageURL} alt={`${brand} image`} />
  </div>
);

const BrandSelection = ({ onSelectBrand }) => {
const brands = [
  { brand: 'Nike', imageURL: 'https://www.famousfootwear.com/-/media/project/tenant/famous-footwear/famous-footwear/homepage/2023/bts/mini-hub/1_hp_logo_nike.jpg' },
  { brand: 'Adidas', imageURL: 'https://logowik.com/content/uploads/images/adidas-new-20225326.jpg' },
  { brand: 'Puma', imageURL: 'https://assets.turbologo.com/blog/en/2019/11/19084917/puma-logo-cover.png' },
  { brand: 'Reebok', imageURL: 'https://ar.happyvalentinesday2020.online/pics/www.brandworkz.com/wp-content/uploads/2016/08/Reebok-logo.jpg' },
  { brand: 'Walkaroo', imageURL: 'https://www.famousfootwear.com/-/media/project/tenant/famous-footwear/famous-footwear/homepage/2023/bts/mini-hub/1_hp_logo_nike.jpg' },
  { brand: 'Sparx', imageURL: 'https://logowik.com/content/uploads/images/adidas-new-20225326.jpg' },
  { brand: 'U.S. Polo', imageURL: 'https://assets.turbologo.com/blog/en/2019/11/19084917/puma-logo-cover.png' },
  { brand: 'Bata', imageURL: 'https://ar.happyvalentinesday2020.online/pics/www.brandworkz.com/wp-content/uploads/2016/08/Reebok-logo.jpg' },
];


  return (
    <div className="brand-selection">
      

      <div className="search-bar">
        <h2>BRAND</h2>
        <input type="text" placeholder="Search Brand.." />
      </div>
      <div className="brand-grid">
        {brands.map(({ brand, imageURL }) => (
          <BrandCard
            key={brand}
            brand={brand}
            imageURL={imageURL}
            onSelectBrand={onSelectBrand}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandSelection;
