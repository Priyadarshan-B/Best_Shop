import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import './App.css';
import Login from "./components/Login/login";
import Dashboard from "./components/Dashboard/dashboard";
import Inventory from "./components/Inventory/inventory";
import Enquiries from "./components/Enquiries/enquiries";
import StockPage from "./components/Pages/StockPage/StockPage";
import ProductDashboard from "./components/Products/ProductDashboard";
import DashboardWrapper from "./components/Dashboard/dashboard";
import AddStocks from "./components/add_product";
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
        </Routes>
    </Router>
  );
};
export default App;