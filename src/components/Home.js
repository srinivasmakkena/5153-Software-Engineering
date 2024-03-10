import React, { useState } from "react";
import Homepage_image from "./assets/Homepage_image.png";
import * as BannerImages from "./assets";
import * as Banner2Images from "./assets/secondbanner";
import ReviewsAndRatings from "./reviews_ratings";

function Home() {
  const [startIndex, setStartIndex] = useState(0);
  const images = Object.values(BannerImages);
  const images2 = Object.values(Banner2Images);
  const groupSize = 3;

  const handleNext = () => {
    if (startIndex + groupSize < images.length) {
      setStartIndex((prevIndex) => prevIndex + groupSize);
    }
  };

  const handlePrev = () => {
    if (startIndex - groupSize >= 0) {
      setStartIndex((prevIndex) => prevIndex - groupSize);
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
          <h5> RESTORING EXCELLENCE,REPAIRING WITH PRECISION</h5>
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
      {/* Banner Section */}
      <div className="banner">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "65px",
            position: "relative",
          }}
        >
          {images.slice(startIndex, startIndex + groupSize).map((image, index) => (
            <img
              key={startIndex + index}
              src={image}
              alt={`${startIndex + index + 1}`}
              style={{
                width: "450px",
                height: "auto",
                margin: "0 10px",
                marginBottom: "20px",
              }}
            />
          ))}
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "white",
                border: "none",
                fontSize: "20px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {"<"}
            </button>
          )}
          {startIndex + groupSize < images.length && (
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "white",
                border: "none",
                fontSize: "20px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {">"}
            </button>
          )}
        </div>
      </div>

      {/* Heading */}
      <h3
        style={{
          fontSize: "2.0rem",
          marginBottom: "0.6rem",
          fontFamily: "Roboto, sans-serif",
          color: "orange",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        "We excel in disassembling, relocating household appliances to new residences, and meticulously reassembling them to perfection."
      </h3>

      {/* Second Banner Section */}
      <div className="banner2">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          <div className="box">
            {images2.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${index + 1}`}
                style={{ width: "450px", height: "auto", margin: "0 10px" }}
              />
            ))}
          </div>
        </div>
      </div>
      <ReviewsAndRatings />
    </div>
  );
}
export default Home;
