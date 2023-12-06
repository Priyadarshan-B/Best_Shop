import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/dashboard";
import Inventory from "./components/Inventory/inventory";
import Enquiries from "./components/Enquiries/enquiries";
import StockPage from "./components/Pages/StockPage/StockPage";
import ProductDashboard from "./components/Products/ProductDashboard";
import AddStocks from "./components/add_product";
import Master from "./components/Master/master";
import Master_Box from "./components/Master/master_category";
import CategoryTable from "./components/Tables/category_table";
import FieldTable from "./components/Tables/field_table";
import DetailTable from "./components/Tables/detail_table";
import AddFieldDetailsForm from "./components/Master/fromfieldadd";

const App = () => {
  return (
    <Router>
        <Routes>
        <Route path='/' exact Component ={Login}/>
          <Route path='/login' exact Component ={Login}/>
          <Route path='/dashboard' Component ={Dashboard}/>
          <Route path="inventory" Component={Inventory}/>
          <Route path="/enquiries" Component={Enquiries}/>
          <Route path="/stocks" Component={StockPage}/>
          <Route path="/addStock" Component={AddStocks}/>
          <Route path="/productdashboard" Component={ProductDashboard} />
          <Route path="/master" Component={Master} />
          <Route path="/masterbox" Component={Master_Box} />
          <Route path="/categorytable" Component={CategoryTable} />
          <Route path="/fieldtable" Component={FieldTable} />
          <Route path="/detailtable" Component={DetailTable} />
          <Route path="/addfieldform" Component={AddFieldDetailsForm} />


        </Routes>
    </Router>
  );
};
export default App;