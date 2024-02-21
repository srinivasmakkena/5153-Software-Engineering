import Layout from "./Layout";
import './App.css';
import React from 'react';
import "./styles.css";
import Home from "./components/Home";
import Services from "./components/Services";
import Location from "./components/Location";
import Login from './components/Login';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="Services" element={<Services/>}></Route>
        <Route path="Location" element={<Location/>}></Route>
        <Route path="Login" element={<Login/>}></Route>
      </Route>
    </Routes>  
  )
}
