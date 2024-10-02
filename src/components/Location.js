import React, { useState } from 'react';
import pro from "./assets/Pro_image.png";
import "./Location.css";

const Location = () => {
  const [zipCode, setZipCode] = useState('');
  const [searchClicked, setSearchClicked] = useState(false); // State to track if search button is clicked

  // Dummy data for professionals
  const professionals = [
    {
      id: 1,
      name: "John Doe",
      expertise: "Plumber",
      hourlyRate: "$50",
      rating: 4 // Rating out of 5
    },
    {
      id: 2,
      name: "Jane Smith",
      expertise: "Electrician",
      hourlyRate: "$60",
      rating: 3.5 // Rating out of 5
    },
    // Add more professionals as needed
  ];

  // Function to render star ratings based on the rating value
  const renderStarRatings = (rating) => {
    const stars = [];
    const maxRating = 5; // Maximum rating value
    for (let i = 1; i <= maxRating; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star yellow">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9733;</span>);
      }
    }
    return stars;
  };

  const handleSearch = () => {
    // console.log('Searching for professionals with zip code:', zipCode);
    // Implement your search logic here
    setSearchClicked(true); // Set searchClicked to true when search button is clicked
  };

  return (
    <div>
      <div className="location-container">
        <h2>Search for Professionals by Zip Code</h2>
        <div className="search-bar">
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter Zip Code"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {searchClicked && ( // Conditionally render the professional list only if searchClicked is true
        <div>
          <h2>Search Results</h2>
          <div className="professional-cards">
            {/* Map through the array of professionals and render each professional card */}
            {professionals.map((professional) => (
              <div key={professional.id} className="professional-card">
                <img src={pro} alt="Professional" />
                <h3>{professional.name}</h3>
                <p>Expertise: {professional.expertise}</p>
                <p>Hourly Rate: {professional.hourlyRate}</p>
                <div className="ratings">
                  <span>Ratings: </span>
                  {renderStarRatings(professional.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Location;
