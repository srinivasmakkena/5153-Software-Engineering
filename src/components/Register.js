import React, { useState } from "react";
import "./Registerstyles.css";
import { useNavigate } from 'react-router-dom';


function Register() {
	// const [formData, setFormData] = useState({
	// 	firstName: '',
	// 	lastName: '',
	// 	mobileNumber: '',
	// 	streetAddress: '',
	// 	city: '',
	// 	state: '',
	// 	zipcode: ''
	//   });
	const [formData, setFormData] = useState();
	const [user_name, setUserName]=useState();
	const [email, setEmail]=useState();
	const [password, setPassword]=useState();
	const [phone_number, setPhoneNumber]=useState();
	const [confirmPassword, setConfirmPassword]=useState();

	 

	  const [message, setMessage] = useState('');
	
	  const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prevState => ({
		  ...prevState,
		  [name]: value
		}));
	  };
	
	  const handleSubmit = async (event) => {
		event.preventDefault();
		// Add validation logic here
		// const formData = {
		// 	user_name: event.target.user_name.value,
		// 	password: event.target.password.value,
		// 	email: event.target.email.value,
		// 	phone_number: event.target.phone_number.value
		//   };
		const formData = {"user_name":{user_name}, "password":{password}, "email":{email}, "phone_number":{phone_number} };
    	const response = await fetch('http://localhost:8000/register/', {method: 'POST',headers: {
			'Content-Type': 'application/json'
		  },
		  body: formData});// Add logic to send form data to backend for registration
		
		console.log(formData); // For demonstration purposes, logs form data to console
		
		const data = await response.json();

		if (response.ok) {
		setMessage(data.Success); // Display success message
		} else {
		setMessage(data.error); // Display error message
		}
		
		console.log(message);
	  };
	  const navigate = useNavigate(); // Corrected variable name
	  const handleLoginClick = () => {
		navigate('/Login'); // Navigate to the "Register" component
	  };
	
	  return (
		<div className="register-container">
		  <h2>Register</h2>
		  <form method="post" action="http://localhost:8000/register" onSubmit={handleSubmit}>
		  <div>
			  <label htmlFor="user_name">User Name:</label>
			  <input 
				type="text" 
				id="user_name" 
				name="user_name" 
				value={user_name} 
				onChange={handleChange} 
				required 
			  />
			</div>
			{/* <div>
			  <label htmlFor="firstName">First Name:</label>
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
			  <label htmlFor="lastName">Last Name:</label>
			  <input 
				type="text" 
				id="lastName" 
				name="lastName" 
				value={formData.lastName} 
				onChange={handleChange} 
				required 
			  />
			</div> */}

			<div>
			  <label htmlFor="email">Email:</label>
			  <input 
				type="email" 
				id="email" 
				name="email" 
				value={email} 
				onChange={handleChange} 
				required 
			  />
			</div>

			<div>
			  <label htmlFor="password">Password:</label>
			  <input 
				type="password" 
				id="password" 
				name="password" 
				value={password} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="confirmPassword">Confirm Password:</label>
			  <input 
				type="password" 
				id="confirmPassword" 
				name="confirmPassword" 
				value={confirmPassword} 
				onChange={handleChange} 
				required 
			  />
			</div>
			<div>
			  <label htmlFor="phone_number">Phone Number:</label>
			  <input 
				type="text" 
				id="phone_number" 
				name="phone_number" 
				value={phone_number} 
				onChange={handleChange} 
				required 
			  />
			</div>
			{/* <div>
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
			</div> */}
			{/* <button type="submit" onClick={handleLoginClick} href="/Login">Register</button> */}
			<button type="submit" onClick={handleSubmit}>Register</button>
		  </form>
		  {message && <p>{message}</p>}
		</div>
		
	);
}
export default Register;