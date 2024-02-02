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
            field_details_name: stock.field_details_name.join(', '), 
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


// import React from 'react';
// import * as XLSX from 'xlsx';

// class ExcelConverter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       jsonData: {
//         dist_id: 10,
//         stocks: [
//           {
//             category_name: 'Footwear',
//             date_added: '2024-01-31',
//             field_details_name: ['Male', 'Bata', 'SILK-AW-22'],
//             price: 500,
//             quantity: 100,
//             stock_id: 5,
//             stock_name: 'Footwear-Male-Bata-SILK-AW-22-50-RED',
//             time_added: '10:14:53',
//           },
//           {
//             category_name: 'Footwear',
//             date_added: '2024-01-31',
//             field_details_name: ['Male', 'Bata', 'SILK-AW-22'],
//             price: 200,
//             quantity: 10,
//             stock_id: 6,
//             stock_name: 'Footwear-Male-Bata-SILK-AW-22',
//             time_added: '10:49:18',
//           },
//         ],
//       },
//     };
//   }

//   exportToExcel = () => {
//     const { stocks } = this.state.jsonData;

//     const header = [
//       'ItemName',
//       'QTY',
//       'Purchaseprice',
//       'SellingPrice',
//       'MRP',
//       'MAIN CATEGORY',
//       'SUB CATEGORY',
//       'BRAND',
//       'SIZES',
//       'STYLE MODEL',
//       'COLOUR',
//     ];

//     const data = stocks.map((stock) => {
//       const [gender, brand, style] = stock.field_details_name;
//       return [
//         stock.stock_name,
//         stock.quantity,
//         stock.price,
//         0,
//         0,
//         stock.category_name,
//         gender,
//         brand,
//         0, 
//         style,
//         'RED', 
//       ];
//     });

//     const result = [header, ...data];

//     const ws = XLSX.utils.aoa_to_sheet(result);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

//     XLSX.writeFile(wb, 'output.xlsx');
//   };

//   render() {
//     return (
//       <div>
//         <button onClick={this.exportToExcel}>Export to Excel</button>
//       </div>
//     );
//   }
// }

// export default ExcelConverter;