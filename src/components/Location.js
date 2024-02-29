import React, { useState } from 'react';

const Location = () => {
  const [zipcode, setZipcode] = useState('');
  const [professionals, setProfessionals] = useState([]);

  const handleSearch = () => {
    // Here you would perform a search based on the entered zipcode
    // For now, we'll just populate the list with dummy data
    const dummyProfessionals = [
      {
        name: 'John Doe',
        expertise: 'Plumber',
        starRatings: 4.5,
        hourlyCharges: '$50'
      },
      {
        name: 'Jane Smith',
        expertise: 'Electrician',
        starRatings: 4.8,
        hourlyCharges: '$60'
      },
      {
        name: 'Michael Johnson',
        expertise: 'Carpenter',
        starRatings: 4.2,
        hourlyCharges: '$55'
      },
      // Add more dummy professional data as needed
    ];

    setProfessionals(dummyProfessionals);
  };

  return (
    <div>
      <h2>Search by Location</h2>
      <div>
        <input
          type="text"
          placeholder="Enter zipcode"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h3>Results:</h3>
        <ul>
          {professionals.map((professional, index) => (
            <li key={index}>
              <p>Name: {professional.name}</p>
              <p>Expertise: {professional.expertise}</p>
              <p>Star Ratings: {professional.starRatings}</p>
              <p>Hourly Charges: {professional.hourlyCharges}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Location;
