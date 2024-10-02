import React, { useState } from "react";
import "./Registerstyles.css";
import { useNavigate } from 'react-router-dom';
import { Customer } from '../App';
import registrationImage from './assets/registration-image.png'; // Import your registration image here

function Register() {
	const [user_name, setUserName]=useState();
	const [email, setEmail]=useState();
	const [password, setPassword]=useState();
	const [phone_number, setPhoneNumber]=useState();
	const [confirmPassword, setConfirmPassword]=useState();
	const [errorMessage, setErrorMessage] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate(); // Corrected variable name

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password === confirmPassword){
			try {
				const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//register/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						"user_name":user_name,
						"password":password,
						"phone_number":phone_number,
						"email":email,
					})
				});
				
				if (response.ok) {
					const data = await response.json();
	
					if (data.success) {
						setMessage(data.success + " Redirecting to login page..."); // Display success message
						setErrorMessage("")
						setTimeout(() => {
							navigate('/Login'); // Redirect to the login page after some time
						}, 3000);
					} else {
						setErrorMessage(data.error); // Display error message
					}
					
					// console.log(data);
				} else {
					// Handle HTTP errors
					setErrorMessage('Failed to register. Please try again later.');
				}
			}
			catch (error) {
				console.error('Error:', error);
				// Handle other errors
				setErrorMessage('An error occurred. Please try again later.');
			}
		}
		else {
			setErrorMessage('Password and confirm password didn\'t match.');
		}
	};

	return (
		<div className="register-container">
			<div className="registration-content">
				<div className="registration-image">
					<img src={registrationImage} alt="Registration" />
				</div>
				
				<div className="registration-form">
					<u><h2>Register</h2></u>
					<form method="post" action="https://quicklocalfixapi.pythonanywhere.com//register" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="user_name" style={{ display: 'none' }}>User Name:</label>
							<input 
								type="text" 
								id="user_name" 
								name="user_name" 
								placeholder="User Name"
								value={user_name} 
								onChange={(e) => setUserName(e.target.value)}
								required 
							/>
						</div>
						<div>
							<label htmlFor="email" style={{ display: 'none' }}>Email:</label>
							<input 
								type="email" 
								id="email" 
								name="email" 
								placeholder="Email"
								value={email} 
								onChange={(e) => setEmail(e.target.value)}
								required 
							/>
						</div>
						<div>
							<label htmlFor="password" style={{ display: 'none' }}>Password:</label>
							<input 
								type="password" 
								id="password" 
								name="password" 
								placeholder="Password"
								value={password} 
								onChange={(e) => setPassword(e.target.value)}
								required 
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword" style={{ display: 'none' }}>Confirm Password:</label>
							<input 
								type="password" 
								id="confirmPassword" 
								name="confirmPassword" 
								placeholder="Confirm Password"
								value={confirmPassword} 
								onChange={(e) => setConfirmPassword(e.target.value)}
								required 
							/>
						</div>
						<div>
							<label htmlFor="phone_number" style={{ display: 'none' }}>Phone Number:</label>
							<input 
								type="text" 
								id="phone_number" 
								name="phone_number" 
								placeholder="Phone Number"
								value={phone_number} 
								onChange={(e) => setPhoneNumber(e.target.value)}
								required 
							/>
						</div>
						<button type="submit">Register</button>
					</form>
					{errorMessage && <p style={{color:"red"}}>** {errorMessage} **</p>}
					{message && <p style={{color:"green"}}>{message}</p>}
					<div >
                <p>Already Have an Account? <a href="/Login" id="login">Login</a></p>
            </div>
				</div>
			</div>
		</div>
	);
}
export default Register;
