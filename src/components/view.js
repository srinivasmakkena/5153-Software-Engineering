import React, { useState, useEffect } from "react";
import "./view.css";
import { Link, useParams } from "react-router-dom";
import ReviewsAndRatings from "./reviews_ratings";
import professionalImage from "./assets/professional.png";
import cleaningImage from './assets/banner_image12.jpg';

const View = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(`http://localhost:8000/professionals/?id=${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch professional details");
        }

        const data = await response.json();
        console.log(data);
        setProfessional(data.professional);
      } catch (error) {
        console.error("Error fetching professional details:", error);
      }
    };

    fetchProfessional();
  }, [id]);

  if (!professional) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="view-container">
        
      {/* Professional details card */}
      <div className="view-card">
        
        <div className="view-content">
          <div className="view-details">
          <h2 className="view-heading">{professional.user_name}</h2>
            <p>Serving Location: <i>{professional.zip_location}</i></p>
            <p className="email">Email: {professional.email}</p>
          <p className="phone-number">Phone number: {`+1 ${professional.phone_number.replace(/.(?=.{4})/g, '*')}`}</p>
          <p className="price">Price per Hour: <b><i>${professional.price_per_hour}</i></b></p>
          <p className="category">Category of Repairs: {professional.categories_of_repairs[0].name}</p>
          </div>
          <div className="view-image">
            <img src={professionalImage} alt={professional.user_name} className="view-category-image" />
          </div>
          
        </div>
      </div>
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

      {/* Book Appointment button */}
      <Link to={`/booking/${id}`} className="view-book-appointment-btn">Book Appointment</Link>
      {/* Reviews and Ratings */}
      <ReviewsAndRatings />
    </div>
  );
};

export default View;
