import Layout from "./Layout";
import './App.css';
import React, {useState, useEffect, useCallback} from 'react';
import "./styles.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Location from "./components/Location";
import Services from "./components/Services";
import {Routes, Route} from 'react-router-dom';
import Register from "./components/Register";
import ProfessionalLogin from "./components/ProfessionalLogin";
import ProfessionalRegister from "./components/ProfessionalRegister";
import Account from "./components/Account";
import Products from "./components/Products";
import Unauthorized from "./components/Unauthorized";
import Professinals from "./components/Professinals";
import Dashboard from "./components/Dashboard";
import CartPage from "./components/Cart";
import AddressSelectionPage from "./components/AddressSelectionPage ";
import View from "./components/view";
import BookingCalander from "./components/BookingCalender";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export class Customer {
  constructor(id, name, email,phone_number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone_number = phone_number;
  }
}

export class Professional {
  constructor(id, name, phone_number, email,zip_code, price_per_hour,category) {
    this.id = id;
    this.user_name = name;
    this.phone_number = phone_number;
    this.email = email;
    this.zip_code = zip_code;
    this.price_per_hour = price_per_hour;
    this.category = category;
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Corrected state initialization
  const [customer, setCustomer] = useState(null);
  const [ProUser, setProUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const fetchCartDetails = useCallback(async () => {
    try {
      if (!customer || !customer.id) {
        return; // Ensure customer is valid before making the request
      }

      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com/get_cart/?customer_id=${customer.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart details');
      }

      const data = await response.json();
      if (data.cart_items) {
        setCartItems(data.cart_items); // Set cart items if they exist
      } else {
        setCartItems([]); // Set empty array if no cart items
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  }, [customer, setCartItems]);
  // console.log('isLoggedIn in App:', isLoggedIn); // to check the isLoogedIn value in App.js whether it is being passed correctly or not
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    setIsLoggedIn(isLoggedIn);
    // console.log('local storage'+isLoggedIn)
    const storedCustomer = localStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    }
    const storedProUser = localStorage.getItem('proUser');
    if (storedProUser) {
      setProUser(JSON.parse(storedProUser));
    }
    const location_data = localStorage.getItem('location');
    if (location_data) {
      setLocation(JSON.parse(location_data));
    }
    
    fetchCartDetails();
    
  }, [fetchCartDetails]);
  

  
  return (
    <>
      <Routes>
        <Route
        path="/"
        element={(
          <Layout
            isLoggedIn={isLoggedIn}
            customer={customer}
            setIsLoggedIn={setIsLoggedIn}
            ProUser={ProUser}
            setCustomer={setCustomer}
            setProUser={setProUser}
            location={location}
            setLocation={setLocation}
            cartItems = {cartItems}
            setCartItems = {setCartItems}
          />
        )}
      >
          <Route index element={<Home/>}></Route>
          <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} customer={customer} setCustomer={setCustomer} cartItems = {cartItems} setCartItems = {setCartItems} />}/>
          <Route path="Services" element={isLoggedIn ?<Services location = {location}/> : <Unauthorized/>}></Route>
          <Route path="Location" element={isLoggedIn ?<Location/> : <Unauthorized/>}></Route>
          <Route path="Products" element={isLoggedIn ?<Products customer={customer} ProUser={ProUser}  cartItems = {cartItems} setCartItems={setCartItems}/> : <Unauthorized/>}></Route>
          <Route path="ShoppingCart" element={isLoggedIn ?<CartPage customer={customer} ProUser={ProUser}    setglobalCartItems = {setCartItems}/> : <Unauthorized/>}></Route>
          <Route path="Register" element={<Register/>}></Route>
          <Route path="Dashboard" element={<Dashboard  ProUser={ProUser} setProUser={setProUser}/>}></Route>
          <Route path="ProfessionalLogin" element={<ProfessionalLogin setIsLoggedIn={setIsLoggedIn} setProUser={setProUser}/>}></Route>
          <Route path="ProfessionalRegister" element={<ProfessionalRegister />}></Route>
          <Route path="AddressSelection" element={<AddressSelectionPage customer={customer}  setCustomer={setCustomer} setCartItems={setCartItems}/>} />
          <Route path="Account" element={isLoggedIn ? <Account customer={customer} setCustomer={setCustomer} ProUser={ProUser}/> : <Unauthorized/>}></Route>
          <Route path="professional/:id" element={<View customer={customer}/>} />
          <Route path="booking/:id" element={<BookingCalander customer={customer} />} />
          <Route path="categories/:categoryId" element={<Professinals location={location} />} />
        </Route>
      </Routes> 
      <ToastContainer />
      </>
  )
};