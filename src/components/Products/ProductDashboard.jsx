import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import apiHost from "../../utils/api";
import HorizontalNavbar from "../Horizontal_Navbar/horizontal_navbar";
import VerticalNavbar from "../Vertical_Navbar/vertical_navbar";
import "../Products/ProductDashboard.css";
import { Replay10TwoTone } from "@mui/icons-material";

// Function to create rows based on nested JSON data
const createRowFromApiData = (jsonData) => {
  let rows = [];
  for (const category in jsonData) {
    if (jsonData.hasOwnProperty(category)) {
      const categoryRow = {
        category_name: category,
        products: jsonData[category].map((item) => ({
          stock_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };
      rows.push(categoryRow);
    }
  }
  return rows;
};

function Row(props) {
  const { category } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {category.category_name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                <b>Details</b>
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <h3>Product Category</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Price</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Quantity</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.stock_name}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  category: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        stock_name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiHost}/product-name`);
        const jsonData = await response.json();
        const formattedRows = createRowFromApiData(jsonData);
        setRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <HorizontalNavbar />
      <div className="vandc-container">
        <VerticalNavbar />

        <div className="table-body">
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <h2>Product Name</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((category, index) => (
                  <Row key={index} category={category} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
