import React, { useState, useEffect } from 'react';
import './Servicesstyles.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const Services = ({ location }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//get_categories/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleLinkClick = (event) => {
    if (!location) {
      event.preventDefault(); // Prevent the default link behavior (redirection)
      setShowModal(true); // Show the modal if location is empty
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="services-container">
      <h2>Our Services</h2>
      <div className="services-grid">
        {/* Map over the categories array and render a Link for each category */}
        {categories.map(category => (
          <Link
            key={category.id}
            to={`/categories/${category.id}?location=${location}`}
            className="service-card"
            onClick={handleLinkClick} // Attach the click event handler
          >
            <img
              src={`https://quicklocalfixapi.pythonanywhere.com/${category.image_url}`}
              alt={category.name}
              className="category-image"
            />
            <h3 className="category-name">{category.name}</h3>
          </Link>
        ))}
      </div>
      {/* Modal for prompting user to fill in location */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Please fill in your location at top.</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
