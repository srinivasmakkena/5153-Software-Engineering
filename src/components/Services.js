// Filename: components/ServicesPage.js
import React from 'react';
import './Servicesstyles.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const Services = () => {
  // Array of services

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-grid">
        {/* Wrap each service card in a Link component */}
        <Link to="/Garage" className="service-card">
            Garage
        </Link>
        <Link to="/Electronic" className="service-card">
            Electronic
        </Link>
        <Link to="/Roofing" className="service-card">
            Roofing
        </Link>  
        <Link to="/Plumbing" className="service-card">
           Plumbing  
        </Link>
        <Link to="/Fence & Deck" className="service-card">
            Fence & Deck  
        </Link>
        <Link to="/Electrical" className="service-card">
            Electrical  
        </Link>
        <Link to="/Painting" className="service-card">
            Painting 
        </Link>
        <Link to="/Appliance" className="service-card">
            Appliance  
        </Link>
        <Link to="/HVAC" className="service-card">
            HVAC  
        </Link>
        <Link to="/Pest Control" className="service-card">
           Pest Control 
        </Link>
        <Link to="/Lawn & Landscaping" className="service-card">
           Lawn & Landscaping
        </Link>
        <Link to="/Moving" className="service-card">
           Moving
        </Link>

      </div>
    </div>
  );
};

export default Services;

