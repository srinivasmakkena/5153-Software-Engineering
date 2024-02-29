// Filename: components/navbar.js
import React, { Component } from 'react';
import "./Navbarstyles.css";
import mainLogo from "./assets/logo1.png";
import { Link } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      isLoggedIn: false // Initially set to false, assuming user is not logged in
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    const { clicked, isLoggedIn } = this.state;
    return (
      <nav>
        <div id="desktop" onClick={this.handleClick}>
          <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <a href="/">
          <img src={mainLogo} width="161" height="55" viewBox="0 0 161 44" fill="none" alt="QuickLocalFix Logo" />
        </a>
        <div>
          <ul id="navbar">
            <li><a className="active" href="/">Home</a></li>
            <li><a href="/Services">Services</a></li>
            <li><a href="/Location">Location</a></li>
            {/* Conditionally render either "Account" or "Login/Register" based on isLoggedIn state */}
            <li>
              {isLoggedIn ? (<Link to="/Account">Account</Link>) : (<Link to="/Login">Login/Register</Link>)}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
