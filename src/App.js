import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import Dashboard from "./components/Dashboard/dashboard";
import Inventory from "./components/Inventory/inventory";
import Enquiries from "./components/Enquiries/enquiries";
import ProductDashboard from "./components/Products/ProductDashboard";
import AddStocks from "./components/add_product";
import CategoryTable from "./components/Tables/category_table";
import FieldTable from "./components/Tables/field_table";
import DetailTable from "./components/Tables/detail_table";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Router>
        <Routes>
        <Route path='/' exact Component ={Login}/>
        <Route path='/signup' exact Component ={Signup}/>
        <Route path='/login' exact Component ={Login}/>
          <Route path='/dashboard' Component ={Dashboard}/>
          <Route path="inventory" Component={Inventory}/>
          <Route path="/enquiries" Component={Enquiries}/>
          <Route path="/addStock" Component={AddStocks}/>
          <Route path="/productdashboard" Component={ProductDashboard} />
          <Route path="/categorytable" Component={CategoryTable} />
          <Route path="/fieldtable" Component={FieldTable} />
          <Route path="/detailtable" Component={DetailTable} />



        </Routes>
        <ToastContainer />
    </Router>
  );
};
export default App;