import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import './Layout.css';

const Layout = ({
  isLoggedIn, customer, setIsLoggedIn, ProUser, setCustomer, setProUser, location, setLocation, cartItems}) => {
  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        customer={customer}
        ProUser={ProUser}
        setCustomer={setCustomer}
        setProUser={setProUser}
        location={location}
        setLocation={setLocation}
        cartItems={cartItems}
      />
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
