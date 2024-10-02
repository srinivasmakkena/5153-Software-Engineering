import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Chat from "./Chat";
import dashboardimg from "./assets/dashboard.gif";
import ProfessionalAccount from "./ProfessionalAccount";
import ProductManagement from "./ProductManagement";
import { toast } from 'react-toastify';

const Dashboard = (ProUser, setProUser) => {
  const [selectedOption, setSelectedOption] = useState("Repairs");
  const [searchTerm, setSearchTerm] = useState("");
  const [professionalData, setProfessionalData] = useState(null);
  const [repairRequests, setRepairRequests] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedRequest, setEditedRequest] = useState(null);
  console.log(ProUser);
  useEffect(() => {
    if (ProUser && ProUser.ProUser) {
      setProfessionalData(ProUser.ProUser);
    } else {
      const storedProUser = localStorage.getItem("proUser");
      setProfessionalData(JSON.parse(storedProUser));
    }
  }, [ProUser]);
  const fetchRepairServices = async () => {
    if (professionalData && professionalData.id)
      {
          try {
        
        const response = await fetch(
          `https://quicklocalfixapi.pythonanywhere.com//get_service_requests?professional_id=${professionalData.id}`
        );
        const data = await response.json();
        setRepairRequests(data.service_requests); // Assuming service_requests is the key for the array of services in the response
        console.log(data);
      } catch (error) {
        console.error("Error fetching repair services:", error);
      }
    }
  };
  useEffect(() => {
    

    if (selectedOption === "Repairs") {
      fetchRepairServices();
    }
  }, [selectedOption, professionalData]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleEditRequest = (request) => {
    setEditMode(true);
    setEditedRequest(request);
  };
  const updateRequest = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//update_request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedRequest), // Send the edited request data
      });
      const data = await response.json();
      console.log('Request updated on server:', data);
      // Reset edit mode and edited request
      setEditMode(false);
      fetchRepairServices();
      setEditedRequest(null);
      toast.success('Updated Successfully!', { });
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const handleSaveEdit = () => {
    // Implement save edit functionality here, update the request on the server
    // After saving the edit, reset editMode and editedRequest
    // request = editedRequest;
    updateRequest();
    setEditMode(false);
    setEditedRequest(null);
  };

  const handleCancelEdit = () => {
    // Cancel edit mode, reset editedRequest
    setEditMode(false);
    setEditedRequest(null);
  };

  const handleInputChange = (event) => {
    // Handle input change for editedRequest
    const { name, value } = event.target;
    setEditedRequest({ ...editedRequest, [name]: value });
  };
 
  const filteredRequests = repairRequests.filter((request) => {
    // Concatenate all attributes into a single string
    const searchString = `${request.customer_id} ${request.type_of_service} ${request.id} ${request.date} ${request.time} ${request.price} ${request.some_other_data} ${request.status} ${request.hours_worked}`.toLowerCase();
    
    // Check if the search term matches any part of the concatenated string
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  return (
    <div className="professional-dashboard">
      <div className="sidebar">
        {/* <h2>Dashboard</h2> */}

        <ul>
          <li>
            <a
              href="#"
              className={selectedOption === "Repairs" ? "active" : ""}
              onClick={() => handleOptionClick("Repairs")}
            >
              <i className="fa fa-wrench" aria-hidden="true"></i> Repairs
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedOption === "Chats" ? "active" : ""}
              onClick={() => handleOptionClick("Chats")}
            >
              <i className="fa fa-comments" aria-hidden="true"></i> Chats
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedOption === "Products" ? "active" : ""}
              onClick={() => handleOptionClick("Products")}
            >
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
              Products
            </a>
          </li>
          <li>
            <a
              href="#"
              className={selectedOption === "Account" ? "active" : ""}
              onClick={() => handleOptionClick("Account")}
            >
              <i className="fa fa-user" aria-hidden="true"></i> Account
            </a>
          </li>
          <img src={dashboardimg} alt="GIF" style={{ width: "100%" }} />
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
              {/* {
        "id": 4,
        "customer_id": "John",
        "address_id": "4611 Taft Blvd, Wichita Falls, TX, 76308-4901, United States",
        "date": "2024-04-18",
        "time": "12:00 AM",
        "professional_id": "David",
        "type_of_service": "Inspection",
        "status": "Pending"
    }
] */}
              {filteredRequests.map((request) => (
                <div key={request.id} className="sub-card">
                  <h3>
                    {request.customer_id} - {request.type_of_service} -  {request.id}
                  </h3>
                  <p><b>ID:</b> {request.id}</p>
                  <p><b>Name:</b> {request.customer_id}</p>
                  <p>
                    <b>Date:</b> {request.date}, {request.time}
                  </p>
                  <p><b>Price:</b> <i>${request.price}</i></p>                  
                  {(editMode &&
                    editedRequest &&
                    editedRequest.id === request.id )?
                    (<div>
                      <label htmlFor="hours_worked">Hours Worked:</label>
                      <input  style={{ marginLeft:"15px", marginBottom: '10px', width:"100px" }}
                        type="number"
                        name="hours_worked"
                        value={editedRequest.hours_worked}
                        onChange={handleInputChange}
                      /><br/>
                      <label htmlFor="status">Status:</label>
                      <select
                        name="status"
                        style={{ marginBottom: '10px',marginLeft:"15px" }}
                        value={editedRequest.status}
                        onChange={handleInputChange}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Waiting for parts">Waiting for parts</option>
                        <option value="Repair in progress">Repair in progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select><br/>
                      <label htmlFor="type_of_service">Type of Service:</label>
                      <select
                        name="type_of_service"
                        style={{marginLeft:"15px" }}
                        value={editedRequest.type_of_service}
                        onChange={handleInputChange}
                      >
                        <option value="Inspection">Inspection</option>
                        <option value="Repairing">Repairing</option>
                      </select>
                      <br/>
                    </div>
                  ):(
                      <>
                        <p><b>Hours Worked:</b> {request.hours_worked}</p>
                        <p><b>Status:</b> {request.status}</p>
                        <p><b>Type of Service:</b> {request.type_of_service}</p>
                      </>
                    )
                    
                    }
                  <p><b>Address:</b> {request.address_id}</p><br/>
                  <div className="button-container">
                    {!editMode && (
                      <button
                        className="edit-button"
                        onClick={() => handleEditRequest(request)}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;
                        Edit
                      </button>
                    )}
                  </div>
                  {/* Display edit form when in edit mode */}
                  {editMode &&
                    editedRequest &&
                    editedRequest.id === request.id && (
                      <div className="button-container">
                        <button  style={{ marginRight: '10px' }} className="edit-button" onClick={handleSaveEdit}>Save</button>
                        <button style={{ backgroundColor:"grey" }} className="edit-button" onClick={handleCancelEdit}>Cancel</button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedOption === "Chats" && <Chat repairRequests= {repairRequests} ProUser ={ProUser}/>}
        {selectedOption === "Products" && (
          <ProductManagement professionalData={professionalData}/>
        )}
        {selectedOption === "Account" && (
          <ProfessionalAccount ProUser={ProUser} setProUser={setProUser} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
