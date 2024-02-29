import React from 'react'
import Footer from "./components/Footer";
import {Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
const Layout = () => {
  return (
    <div className="App">
        <Navbar />
        <Outlet></Outlet>
        <Footer/>
    </div>
  )
}

export default Layout