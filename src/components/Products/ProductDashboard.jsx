import React, { useState } from 'react';
import VerticalNavbar from '../Vertical_Navbar/vertical_navbar';
import HorizontalNavbar from '../Horizontal_Navbar/horizontal_navbar';


function ProductDashboard() {


  // Sample data (you can replace it with your actual data)
  const initialData = [
    { productCode: '001', productName: 'Laptop', availability: 80, price: 1200 },
    { productCode: '002', productName: 'Smartphone', availability: 60, price: 800 },
    // Add more rows as needed
  ];

  const [data, setData] = useState(initialData);

  
  
  return (
    <div className="dashboard-container">
    <HorizontalNavbar />
    <div className="vandc-container">
      <VerticalNavbar />
      <div className="dashboard-body">
    <div>
      <div className='product-dashboard'>
        <div className='product-dashboard-filters'>
          <h2>Filter Product</h2>
          <div className='cost-filter'>
            <h3>Cost</h3>
            <select>
              <option>Select an Option</option>
            </select>
          </div>
          <div className='sort-by'>
            <h2>Sort By</h2>
            <input type='number' placeholder='Select An Option'></input>
          </div>
        </div>
        <div className='product-dashboard-grid'>
          <div className='category-select-card'>
            <h2>Category</h2>
            <input type='checkbox'></input>
            <label>Electronics</label>
            <br/>
            <input type='checkbox'></input>
            <label>Watches</label>
            <br/>
            <input type='checkbox'></input>
            <label>Shoes</label>
            <br/>
            <input type='checkbox'></input>
            <label>Shirts</label>

            <br/>
            <h3>Availability Percent</h3>
            <input type='checkbox'></input>
            <label>0-25%</label>
            <br/>
            <input type='checkbox'></input>
            <label>25-60%</label>
            <br/>
            <input type='checkbox'></input>
            <label>60-100%</label>
          </div>
          <div className='product-info-table'>
            <table>
              <thead>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Availability%</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productCode}</td>
                    <td>{item.productName}</td>
                    <td>{item.availability}%</td>
                    <td>${item.price}</td>
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
    
  );
}

export default ProductDashboard;