import React, { useState } from 'react';
import creditCardImage from './assets/creditCardImage2.png';

const PaymentForm = ({ customer, setCustomer, fetchPayments }) => {
  const [expandPaymentForm, setExpandPaymentForm] = useState(false);
  const [paymentData, setPaymentData] = useState({
    card_number: '',
    card_holder_name: '',
    expiration_date: '',
    cvv: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handlePaymentInputChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming customer is available and contains user_id field
      paymentData['customer_id'] = customer.id;
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//add_payment_option/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      // console.log(response);
      if (!response.ok) {
        throw new Error('Failed to add payment');
      }
      // Handle success as needed
      fetchPayments();
      // Reset form data
      setPaymentData({
        card_number: '',
        card_holder_name: '',
        expiration_date: '',
        cvv: ''
      });
      // Close the form
      setExpandPaymentForm(false);
      // Clear any previous error message
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding payment:', error);
      // Set error message
      setErrorMessage('Failed to add payment. Please try again.');
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
    <div className="add-payment-form">
      <button className="toggle-form-btn" style={{ backgroundColor: expandPaymentForm ? "red" : "green" }} onClick={() => setExpandPaymentForm(!expandPaymentForm)}>{expandPaymentForm && "Close "}Add Payment</button>
      {expandPaymentForm && (
        <form className="expandable-form" onSubmit={handleSubmit}>
          <div className="credit-card">
            <img className="credit-card-image" src={creditCardImage} alt="Credit Card" />
            <input type="text" name="card_number" className="credit-card-input card-number" placeholder="Card Number" value={formatCardNumber(paymentData.card_number)} onChange={handlePaymentInputChange} required maxLength={19} />
            <input type="text" name="card_holder_name" className="credit-card-input card-holder-name" placeholder="Card Holder Name" value={paymentData.card_holder_name} onChange={handlePaymentInputChange} required maxLength={255} />
            <input type="text" name="expiration_date" className="credit-card-input expiration-date" placeholder="MM/YY" value={paymentData.expiration_date} onChange={handlePaymentInputChange} required />
            <input type="text" name="cvv" className="credit-card-input cvv" placeholder="CVV" value={paymentData.cvv} onChange={handlePaymentInputChange} required maxLength={4} />
          </div>
          {/* Display error message if present */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="submit-button" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
