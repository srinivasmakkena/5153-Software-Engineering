import React from "react";
import "./view.css";
import {Link} from "react-router-dom";
import cleaningImage from './assets/banner_image12.jpg';
import professionalImage from './assets/Pro_image.png';
import ReviewsAndRatings from './reviews_ratings'; // Import the ReviewsAndRatings component

const View = () => {
  return (
    <div className="view-container">
      {/* Services card */}
      <div className="view-card">
        <h2 className="view-heading">Cleaning Services</h2>
        <div className="view-content">
          <div className="view-description">
            <p>
              Our cleaning services cover a wide range of needs, from regular home maintenance to specialized commercial cleaning projects. Whether you're looking to freshen up your living space, prepare for a special event, or maintain a sanitary work environment, our team of experienced cleaners is here to help. 
            </p>
          </div>
          <div className="view-image">
            <img src={cleaningImage} alt="Cleaning Services" className="category-image" />
          </div>
        </div>
      </div>

      {/* Professional details card */}
      <div className="view-card">
        <h2 className="view-heading">John Doe</h2>
        <div className="view-content">
          <div className="view-details">
            <p>Email: john@example.com</p>
            <p>Serving Location: 76308</p>
            <p>Price per Hour: $100</p>
            <p>Ratings: 4.5/5</p>
          </div>
          <div className="view-image">
            <img src={professionalImage} alt="John Doe" className="view-category-image" />
          </div>
          
        </div>
      </div>

      {/* Book Appointment button */}
      <Link to="/booking" className="view-book-appointment-btn">Book Appointment</Link>
      {/* Reviews and Ratings */}
      <ReviewsAndRatings />
    </div>
  );
};

export default View;
