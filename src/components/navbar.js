  import React, { Component } from 'react';
  import { NavLink, Navigate, useNavigate} from 'react-router-dom';
  import "./Navbarstyles.css";
  import mainLogo from "./assets/logo1.png";


  class Navbar extends Component {
    constructor(props) {
      super(props);
      console.log(props); // Log the props object to the console
      this.state = {
        clicked: false,
        userName: props.customer ? props.customer.name : "prakash", // Initialize userName state to hold user's name
        showNotifications: false,
        hasUnreadNotifications: false,
        notifications: [], // Array to hold notifications with message and timestamp
      };
    }

    

    toggleNotifications = () => {
      console.log('Toggle notifications');
      this.setState(prevState => ({
        showNotifications: !prevState.showNotifications,
        hasUnreadNotifications: false, // Mark all notifications as read when opening the dropdown
        notifications: [], // Clear any existing notifications
      }));
      // Add a new notification message
      const newNotification = {
        message: "You are all caught up :)",
        timestamp: new Date().toLocaleString(), // Add timestamp for the message
      };
      this.setState({
        notifications: [newNotification], // Set the notifications array to contain only the new notification
      });
    }

    handleClick = () => {
      this.setState({ clicked: !this.state.clicked });
    }

    handleLogout = () => {
      const { setIsLoggedIn } = this.props;
      localStorage.setItem('loggedIn', 'false');
      setIsLoggedIn(false); // Call setIsLoggedIn to update login status to false
       // Clear customer data
      localStorage.setItem('customer',null);
      // Clear professional user data
      localStorage.setItem('proUser',null);// Clear customer data
      localStorage.removeItem('customer');
    
      // Clear professional user data
      localStorage.removeItem('proUser');
      
    }

    render() {
      const { clicked, showNotifications, hasUnreadNotifications, notifications } = this.state;
      const { isLoggedIn } = this.props;
      let {userName} = '';
      if (this.props.customer){
         userName  = this.props.customer.name;
      }
      console.log(this.state)
  


      return (
        <nav>
          <a href="/">
            <img src={mainLogo} width="161" height="55" viewBox="0 0 161 44" fill="none" alt="QuickLocalFix Logo" />
          </a>

          <div id="desktop" onClick={this.handleClick}>
            <i id="bar" className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
          <div>
            <ul id="navbar">
              <li><NavLink exact="true" to="/" activeclassname="active">Home</NavLink></li>
              <li>
                <NavLink to="/Services" activeclassname="active">
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/Location" activeclassname="active" >
                  Location
                </NavLink>
              </li>
              <li>
                <NavLink to="/Products" activeclassname="active" >
                  Products
                </NavLink>
              </li>
              <li>
                {isLoggedIn ? (
                  <div className="dropdown">
                    {/* Change to profile icon */}
                    <NavLink to="/Account" className="profile-icon" onClick={this.handleClick}>
                    <i className="fas fa-user"></i>
                    <div>{userName}</div>
                    </NavLink>
                    <div className={clicked ? 'dropdown-content show' : 'dropdown-content'}>
                      <NavLink to="/Account">Account</NavLink>
                      <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
                    </div>
                  </div>
                ) : (
                  <NavLink to="/Login">Login/Register</NavLink>
                )}
              </li>
              {isLoggedIn && (
                <>
                  <li className="dropdown">
                    <button className="notification-button" onClick={this.toggleNotifications}>
                      <i className={`fas ${hasUnreadNotifications ? 'fa-bell' : 'fa-bell-slash'}`}></i>
                    </button>
                    {showNotifications && (
                      <div className="dropdown-content">
                        {notifications.map((notification, index) => (
                          <div key={index} className="notification-item">
                            <p>{notification.message}</p>
                            <p>{notification.timestamp}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                  {/* </li> Add shopping cart icon */}
                  <li className="dropdown">
                    <NavLink to="/ShoppingCart">
                      <i className="fas fa-shopping-cart"></i>
                    </NavLink>
                  </li>
              </>
              )}
            </ul>
          </div>
        </nav>
      );
    }
  }

  export default Navbar;
