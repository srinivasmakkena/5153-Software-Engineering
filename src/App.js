import Layout from "./Layout";
import './App.css';
import React from 'react';
import "./styles.css";
import Home from "./components/Home";
import SignupLogin from './components/SignupLogin';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}></Route>
        <Route path="SignupLogin" element={<SignupLogin/>}></Route>
      </Route>
    </Routes>  
  )
}
