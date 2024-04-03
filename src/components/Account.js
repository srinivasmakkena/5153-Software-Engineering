import React from 'react';
import "./Account.css";

const Account = ({customer, ProUser} ) => {
  // Sample user data
  console.log(customer,ProUser,"  Hellow");
  const user = {
    name: customer.name,
    email: customer.email,
    phoneNumber: customer.phone_number,
    
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
      <p>Hi, {user.name} !</p>
      <div className="user-info">
        <div className="info-column">
          <div className="info-item">
            <strong>User Name:</strong> 
            <div className="info-item1">{user.name}</div> 
            
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
