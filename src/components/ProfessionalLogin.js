// Filename - components/ProLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"; // Import styles for Professional Login component
import loginImage from './assets/pro-login-image.png';
import { Professional,Customer } from '../App';

const ProLogin = ({ setIsLoggedIn, setProUser , setCustomer}) => {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Corrected variable name

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // console.log('Password:', password);
    try {
      // Send a POST request to a different URL for professional login
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//professional_login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  'user_name': user_name, 'password': password }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        // console.log(data);
        if (data.success) {
          setIsLoggedIn(true); // Set login status to true
          navigate('/'); // Redirect to the homepage
          localStorage.setItem('loggedIn', 'true');
          const user = data.professional;
          const proUser = new Professional(user.id,user.user_name,user.phone_number,user.email,user.zip_location,user.price_per_hour,user.categories_of_repairs);
          localStorage.setItem('proUser', JSON.stringify(proUser));
          // const customer = new Customer(user.id, user.user_name, user.email, user.phone_number);
          // localStorage.setItem('customer', JSON.stringify(customer)); 
          if (proUser)
            setProUser(proUser);
          // setCustomer(customer);

        } else {
          // Handle authentication failure
          setErrorMessage('Invalid email or password');
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

  const handleRegisterClick = () => {
    navigate('/ProfessionalRegister'); // Navigate to the "Register" component
  };

  return (
    <div className='login-container'>
      <div className="login-content">
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
        <div className="login-form">
          <h2>Professional Login</h2>
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
            <div>
              <p>Don't Have an Account?<a id="register" href="/ProfessionalRegister"> Professional Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProLogin;
