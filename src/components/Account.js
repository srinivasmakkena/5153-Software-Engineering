import React, { useState, useEffect, useCallback} from 'react';
import "./Account.css";
// import { toast } from 'react-toastify';
import ChatPopup from './ChatPopup';
const Account = ({ customer, setCustomer, ProUser }) => {
  const [selectedTab, setSelectedTab] = useState('account'); // Default to 'account' tab
  const [repairServices, setRepairServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      if (selectedProfessional && customer.id) {
        try {
          const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-messages/?customer_id=${customer.id}&repair_person_id=${selectedProfessional}`);
          if (!response.ok) {
            throw new Error('Failed to fetch conversation');
          }
          const data = await response.json();
          setConversation(data);
        } catch (error) {
          console.error('Error fetching conversation:', error);
        }
      }
    };
    const intervalId = setInterval(fetchConversations, 3000);
    return () => clearInterval(intervalId);
  }, [selectedProfessional, customer.id]);
  const openChat = (professionalName) => {
    // Fetch conversation for the selected professional and customer
    console.log(customer.id,professionalName);
    fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-messages/?customer_id=${customer.id}&repair_person_id=${professionalName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch conversation');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the response data contains an array of messages
        setConversation(data);
        setSelectedProfessional(professionalName);
        setShowChat(true);
      })
      .catch(error => {
        console.error('Error fetching conversation:', error);
        // Handle error
      });
  };
  
  
  const sendMessage = async (professional, input_message) => {
    try {
      const message = {customer_id:customer.id, repair_person_id:professional, text:input_message, way_of_msg:"u2p"}
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//send-message/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message), // Send the edited request data
      });
      const data = await response.json();
      fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-messages/?customer_id=${customer.id}&repair_person_id=${professional}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch conversation');
        }
        return response.json();
      })
      .then(data => {
        setConversation(data);
      })
      .catch(error => {
        console.error('Error fetching conversation:', error);
      });
      console.log('message sent successfully:', data);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedProfessional(null);
    setConversation([]);
  };

  const [editedAccount, setEditedAccount] = useState({
    name: customer.name,
    email: customer.email,
    phone_number: customer.phone_number
  });

  const fetchOrders = useCallback(async () => {
    try {
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//get_order_details/?customer_id=' + customer.id);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }, [customer.id]); // Add customer.id as a dependency to ensure it's updated when it changes

  const fetchRepairServices = useCallback(async () => {
    try {
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//get_service_requests_by_customer/?customer_id=' + customer.id);
      if (!response.ok) {
        throw new Error('Failed to fetch repair services');
      }
      const data = await response.json();
      console.log(data);
      setRepairServices(data.service_requests);
    } catch (error) {
      console.error('Error fetching repair services:', error);
    }
  }, [customer.id]);
    useEffect(() => {
    // Fetch repair services data when the component mounts
    fetchRepairServices();
    fetchOrders();
  }, [fetchRepairServices,fetchOrders]);

  // Function to handle tab selection
  const handleTabSelect = (tabName) => {
    setSelectedTab(tabName);
  };

  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedAccount(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      editedAccount['id'] = customer.id
      setCustomer(editedAccount);
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//update_account/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify(editedAccount),
      });
      if (!response.ok) {
        throw new Error('Failed to update account');
      }
      // console.log(response);
      setEditMode(false); // Exit edit mode after saving
    } catch (error) {
      console.error('Error updating account:', error);
      // Handle error
    }
  };
  
  const renderAccountInfo = () => {
    return (
      <div className="user-info">
        <div className="info-item">
          <i className="fa fa-user user-icon"></i>
          <strong>User Name:</strong>
          <div className="info-item1">{customer.name}</div>
        </div>
        <div className="info-item">
          <strong>Email:</strong>
          <div className="info-item1">{customer.email}</div>
        </div>
        <div className="info-item">
          <strong>Phone Number:</strong>
          <div className="info-item1">{customer.phone_number}</div>
        </div>
        <div className="edit-buttons">
          <button className="btn btn-primary" onClick={toggleEditMode}>
            <i className="fa fa-edit"></i> Edit Account
          </button>
        </div>
      </div>
    );
  };

  
  const renderEditableAccountInfo = () => {
    return (
      <div className="user-info edit-mode">
        <div className="info-item">
          <i className="fa fa-user user-icon"></i>
          <strong>User Name:</strong>
          <input type="text" name="name" hidden value={editedAccount.name} onChange={handleInputChange} />
          {editedAccount.name}
        </div>
        <div className="info-item">
          <strong>Email:</strong>
          <input type="email" name="email" value={editedAccount.email} onChange={handleInputChange} />
        </div>
        <div className="info-item">
          <strong>Phone Number:</strong>
          <input type="text" name="phone_number" value={editedAccount.phone_number} onChange={handleInputChange} />
        </div>
        <div className="edit-buttons">
          <button className="btn btn-secondary" onClick={toggleEditMode}>
            <i className="fa fa-times"></i> Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <i className="fa fa-check"></i> Save
          </button>
        </div>
      </div>
    );
  };
  
  const toggleOrderDetails = (orderId) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, showDetails: !order.showDetails } : order
      )
    );
  };

  const renderOrderDetails = (order) => {
    return (
      <div className="order-details">
        <div className="address-info">
          <div><strong>Street Address:</strong> {order.address.street_address}</div>
          <div><strong>City:</strong> {order.address.city}</div>
          <div><strong>State:</strong> {order.address.state}</div>
          <div><strong>Postal Code:</strong> {order.address.postal_code}</div>
          <div><strong>Country:</strong> {order.address.country}</div>
        </div>
        <div><strong>Order Cost:</strong> {order.order_cost}</div>
        <div className="product-list">
          <strong>Products:</strong>
          {order.products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image_url} alt={product.name} className="product-image" />
              <div className="product-details">
                <div className="product-name">{product.name}</div>
                <div className="product-price">Price: {product.price}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="toggle-details-btn" onClick={() => printOrderInvoice(order)}><i className="fa fa-print" aria-hidden="true"></i> Print Invoice</button>
      </div>
    );
  };
  const printOrderInvoice = (order) => {
    const printWindow = window.open('', '_blank');
    const paddedOrderId = order.id.toString().padStart(10, '0'); 
    const productsTableRows = order.products.map((product) => (
      `<tr>
        <td><img src=${product.image_url} alt=${product.name}-image class="product-image" /></td>
        <td>${product.name}</td>
        <td>$${product.price}</td>
      </tr>`
    )).join('');
  
    const invoiceContent = `
      <html>
        <head>
          <title>Order Invoice</title>
          <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              margin: 50px;
            }
            .invoice {
              padding: 120px 40px 120px 54px;
              border: 1px solid #ccc;
              border-radius: 5px;
              max-width: 600px;
            }
            .product-image {
              max-width: 40px;
              height: auto;
            }
            .order-header {
              margin-bottom: 20px;
            }
            .order-details {
              margin-top: 20px;
            }
            .product-table {
              width: 100%;
              border-collapse: collapse;
            }
            .product-table th,
            .product-table td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            #qr-code {
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="invoice">
            <div class="order-header">
              <h1>QUICKLOCALFIX REPAIR SERVICES</h1>
              <h3><u>Order Invoice:</u></h3>
              <p><strong>Order ID:</strong> ${paddedOrderId}</p>
              <p><strong>Order Status:</strong> ${order.order_status}</p>
            </div>
            
            <div class="order-details">
              <p><strong>Ordered Date:</strong> ${new Date(order.ordered_date).toLocaleString()}</p>
              <p><strong>Delivery Date:</strong> ${new Date(order.delivery_date).toLocaleString()}</p>
              <div><strong>Street Address:</strong> ${order.address.street_address}</div>
              <div><strong>City:</strong> ${order.address.city}</div>
              <div><strong>State:</strong> ${order.address.state}</div>
              <div><strong>Postal Code:</strong> ${order.address.postal_code}</div>
              <div><strong>Country:</strong> ${order.address.country}</div>
              <div><strong>Order Cost:</strong> $ ${order.order_cost}</div>
              <h3><u>Products:</u></h3>
              <table class="product-table">
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${productsTableRows}
                </tbody>
              </table>
            </div>
            <img id="barcode" />
          </div>
          
          <script>
            // Generate barcode for order ID
            JsBarcode("#barcode", "${paddedOrderId}", {
              format: "CODE128",
              width: 2,
              height: 50,
            });
          </script>
        </body>
      </html>
    `;
    printWindow.document.write(invoiceContent);
  };
  
  
// Render repair service cards
const renderRepairServiceCards = () => {
  return repairServices.map(service => (
    <div key={service.id} className="repair-service-card">
      {/* Render repair service details */}
      <div className="service-details">
        {/* <div><strong>Customer:</strong> {service.customer_id}</div> */}
        <div><strong>Service Id:</strong> {service.id}</div>
        <div><strong>Date:</strong> {service.date}</div>
        <div><strong>Time:</strong> {service.time}</div>
        <div><strong>Professional:</strong> {service.professional_id}</div>
        <div><strong>Type of Service:</strong> {service.type_of_service}</div>
        <div><strong>Status:</strong> {service.status}</div>
        <div><strong>Hours Worked:</strong> {service.hours_worked}</div>
        <div><strong>Price:</strong> {service.price}</div>
        <div><strong>Address:</strong> {service.address_id}</div>
        {service.status !== 'Cancelled' && service.status !== 'Completed' && (
          <button className='toggle-chat-btn' onClick={() => openChat(service.professional_id)} > <i className="fa fa-commenting" aria-hidden="true"></i> Open Chat</button>
        )}

      </div>
      
      {/* Add any additional actions or buttons related to the repair service */}
    </div>
  ));
};

  
  const renderOrderCards = () => {
    return orders.map(order => (
      <div key={order.id} className="order-card">
        <div className="order-header" onClick={() => toggleOrderDetails(order.id)}>
          <span><strong>Order ID:</strong> {order.id}</span>
          <span><strong>Order Status:</strong> {order.order_status}
          <button className="toggle-details-btn"> <i className="fa fa-info-circle" aria-hidden="true"></i> {order.showDetails ? "Hide Details" : "Show Details"}</button></span>
        </div>
        <div><strong>Ordered Date:</strong> {new Date(order.ordered_date).toLocaleDateString()}</div>
        <div><strong>Delivery Date:</strong> {new Date(order.delivery_date).toLocaleDateString()}</div>
        <div className="order-details-container">
        {order.showDetails && renderOrderDetails(order)}
      </div>
      </div>
    ));
  };


  const renderTabContent = () => {
    switch (selectedTab) {
      case 'account':
        return (
          <div>
             <div className="account-container">
      {/* Tab navigation */}
      

      {/* Render selected tab content */}
      {selectedTab === 'account' && (editMode ? renderEditableAccountInfo() : renderAccountInfo())}
      {/* Add rendering for other tabs */}
    </div>
          </div>
        );
      case 'orders':
        return (
          <div>
            {selectedTab === 'orders' && (
        <div className="order-container">
          {renderOrderCards()}
        </div>
      )}
          </div>
        );
      case 'repairServices':
        return (
          <div className="repair-services-container">
          {renderRepairServiceCards()}
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="account-container">
      {/* Tab navigation */}
      <div className="tab-navigation">
        <button className={selectedTab === 'account' ? 'active' : ''} onClick={() => handleTabSelect('account')}>Account</button>
        <button className={selectedTab === 'orders' ? 'active' : ''} onClick={() => handleTabSelect('orders')}>Orders</button>
        <button className={selectedTab === 'repairServices' ? 'active' : ''} onClick={() => handleTabSelect('repairServices')}>Repair Services</button>
      </div>
      
      {/* Render selected tab content */}
      {renderTabContent()}
      {showChat && (
        <ChatPopup
          professionalName={selectedProfessional}
          conversation={conversation}
          onClose={closeChat}
          sendMessage = {sendMessage}
        />
      )}
    </div>
  );
}

export default Account;
