import React, { useState } from 'react';

const AddressForm = ({ customer, setCustomer, fetchAddresses }) => {
  const [expandForm, setExpandForm] = useState(false);
  const [formData, setFormData] = useState({
    street_address: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const responseData = await response.json();
      // console.log(response);
      if (!response.ok) {
        throw new Error('Failed to add address');
      }
      // Refresh addresses after adding a new one
      fetchAddresses();
      // Reset form data and error state
      setFormData({
        street_address: '',
        city: '',
        state: '',
        postal_code: '',
        country: ''
      });
      setError(null);
      setExpandForm(false);
    } catch (error) {
      console.error('Error adding address:', error);
      // Set error state to display error message in the form
      setError('Failed to add address. Please try again.');
    }
  };

  return (
    <div className="add-address-form">
      {error && <p className="error-message">{error}</p>}
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
      <button className="toggle-form-btn" style={{ backgroundColor: expandForm ? "red" : "green" }} onClick={() => setExpandForm(!expandForm)}>{expandForm ? ("Close Address Form") : ("Add New Address")}</button>
    </div>
  );
};

export default AddressForm;
