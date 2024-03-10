import Layout from "./Layout";
import './App.css';
import React, {useState} from 'react';
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



export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Corrected state initialization
  console.log('isLoggedIn in App:', isLoggedIn); // to check the isLoogedIn value in App.js whether it is being passed correctly or not
  return (
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn}/>}>
          <Route index element={<Home/>}></Route>
          <Route path="Login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="Services" element={<Services/>}></Route>
          <Route path="Location" element={<Location/>}></Route>
          <Route path="Register" element={<Register/>}></Route>
          <Route path="ProfessionalLogin" element={<ProfessionalLogin/>}></Route>
          <Route path="ProfessionalRegister" element={<ProfessionalRegister/>}></Route>
          <Route path="Account" element={<Account/>}></Route>
        </Route>
      </Routes> 
  )
};
