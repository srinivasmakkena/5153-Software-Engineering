import React, { useState } from 'react';
import './Dashboard.css';
import Chat from './Chat';
import dashboardimg from "./assets/dashboard.gif";

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Repairs");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [repairRequests, setRepairRequests] = useState([
    { id: 1, name: "John Doe", date: "2024-03-30", status: "Pending", service: "Flat Tire Repair" },
    { id: 2, name: "Jane Smith", date: "2024-03-29", status: "Completed", service: "Brake Adjustment" },
    { id: 2, name: "Jane Smith", date: "2024-03-29", status: "Completed", service: "Brake Adjustment" },
    { id: 3, name: "Alice Johnson", date: "2024-03-28", status: "In Progress", service: "Chain Replacement" },
  ]);
  

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setCartItems([]);
  };
  const handleClearUser = () => {
    setSelectedUser(null);
    setCartItems([]);
  };
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter(item => item !== itemToRemove));
  };
  const filteredRequests = repairRequests.filter(request =>
    request.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="professional-dashboard">
      <div className="sidebar">
        {/* <h2>Dashboard</h2> */}
       
        <ul>
          <li>
            <a href="#" className={selectedOption === "Repairs" ? "active" : ""} onClick={() => handleOptionClick("Repairs")}>
              <i className="fa fa-wrench" aria-hidden="true"></i> Repairs
            </a>
          </li>
          <li>
            <a href="#" className={selectedOption === "Chats" ? "active" : ""} onClick={() => handleOptionClick("Chats")}>
              <i className="fa fa-comments" aria-hidden="true"></i> Chats
            </a>
          </li>
          <li>
            <a href="#" className={selectedOption === "Products" ? "active" : ""} onClick={() => handleOptionClick("Products")}>
              <i className="fa fa-shopping-cart" aria-hidden="true"></i> Products
            </a>
          </li>
          <li>
            <a href="#" className={selectedOption === "Account" ? "active" : ""} onClick={() => handleOptionClick("Account")}>
              <i className="fa fa-user" aria-hidden="true"></i> Account
            </a>
          </li>
          <img src={dashboardimg} alt="GIF" style={{ width: '100%' }} />
        </ul>
        
      </div>
      <div className="content">
        {selectedOption === "Repairs" && (
          <div className="card"> 
            <h2>Repair Service Requests</h2>
            <input
          type="text"
          placeholder="Search Services..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
            <div className="repair-requests">
              {filteredRequests.map(request => (
                <div key={request.id} className="sub-card">
                  <h3>{request.service}</h3>
                  <p>ID: {request.id}</p>
                  <p>Name: {request.name}</p>
                  <p>Date: {request.date}</p>
                  <p>Status: {request.status}</p>
                  <div className="button-container">
                    <button className="view-button">View</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedOption === "Chats" && (
           <Chat  /> 
        )}
       {selectedOption === "Products" && (
          <div className="card products-card">
            <h2>Products</h2>
            {!selectedUser && (
              <div>
                <div className="select-user">
                <h3>Select a User</h3>
                </div>
                
                <div className="user-buttons">
                  <button onClick={() => handleUserSelect("John")}>John Doe</button>
                  <button onClick={() => handleUserSelect("Jane")}>Jane Smith</button>
                  <button onClick={() => handleUserSelect("Alice")}>Alice Johnson</button>
                </div>
              </div>
            )}
            {selectedUser && (
              <div>
                <div  className="selected-user">
                <h3>{selectedUser}'s Cart</h3>
                <button onClick={handleClearUser} className="change-user-button">Change User</button>
              </div>
              
                <ul className="cart-items">
                  {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                      <span className="item-name">{item.name}</span>
                      <span className="item-price">{item.price}</span>
                      <button onClick={() => removeFromCart(item)} className="remove-button">Remove</button>
                    </li>
                  ))}
                </ul>
                <div className="product-buttons">
                  <button onClick={() => addToCart({ id: 1, name: "Product 1", price: "$10" })}>Add Product 1</button>
                  <button onClick={() => addToCart({ id: 2, name: "Product 2", price: "$20" })}>Add Product 2</button>
                  <button onClick={() => addToCart({ id: 3, name: "Product 3", price: "$30" })}>Add Product 3</button>
                </div>
              </div>
            )}
          </div>
        )}
        {selectedOption === "Account" && (
          <div className="card">
            <h2>Account</h2>
            <p>This is the Account page. You can view and manage your account settings here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
