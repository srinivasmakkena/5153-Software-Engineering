import React, { Component } from "react";
import "./Footerstyles.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="footer-buttons">
          <button className="footer-button">
            <i className="fas fa-map-marker-alt"></i> Locations
          </button>
          <button className="footer-button">
            <i className="fas fa-hands-helping"></i> Support
          </button>
          <button className="footer-button">
            <i className="fas fa-info-circle"></i> About Us
          </button>
          <button className="footer-button">
            <i className="fas fa-envelope"></i> Contact Us
          </button>
          <button className="footer-button">
            <i className="fas fa-user"></i> <a href="/ProfessionalLogin">Professional Login</a>
          </button>
        </div>
        
      </footer>
    );
  }
}

export default Footer;
