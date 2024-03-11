// Filename - components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";


const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Corrected variable name

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Here you can implement the logic to handle form submission, such as sending the data to the server for authentication
    // For demonstration purposes, let's assume the login is successful and redirect to the homepage
    // Replace this with your actual authentication logic
    if (email === 'abc@abc.com' && password === '1234') {
      // Call the setIsLoggedIn function to update the login status
      setIsLoggedIn(true); // Set login status to true
      // Redirect to the homepage after successful login
      navigate('/'); // Redirect to the homepage
    } else {
      // Handle authentication failure
      alert('Invalid email or password');
    }
  };
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the "Register" component
  };

  

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div >
            <p>Don't Have an Account? <a href="/Register" id="register">Register</a></p>
            {/* <button type="submit" onClick={handleRegisterClick} href="/Register">Register</button> */}
        </div>
        
      </form>
    </div>
  );
};

export default Login;
