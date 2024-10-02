import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Customer } from '../App';
import loginImage from './assets/login-image.jpg'; // Import your login image here

const Login = ({ setIsLoggedIn,customer,   setCustomer, cartItems, setCartItems  }) => {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Corrected variable name
  
const fetchCartDetails = async (customer) => {
  try {
    console.log(customer,"inside login")
    if (!customer || !customer.id) {
      return;
    }
    const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//get_cart/?customer_id=${customer.id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart details');
    }
    const data = await response.json();
    console.log("called fecth cart details from login",data);
    if (data.cart_items){
      setCartItems(data.cart_items);}
     else {
      setCartItems([]);
      }
  } catch (error) {
    console.error('Error fetching cart details:', error);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // console.log('User Name:', user_name);
    // console.log('Password:', password);
    try {
        // Send a POST request to the server with email and password in the request body
        const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'user_name': user_name, 'password':password }), 
        });

        if (response.ok) {
            const data = await response.json(); // Parse the JSON response
            
            if (data.success) {
                localStorage.setItem('loggedIn', 'true');
                const user = data.customer;
                const customer = new Customer(user.id, user.user_name, user.email, user.phone_number);
                localStorage.setItem('customer', JSON.stringify(customer));
                setCustomer(customer);
                setIsLoggedIn(true); // Set login status to true
                fetchCartDetails(customer);
                console.log(data,"From login");
                
                navigate('/'); // Redirect to the homepage
            } else {
                // Handle authentication failure
                setErrorMessage('Authentication failed. Please check your credentials.');
            }
        } else {
            // Handle HTTP errors
            setErrorMessage('Failed to login. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle other errors
        setErrorMessage('An error occurred. Please try again later.');
    }
};

  return (
    <div className='login-container'>
      <div className="login-content">
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="login-form">
          <u><h2>Login</h2></u>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message" style={{color:"red"}}>*{errorMessage}*</div>}
            <div>
              <label htmlFor="user_name" style={{ display: 'none' }}>User Name:</label>
              <input
                type="text"
                id="user_name"
                placeholder="User Name"
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
                required
                style={{ width: '80%' }}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ display: 'none' }}>Password:</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                
              />
            </div>
            <button type="submit">Login</button>
            <div >
                <p>Don't Have an Account? <a href="/Register" id="register">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
