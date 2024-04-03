import React from 'react'
import Footer from "./components/Footer";
import {Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import "./Layout.css";
const Layout = ({ isLoggedIn, customer, setIsLoggedIn, ProUser, setCustomer, setProUser, location, setLocation, children}) => {
  console.log('isLoggedIn in Layout:', isLoggedIn,customer,setIsLoggedIn,ProUser); // Add this line
  return (
    <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} customer={customer} ProUser={ProUser} setCustomer={setCustomer} setProUser = {setProUser}  location={location} setLocation = {setLocation}/>
        <div className="content-container">
          <Outlet></Outlet> 
        </div>
        
        <Footer/>
    </div>
  )
}

export default Layout