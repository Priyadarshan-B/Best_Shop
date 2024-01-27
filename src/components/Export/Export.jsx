import React, { useState } from "react";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import '../Dashboard/dashboard.css';
import '../add_product/add_product.css';
import * as XLSX from 'xlsx';
import apiHost from "../../utils/api";
import DownloadIcon from '@mui/icons-material/Download';

const ExportData = () => {
  const [exportValue, setExportValue] = useState("");

  const downloadExcel = () => {
    fetch(`${apiHost}/end_dist/${exportValue}`)
      .then(response => response.json())
      .then(data => {
        console.log(exportValue); 
        const flattenedData = data.stocks.map(stock => ({
            ...stock,
            field_details_name: stock.field_details_name.join(', '), // Flatten array to a string
          }));
       
        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "DataSheet.xlsx");
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />
        <div className="dashboard-body">
          <div>
          <label>Distributor ID:</label>
            <input
              className="dist_input"
              type="number"
              value={exportValue}
              onChange={(e) => setExportValue(e.target.value)}
              placeholder="Distributor ID"
            />
             
            <button onClick={downloadExcel} className="dist_button">
            <DownloadIcon style={{ marginRight: '10px' }} />
              Download As Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportData;
