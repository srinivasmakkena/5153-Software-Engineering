import React from 'react';
import "./Account.css";

const Account = () => {
  // Sample user data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipcode: '12345',
    },
    membership: 'Gold',
  };

  // Sample orders data
  const orders = [
    { id: 1, product: 'Product 1', status: 'Delivered' },
    { id: 2, product: 'Product 2', status: 'Pending' },
    { id: 3, product: 'Product 3', status: 'Shipped' },
  ];

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <p>Hi, {user.firstName} {user.lastName}!</p>
      <div className="user-info">
        <div className="info-column">
          <div className="info-item">
            <strong>First Name:</strong> 
            <div className="info-item1">{user.firstName}</div> 
          </div>
          <div className="info-item">
            <strong>Last Name:</strong> 
            <div className="info-item1">{user.lastName}</div> 
            
          </div>
          <div className="info-item">
            <strong>Email:</strong> 
            <div className="info-item1">{user.email}</div> 
            
          </div>
          <div className="info-item">
            <strong>Phone Number:</strong>
            <div className="info-item1">{user.phoneNumber}</div> 
             
          </div>
        </div>
        <div className="info-column">
          <div className="info-item">
            <strong>Street Address:</strong> 
            <div className="info-item1">{user.address.street}</div> 
            
          </div>
          <div className="info-item">
            <strong>City:</strong> 
            <div className="info-item1">{user.address.city}</div> 
            
          </div>
          <div className="info-item">
            <strong>State:</strong> 
            <div className="info-item1">{user.address.state}</div> 
            
          </div>
          <div className="info-item">
            <strong>Zipcode:</strong> 
            <div className="info-item1">{user.address.zipcode}</div> 
            

          </div>
        </div>
        <button type="submit" className="btn btn-primary">Edit Account</button>
      </div>
      <h2>Orders Information</h2>
      <div className="orders-info">
        {orders.map(order => (
          <div key={order.id} className="order-item">
            <div>
              <strong>Product:</strong> 
              <div className="info-item1">{order.product}</div>
              
            </div>
            <div>
              <strong>Status:</strong> 
              <div className="info-item1">{order.status}</div>
              
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default Account;
