import React, { useState } from "react";
import "./Registerstyles.css";
import { useNavigate } from 'react-router-dom';


function ProRegister() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		mobileNumber: '',
		streetAddress: '',
		city: '',
		state: '',
		zipcode: ''
	  });
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: value
		}));
	  };
	
	  const handleSubmit = (e) => {
		e.preventDefault();
		// Add validation logic here
		console.log(formData); // For demonstration purposes, logs form data to console
		// Add logic to send form data to backend for registration
	  };
	  const navigate = useNavigate(); // Corrected variable name
	  const handleLoginClick = () => {
		navigate('/ProfessionalLogin'); // Navigate to the "Register" component
	  };
	
	  return (
		<div>
		  <h2>Professional Register</h2>
		  <form onSubmit={handleSubmit}>
			<div>
			  <label htmlFor="FirstName">First Name:</label>
			  <input 
				type="text" 
				id="firstName" 
				name="firstName" 
				value={formData.firstName} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="LastName">Last Name:</label>
			  <input 
				type="text" 
				id="lastName" 
				name="lastName" 
				value={formData.lastName} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="MobileNumber">Mobile Number:</label>
			  <input 
				type="text" 
				id="mobileNumber" 
				name="mobileNumber" 
				value={formData.mobileNumber} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="streetAddress">Street Address:</label>
			  <input 
				type="text" 
				id="streetAddress" 
				name="streetAddress" 
				value={formData.streetAddress} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="city">City:</label>
			  <input 
				type="text" 
				id="city" 
				name="city" 
				value={formData.city} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="state">State:</label>
			  <input 
				type="text" 
				id="state" 
				name="state" 
				value={formData.state} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="zipcode">Zipcode:</label>
			  <input 
				type="text" 
				id="zipcode" 
				name="zipcode" 
				value={formData.zipcode} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<button type="submit" onClick={handleLoginClick} href="/ProfessionalLogin">Register</button>
		  </form>
		</div>
		
	);
}
export default ProRegister;