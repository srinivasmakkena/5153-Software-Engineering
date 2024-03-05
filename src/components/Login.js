// Filename - components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


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
      
      // Redirect to the homepage
      setIsLoggedIn = true;
      navigate('/'); // Redirect to the homepage after successful login
    } else {
      // Handle authentication failure
      alert('Invalid email or password');
    }
  };
  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the "Register" component
  };

  

  return (
    <div>
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
        <div>
            <label>Don't Have an Account?</label>
        </div>
        <button type="button" onClick={handleRegisterClick} href="/Register">Register</button>
      </form>
    </div>
  );
};

export default Login;
