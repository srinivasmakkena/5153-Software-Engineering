import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./Professional.css";
import ProfessionalImg from "./assets/professional.png";
import NoProfessionalsImg from "./assets/no-prof-found.png";

const Professionals = ({ location }) => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const { categoryId } = useParams();
  console.log(location);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://quicklocalfixapi.pythonanywhere.com//get_categories/");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        // console.log(data);
        const category = data.find((cat) => cat.id === parseInt(categoryId));
        setCategory(category);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, [categoryId]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const url = `https://quicklocalfixapi.pythonanywhere.com//categories/?id=${categoryId}&location=${location}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch professionals");
        }

        const data = await response.json();
        setProfessionals(data.professionals);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching professionals:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [categoryId, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      
      {category && (
        <div className="category-banner">
          <img
            src={`https://quicklocalfixapi.pythonanywhere.com/${category.image_url}`}
            alt={category.name}
            className="category-image"
          />
          <div className="category-details">
            <h2>{category.name}</h2>
            <p>&emsp;&emsp;{category.description}</p>
          </div>
        </div>
      )}
      {professionals.length === 0 ? (
        <div className="no-professionals-container">
          <img
            src={NoProfessionalsImg}
            alt="No professionals found"
            className="no-professionals-image"
          />
          <h2>No professionals found in your area</h2>
          <p>
            Sorry, we couldn't find any professionals in your specified area for this service.
            Please try again later or check back later.
          </p>  
        </div>
      ) : (
        <div className="professionals-container">
          <h2>Our Professionals</h2>
          <div className="professionals-grid">
            {professionals.map((professional) => (
              <Link
                to={`/professional/${professional.id}`}
                key={professional.id}
                className="professional-card"
              >
                <div className="professional-card-inner">
                  <div className="professional-card-image">
                    <img src={ProfessionalImg} alt={professional.user_name} />
                  </div>
                  <div className="professional-card-details">
                    <h3>{professional.user_name}</h3>
                    <p>
                      <b>Email:</b> {professional.email}
                    </p>
                    <p>
                      <b>Serving Location:</b> {professional.zip_location}
                    </p>
                    <p>
                      <b>Price per Hour:</b>{" "}
                      <i>${professional.price_per_hour}</i>
                    </p>
                    {/* Add rating here if available */}
                  </div>
                  <div className="button-container">
                    <Link
                      to={`/professional/${professional.id}`}
                      className="view-button"
                    >
                      View 
                    </Link>
                    <Link
                      to={`/booking/${professional.id}`}
                      className="appointment-button"
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Professionals;
