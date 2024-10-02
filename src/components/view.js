import React, { useState, useEffect } from "react";
import "./view.css";
import { Link, useParams } from "react-router-dom";
import ReviewsAndRatings from "./reviews_ratings";
import professionalImage from "./assets/professional.png";

const View = (customer) => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [professional, setProfessional] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [repairRequests, setRepairRequests] = useState([]);
  
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//professionals/?id=${id}`);

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
    fetchRepairServices();
    fetchProfessional();
    fetchReviews();
  }, [id]);
  const fetchRepairServices = async () => {
    try {
      const response = await fetch(
        `https://quicklocalfixapi.pythonanywhere.com//get_service_requests?professional_id=${id}`
      );
      const data = await response.json();
      setRepairRequests(data.service_requests); // Assuming service_requests is the key for the array of services in the response
      console.log(data);
    } catch (error) {
      console.error("Error fetching repair services:", error);
    }
  };
 

  useEffect(() => {
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, curr) => acc + curr.review_rating, 0);
      const average = totalRating / reviews.length;
      setAverageRating(average);
    }
  }, [reviews]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-reviews/?repair_person_id=${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      console.log(data);
      if (data.reviews) {
        setReviews(data.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  

  if (!professional) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-container">
      {/* Professional details card */}
      <div className="view-card">
        <div className="view-content">
          <div className="view-details">
           <h2 className="view-heading" style={{ marginLeft: '-50px',color: 'black', backgroundColor:"orange", borderRadius:'15px', padding:'15px', 'font-family':'cursive'}}><i class="fa fa-id-card fa-lg" aria-hidden="true"></i>  <u>{professional.user_name}</u></h2>
            <p><i class="fa fa-thumb-tack" aria-hidden="true"></i> Serving Location: <i>{professional.zip_location}</i></p>
            <p className="email"> <i class="fa fa-envelope" aria-hidden="true"></i> Email:<span style={{ color: 'blue' }}>{professional.email}</span></p>
            <p className="phone-number"><i class="fa fa-phone" aria-hidden="true"></i> Phone number: <span style={{ color: 'blue' }}>{`+1 ${professional.phone_number.replace(/.(?=.{4})/g, '*')}`}</span></p>
            <p className="price"><i class="fa fa-usd" aria-hidden="true"></i> Price per Hour: <span style={{ color: 'blue' }}><b><i>${professional.price_per_hour}</i></b></span></p>
            <p className="category"><i class="fa fa-cogs" aria-hidden="true"></i> Category of Repairs: {professional.categories_of_repairs[0].name}</p>
        <div className="average-rating">
          <p><i class="fa fa-star" aria-hidden="true"></i> Average Rating:  {averageRating ? (<i>{averageRating.toFixed(1)}/5.0</i>):("No Reviews & Ratings found ...")}</p>
          <p><i class="fa fa-briefcase" aria-hidden="true"></i> Number of services: {repairRequests.length}</p>
          <p><i class="fa fa-commenting" aria-hidden="true"></i> Number of reviews: {reviews.length}</p>
        </div>
          </div>
          <div className="view-image">
            <img src={professionalImage} alt={professional.user_name} className="view-category-image" />
          </div>
        </div>
      </div>

      {/* Book Appointment button */}
      <Link to={`/booking/${id}`} className="view-book-appointment-btn">Book Appointment</Link>
      
      {/* Display average rating */}
     
      
      {/* Reviews and Ratings */}
      <ReviewsAndRatings customer={customer} Pid={id} />
    </div>
  );
};

export default View;
