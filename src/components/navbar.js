// Filename: components/navbar.js
import React, { Component } from 'react';
import "./Navbarstyles.css";
import mainLogo from "./assets/logo1.png";
import { Link } from 'react-router-dom';
import "./Account";

class Navbar extends Component {
  state = {
    clicked: false,
    isLoggedIn: false // Initially set to false, assuming user is not logged in
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  // Function to handle logout
  handleLogout = () => {
    // Perform logout logic here
    // For example, clear user session, remove tokens, etc.
    // Then update isLoggedIn state to false
    this.setState({ isLoggedIn: false });
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
            {/* Conditionally render either "Login/Register" or "Profile" based on isLoggedIn state */}
            <li>
              {isLoggedIn ? (
                <Link to="/Account">Account</Link>
              ) : (
                <a href="/Login">Login/Register</a>
              )}
            </li>
            {/* Conditionally render "Logout" button if user is logged in */}
            {isLoggedIn && (
              <li><button onClick={this.handleLogout}>Logout</button></li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
