// Filename - components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Corrected variable name

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Here you can implement the logic to handle form submission, such as sending the data to the server for authentication
    // For demonstration purposes, let's assume the login is successful and redirect to the homepage
    // Replace this with your actual authentication logic
    if (email === 'abc@example.com' && password === 'edotinokkehe') {
      
      // Redirect to the homepage
      navigate('/'); // Redirect to the homepage after successful login
    } else {
      // Handle authentication failure
      alert('Invalid email or password');
    }
  };
  const handleRegisterClick = () => {
    navigate('/ProfessionalRegister'); // Navigate to the "Register" component
  };

  

  return (
    <div>
      <h2>Professional Login</h2>
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
        <button type="button" onClick={handleRegisterClick} href="/ProfessionalRegister">Professional Register</button>
      </form>
    </div>
  );
};

export default ProLogin;
