// AddressSelectionPage.js
import React, { useState, useEffect } from 'react';
import "./AddressSelection.css";
import creditCardImage from './assets/creditCardImage2.png'
const AddressSelectionPage = ({ customer, setCustomer }) => {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const [paymentData, setPaymentData] = useState({
    card_number: '',
    card_holder_name: '',
    expiration_date: '',
    cvv: ''
  });
  const [expandForm, setExpandForm] = useState(false); // State to control form expansion
  const [expandPaymentForm, setExpandPaymentForm] = useState(false); // State to control payment form expansion

  useEffect(() => {
    fetchAddresses();
  }, []);

  useEffect(() => {
    if (!customer) {
      const storedCustomer = JSON.parse(localStorage.getItem('customer'));
      setCustomer(storedCustomer);
      if (storedCustomer && storedCustomer.id) {
        customer = storedCustomer;
      }
    }
  }, [customer]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//get_address/?customer_id=${customer.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch addresses');
      }
      const data = await response.json();
      setAddresses(data.addresses);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData['customer_id'] = customer.id;
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//add_address/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Failed to add address');
      }
      fetchAddresses(); // Refresh addresses after adding a new one
      setExpandForm(false); // Collapse the form after submission
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming customer is available and contains user_id field
      paymentData['customer_id'] = customer.id;
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//add_payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      if (!response.ok) {
        throw new Error('Failed to add payment');
      }
      // Handle success as needed
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return ''; // Return empty string if cardNumber is undefined or null
  
    // Remove non-digit characters
    const digitsOnly = cardNumber.replace(/\D/g, '');
  
    // Add a space after every four digits
    return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
  };

  return (
    <div className="address-selection-page">
      <h2>Select Address</h2>
      <div className="address-list-container">
        <table className="address-list">
          <tbody>
            {addresses.length > 0 ? (
              addresses.map(address => (
                <tr key={address.id}>
                  <td>
                    <input type="radio" id={`address-${address.id}`} name="address" value={address.id} />
                  </td>
                  <td>
                    <label htmlFor={`address-${address.id}`}>{address.street_address}, {address.city}, {address.country}</label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="no-addresses-message">No addresses</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="add-address-form">
        <button className="toggle-form-btn" onClick={() => setExpandForm(!expandForm)}>Add New Address</button>
        {expandForm && (
          <form className="expandable-form" onSubmit={handleSubmit}>
            {/* Address fields */}
            <input type="text" name="street_address" placeholder="Street Address" value={formData.street_address} onChange={handleInputChange} required maxLength={100} />
            <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleInputChange} required maxLength={100} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleInputChange} required maxLength={100} />
            <input type="text" name="postal_code" placeholder="Postal Code" value={formData.postal_code} onChange={handleInputChange} required maxLength={100} />
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} required maxLength={100} />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      <div className="add-payment-form">
        <button className="toggle-form-btn" onClick={() => setExpandPaymentForm(!expandPaymentForm)}>Add Payment</button>
        {expandPaymentForm && (
          <form className="expandable-form" onSubmit={handlePaymentSubmit}>
            <div className="credit-card">
              <img  className="credit-card-image" src={creditCardImage} alt="Credit Card" />
              <input type="text" name="card_number" className="credit-card-input card-number" placeholder="Card Number"  value={formatCardNumber(paymentData.card_number)} onChange={handlePaymentInputChange} required maxLength={19} />
              <input type="text" name="card_holder_name" className="credit-card-input card-holder-name" placeholder="Card Holder Name" value={paymentData.card_holder_name} onChange={handlePaymentInputChange} required maxLength={255} />
              <input type="text" name="expiration_date" className="credit-card-input expiration-date" placeholder="MM/YY" value={paymentData.expiration_date} onChange={handlePaymentInputChange} required />
              <input type="text" name="cvv" className="credit-card-input cvv" placeholder="CVV" value={paymentData.cvv} onChange={handlePaymentInputChange} required maxLength={4} />
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddressSelectionPage;
