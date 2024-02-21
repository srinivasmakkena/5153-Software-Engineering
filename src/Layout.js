import React from 'react'
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import {Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div className="App">
        <Navbar/>
        <Outlet></Outlet>
        <Footer/>
    </div>
  )
}

export default Layout