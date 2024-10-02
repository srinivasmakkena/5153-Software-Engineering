    import React, { Component } from 'react';
    import { NavLink, Navigate, useNavigate} from 'react-router-dom';
    import "./Navbarstyles.css";
    import mainLogo from "./assets/logo1.png";


    class Navbar extends Component {
      constructor(props) {
        super(props);
        this.state = {
          clicked: false,
          userName: props.customer, // Initialize userName state to hold user's name
          showNotifications: false,
          hasUnreadNotifications: false,
          notifications: [], // Array to hold notifications with message and timestamp
          cartItemCount: 0, 
        };

      }
      
      toggleNotifications = () => {
        // console.log('Toggle notifications');
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
        // Clear customer data
        localStorage.setItem('customer',null);
        // Clear professional user data
        localStorage.setItem('proUser',null);// Clear customer data
        localStorage.removeItem('customer');
        // Clear professional user data
        localStorage.removeItem('proUser');
        localStorage.removeItem('location');
        this.props.setCustomer(null);
        this.props.setProUser(null);
        // this.props.setCartItems([]);
        setIsLoggedIn(false); // Call setIsLoggedIn to update login status to false
        
      }
      handleLocationInputChange = (event) => {
        const { setLocation } = this.props;
        const newLocation = event.target.value;
        localStorage.setItem('location',newLocation);
        // console.log(newLocation);
        setLocation(newLocation);
      }

      render() {
        const { clicked, showNotifications, hasUnreadNotifications, notifications, cartItemCount } = this.state;
        const { isLoggedIn } = this.props;
        const {location} = this.props;
        // console.log(this.props.cartItems);
        let {userName} = '';

        if (this.props.customer){
          userName  = this.props.customer.name;
        }
        if (this.props.ProUser){
          userName  = this.props.ProUser.user_name;
      } 
      console.log(this.props);
    
    

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
                
                {this.props.ProUser != null ? (
                  <>
                <li>
                <NavLink to="/DashBoard" activeclassname="active">
                    Dashboard
                  </NavLink>
                  </li>
                   <li>
                   {isLoggedIn ? (
                     <div className="dropdown">
                       {/* Change to profile icon */}
                       <i className="fas fa-user">&nbsp;<>{userName}</></i>
                       <div className={clicked ? 'dropdown-content show' : 'dropdown-content'}>
                         <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
                       </div>
                     </div>
                   ) : (
                     <NavLink to="/Login">Login/Register</NavLink>
                   )}
                 </li>
                 </>
                ):(<>
                  <li>
                  <NavLink to="/Services" activeclassname="active">
                    Services
                  </NavLink>
                </li>
                
                {/* <li>
                  <NavLink to="/Location" activeclassname="active" >
                    Location
                  </NavLink>
                </li> */}
                
                <li>
                  <NavLink to="/Products" activeclassname="active" >
                    Products
                  </NavLink>
                </li>
                <li>
                <div className="location-input">
                <i className="fa fa-map-marker-alt location-icon" aria-hidden="true"></i>
                <input
                      type="text"
                      id="location"
                      placeholder="zipcode"
                      value={location|| ''}
                      onChange={this.handleLocationInputChange}
                    />
                  </div>
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
                <li className="dropdown">
                      <NavLink to="/ShoppingCart">
                        <i className="fas fa-shopping-cart"></i>
                        {this.props.cartItems.length > 0 && <span className="cart-item-count">{this.props.cartItems.length}</span>}
                      </NavLink>
                    </li>
                </>
                )}
                
               
                {isLoggedIn && (
                  <>
                    {/* <li className="dropdown">
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
                    </li> */}
                    {/* </li> Add shopping cart icon */}
                   
                </>
                )}
              </ul>
            </div>
          </nav>
        );
      }
    }

    export default Navbar;
