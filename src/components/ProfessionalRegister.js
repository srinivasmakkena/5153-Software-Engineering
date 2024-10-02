import React, { useState, useEffect } from "react";
import "./Registerstyles.css";
import { useNavigate } from 'react-router-dom';
import registrationImage from './assets/pro-registration-img.png'; // Import your registration image here

function ProRegister() {
    const [user_name, setUserName] = useState();
    const [password, setPassword] = useState();
    const [confirm_password, setConfirmPassword] = useState();
    const [phone_number, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [zip_code, setZipCode] = useState();
    const [price_per_hour, setPricePerHour] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
	const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//get_categories/');
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = (setState) => (e) => {
        setState(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm_password) {
            setErrorMessage('Password and confirm password didn\'t match.');
            return;
        }
    
        try {
            const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//professional_register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_name,
                    password,
                    phone_number,
                    email,
                    zip_code,
                    price_per_hour,
                    category
                })
            });
    
            if (response.ok) {
                const data = await response.json();
    
                if (data.success) {
                    setMessage(data.success + " Redirecting to login page...");
                    setErrorMessage("");
                    setTimeout(() => {
                        navigate('/ProfessionalLogin');
                    }, 3000);
                } else {
                    setErrorMessage(data.error);
                }
            } else {
                setErrorMessage('Failed to register. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };
    

    const handleLoginClick = () => {
        navigate('/ProfessionalLogin');
    };

    return (
        <div className='register-container'>
            <div className='registration-content'>
                <div className='registration-image'>
                    <img src={registrationImage} alt="Registration" />
                </div>
                <div className='registration-form'>
                    <h2>Professional Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="user_name" style={{ display: "none" }}>User Name:</label>
                            <input
                                type="text"
                                id="user_name"
                                name="user_name"
                                placeholder="User Name"
                                value={user_name}
                                onChange={handleChange(setUserName)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="phone_number" style={{ display: "none" }}>Phone Number:</label>
                            <input
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={phone_number}
                                onChange={handleChange(setPhoneNumber)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" style={{ display: "none" }}>Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange(setEmail)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="zip_code" style={{ display: "none" }}>Zip Code:</label>
                            <input
                                type="text"
                                id="zip_code"
                                name="zip_code"
                                placeholder="Zip Code"
                                value={zip_code}
                                onChange={handleChange(setZipCode)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price_per_hour" style={{ display: "none" }}>Price Per Hour:</label>
                            <input
                                type="text"
                                id="price_per_hour"
                                name="price_per_hour"
                                placeholder="Price Per Hour"
                                value={price_per_hour}
                                onChange={handleChange(setPricePerHour)}
                                required
                            />
                        </div>
                     
                        <div>
                            <label htmlFor="password" style={{ display: "none" }}>Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handleChange(setPassword)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm_password" style={{ display: "none" }}>Password:</label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                value={confirm_password}
                                onChange={handleChange(setConfirmPassword)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="category" style={{ display: "none" }}>Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={category}
                                onChange={handleChange(setCategory)}
                                required
								className="custom-select"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit">Register</button>
                        {errorMessage && <p style={{color:"red"}}>** {errorMessage} **</p>}
					    {message && <p style={{color:"green"}}>{message}</p>}
                    {/* <button type="button" onClick={handleLoginClick}>Go to Login</button> */}
                        <div >
                <p>Already Have an Account? <a href="/ProfessionalLogin" id="login">Login</a></p>
            </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProRegister;
