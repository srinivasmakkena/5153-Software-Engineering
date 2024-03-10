// Filename: components/navbar.js
import React, { Component } from 'react';
import "./Navbarstyles.css";
import mainLogo from "./assets/logo1.png";
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      userName: "Prakash" // Initialize userName state to hold user's name
    };
  }

  componentDidMount() {
    // Perform any login status check when the component mounts
    // For example, check local storage for login status
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    if (userLoggedIn && userName) {
      // If user is logged in, set isLoggedIn to true and fetch user's name from local storage
      this.setState({
        isLoggedIn: true,
        userName: userName
      });
    }
  }

  handleLogin = () => {
    // Perform login logic (e.g., validate credentials, fetch user data)
    
    // For example purposes, simply setting isLoggedIn and userName to true
    this.setState({
      isLoggedIn: true,
      userName: "John Doe" // Replace with actual user name from login data
    });
    // Store login status in local storage
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', "John Doe");
  }

  handleLogout = () => {
    // Perform logout logic (e.g., clear user data, reset login status)
    // For example purposes, simply setting isLoggedIn and userName to false
    this.setState({
      isLoggedIn: false,
      userName: ""
    });
    // Clear login status from local storage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  }

  render() {
    const { clicked, userName } = this.state;
    const { isLoggedIn } = this.props;
    console.log('isLoggedIn in Navbar:', isLoggedIn); // Add this line for logging
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
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/Services" activeClassName="active">Services</NavLink></li>
            <li><NavLink to="/Location" activeClassName="active">Location</NavLink></li>
            {/* Conditionally render either "Account" or "Login/Register" based on isLoggedIn state */}
            <li>
              {isLoggedIn ? (
                <div className="dropdown">
                  <NavLink to="/Account" className="username" onClick={this.handleClick}>{userName}</NavLink>
                  <div className={clicked ? 'dropdown-content show' : 'dropdown-content'}>
                    <NavLink to="/Account">Account</NavLink>
                    <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
                  </div>
                </div>
              ) : (
                <NavLink to="/Login">Login/Register</NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
