import React, { useState, useEffect } from 'react';
import './ProfessionalAccount.css'; // Import your CSS file for styling
import ProfessionalImg from "./assets/professional.png"; // Import default image
import { toast } from 'react-toastify';

const ProfessionalAccount = ({ ProUser, setProUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');
  const [category, setCategory] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (ProUser && ProUser.ProUser) {
      const nestedProUser = ProUser.ProUser;
      setUsername(nestedProUser.user_name || '');
      setEmail(nestedProUser.email || '');
      setPhoneNumber(nestedProUser.phone_number || '');
      setZipCode(nestedProUser.zip_code || '');
      setPricePerHour(nestedProUser.price_per_hour || '');
      setCategory(nestedProUser.category[0] || '');
      setImageURL(nestedProUser.image || ProfessionalImg); // Set default image if no image provided
    }
  }, [ProUser]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleUpdateAccount = async () => {
    const updatedUser = {
      ...ProUser,
      ProUser: {
        ...ProUser.ProUser,
        user_name: username,
        email,
        phone_number: phoneNumber,
        zip_code: zipCode,
        price_per_hour: pricePerHour,
        category: [category],
        image: imageURL,
      },
    };
  
    try {
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//update_professional_account/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      console.log(updatedUser,ProUser);
      const data = await response.json();
      if (response.ok) {
        // console.log('Account updated successfully:', data);
        setEmail(updatedUser.ProUser.email || '');
        setPhoneNumber(updatedUser.ProUser.phone_number || '');
        setZipCode(updatedUser.ProUser.zip_code || '');
        setPricePerHour(updatedUser.ProUser.price_per_hour || '');
        setEditMode(false);  // Exit edit mode
        updatedUser.setProUser(updatedUser.ProUser);
        toast.success('Account Updated Successfully.');
      } else {
        // Failed to update account
        console.error('Failed to update account:', data.error);
        // Handle error scenario, show error message to the user, etc.
      }
    } catch (error) {
      console.error('Error updating account:', error);
      // Handle error scenario, show error message to the user, etc.
    }
  };
  const handleSaveClick = () => {
    handleUpdateAccount();
  };
  
  
  return (
    <div className="card">
      <h2><u>Account</u></h2>

      {/* Two Columns Layout */}
      <div className="two-columns">
        {/* Column 1: Image and Edit Button */}
        <div className="column">
          <div className="image-container">
            <img src={imageURL} alt="Profile" className="profile-image" />
            {editMode && (
              <button className="edit-image-button">Edit Image</button>
            )}
          </div>
        </div>

        {/* Column 2: Form Fields and Buttons */}
        <div className="column">
           <form > {/*onSubmit={handleUpdateAccount} >*/}
            <div className="form-group">
              <label className="label" htmlFor="username">Username:</label>
              <input className="input-field" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="email">Email:</label>
              <input className="input-field" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="phoneNumber">Phone Number:</label>
              <input className="input-field" type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="zipCode">Zip Code:</label>
              <input className="input-field" type="text" id="zipCode" value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="pricePerHour">Price Per Hour:</label>
              <input className="input-field" type="text" id="pricePerHour" value={pricePerHour} onChange={(e) => setPricePerHour(e.target.value)} disabled={!editMode} />
            </div>
            {editMode && (
              <div className="button-group">
                <button className="button" type="submit"  onClick={handleSaveClick}><i class="fa fa-pencil-square" aria-hidden="true"></i> Save</button>
                <button className="button secondary" type="button" onClick={handleCancelClick}><i class="fa fa-times" aria-hidden="true"></i> Cancel</button>
              </div>
            )}
          </form>

          {/* Edit Button */}
          {!editMode && (
            <div className="button-group">
              <button className="button" onClick={handleEditClick}><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalAccount;
