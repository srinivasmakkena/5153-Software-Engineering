import React, { useState, useEffect } from "react";
import Homepage_image from "./assets/Homepage_image.png";
import * as BannerImages from "./assets";
import * as Banner2Images from "./assets/secondbanner";
import ReviewsAndRatings from "./reviews_ratings";
import home1 from "./assets/home1.jpeg";
import home2 from "./assets/home2.jpeg";

function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const images = Object.values(BannerImages);
  const images2 = Object.values(Banner2Images);
  const groupSize = 3;
  const reviews = [
    { id: 1, customer: 'John Doe', rating: 5, text: 'Great service, fixed my appliances quickly!' },
    { id: 2, customer: 'Jane Smith', rating: 4, text: 'Excellent price transparency, highly recommend!' },
    { id: 3, customer: 'Alice', rating: 5, text: 'Adding parts to the cart and tracking status is so cool!' },
    { id: 4, customer: 'Michael Johnson', rating: 4, text: 'Responsive customer support, really helpful.' },
    { id: 5, customer: 'Emily Brown', rating: 3, text: 'Good service, but delivery took longer than expected.' },
    { id: 6, customer: 'David Lee', rating: 5, text: 'Impressive product quality, exceeded my expectations.' },
    { id: 7, customer: 'Samantha Clark', rating: 4, text: 'Easy to navigate website, hassle-free shopping experience.' },
    { id: 8, customer: 'Matthew Taylor', rating: 5, text: 'Prompt delivery and well-packaged items, satisfied with my purchase.' },
    { id: 9, customer: 'Sophia Martinez', rating: 3, text: 'Average service, could improve communication with customers.' },
    { id: 10, customer: 'Liam Wilson', rating: 4, text: 'Good variety of products, found exactly what I needed.' },
    { id: 11, customer: 'Olivia White', rating: 5, text: 'The website is user-friendly and offers great deals!' },
    { id: 12, customer: 'Ethan Harris', rating: 3, text: 'Satisfactory experience, but shipping could be faster.' },
  ];
  
  

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [startIndex]);

  const handleNext = () => {
    if (startIndex + 6 < images.length) {
      setStartIndex((prevIndex) => prevIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex((prevIndex) => prevIndex - 1);
    } else {
      setStartIndex(images.length - 1);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginRight: "200px",
          marginTop: "50px",
        }}
      >
        <div style={{ flex: "1" }}>
          <h1
            style={{
              fontSize: "4.5rem",
              marginBottom: "0.2rem",
              fontFamily: "Montserrat, sans-serif",
              color: "orange",
            }}
          >
            QuickLocalFix{" "}
          </h1>
          <h2 style={{ marginTop: "0.5rem", fontSize: "3.5rem", marginBottom: "0.5rem" }}>
            Repair Services
          </h2>
          <h5> RESTORING EXCELLENCE, REPAIRING WITH PRECISION</h5>
        </div>
        <img
          src={Homepage_image}
          alt="Homepage"
          style={{
            width: "200px",
            height: "auto",
            maxWidth: "50%",
            maxHeight: "40vh",
          }}
        />
      </div>


      {/* Category Section */}
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: "1", marginRight: "20px" }}>
            <img
              src={home1}
              alt="Left Image"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div style={{ flex: "2" }}>
            <h2 style={{ color: "orange", marginBottom: "20px" }}>Explore Categories</h2>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              {[
                "Cleaning",
                "Plumbing",
                "Electricians",
                "Pest Control",
                "Carpentry",
                "Home Painting",
                "AC Service & Repair",
                "Appliance Repair",
                "Beauty & Wellness",
                "Health & Fitness",
                "Events & Occasions",
                "Professional Services",
                "Lifestyle Services",
                "Transportation & Logistics",
              ].map((category, index) => (
                <div key={index} style={{ margin: "10px", minWidth: "200px" }}>
                  <h3>{category}</h3>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1", marginLeft: "20px" }}>
            <img
              src={home2}
              alt="Right Image"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
      {/* End of Category Section */}

      {/* Banner Section */}
      <div className="banner" style={{ position: "relative" }}>
        <div
          className="banner-container"
          style={{
            overflow: "hidden",
            marginBottom: "65px",
            width: "auto",
            // overflow-x: hidden;
            height: "auto",
          }}
        >
          <div
            className="banner-slide"
            style={{
              display: "flex",
              transform: `translateX(-${startIndex * (100 / groupSize)}%)`,
              transition: "transform 1s ease",
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Banner ${index + 1}`}
                style={{
                  width: `${100 / groupSize}%`,
                  height: "300px",
                  margin: "0 10px",
                  marginBottom: "20px",
                }}
              />
            ))}
          </div>
        </div>
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "none",
            fontSize: "20px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {"<"}
        </button>
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            border: "none",
            fontSize: "20px",
            padding: "10px",
            cursor: "pointer",
          }}
        >
          {">"}
        </button>
      </div>
      {/* End of Banner Section */}
      {/* General Description */}
      <div style={{ marginTop: "50px", padding: "0 20%" }}>
        <p style={{ textAlign: "center", fontSize: "1.6rem", fontFamily:"cursive" }}>
          QuickLocalFix provides a comprehensive solution for all your repair needs. Whether it's fixing a leaky faucet, painting your home, or organizing an event, our platform connects you with skilled professionals who deliver reliable services with utmost precision and efficiency.
        </p>
      </div>
      {/* End of General Description */}

      {/* Second Banner Section */}
      <div className="banner2">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // marginTop: "25px",
            flexWrap: "nowrap",
            overflowX: "auto",
          }}
        >
          <div className="box">
            {images2.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${index + 1}`}
                style={{ width: "450px", height: "auto", margin:'5px'}}
              />
            ))}
          </div>
        </div>
      </div>
      {/* End of Second Banner Section */}
      <div className="reviews-and-ratings">
      <h2 style={{ fontSize: "1.5rem",marginBottom: "1.0rem",fontFamily: 'Roboto, sans-serif', color: "orange",textAlign: 'center', marginTop: '20px' }}>Reviews and Ratings</h2>
      <div className="review-cards">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="customer-info">
              <span className="customer-name">{review.customer}</span>
              <span className="rating-stars">{'★'.repeat(review.rating)}</span>
            </div>
            <div className="review-text">{review.text}</div>  
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Home;
