// export default ProductDashboard;
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

// Function to create rows based on API data
const createRowFromApiData = (apiData) => {
  return apiData.map((item) => {
    return {
      category_name: item.category_name,
      field_details_name: item.field_details_name,
      price: item.price,
      quantity: item.quantity,
      stock_id: item.stock_id,
      stock_name: item.stock_name,
      time_added: item.time_added,
      date_added: item.date_added,
    };
  });
};

function Row(props) {
  const { row } = props;
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
        {/* <TableCell component="th" scope="row">
        {row.stock_id}
          
        </TableCell> */}
        <TableCell component="th" scope="row">
          {row.category_name}
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
                    <TableCell align="right">
                      <h3>Date</h3>
                    </TableCell>
                    <TableCell align="right">
                      <h3>Time</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.map((row) => (
                    <TableRow key={row}>
                      <TableCell>{row.stock_name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.date_added}</TableCell>
                      <TableCell align="right">{row.time_added}</TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}

                <TableBody>
                  <TableRow key={row.stock_id}>
                    <TableCell>{row.stock_name}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">{row.date_added}</TableCell>
                    <TableCell align="right">{row.time_added}</TableCell>
                  </TableRow>
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
  row: PropTypes.shape({
    category_name: PropTypes.string.isRequired,
    field_details_name: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    stock_id: PropTypes.number.isRequired,
    stock_name: PropTypes.string.isRequired,
    time_added: PropTypes.string.isRequired,
    date_added: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiHost}/stocks`);
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
                  {/* <TableCell><h2>Item No</h2></TableCell> */}
                  <TableCell>
                    <h2>Product Name</h2>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.category_name} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
