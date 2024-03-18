import React, { useState, useEffect } from 'react';
import './Servicesstyles.css'; // Import CSS for styling
import { Link } from 'react-router-dom';

const Services = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/get_categories/');
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
          <Link key={category.id} to={`/categories/${category.id}`} className="service-card">
            <img src={`http://localhost:8000${category.image_url}`} alt={category.name} className="category-image" />
            <h3 className="category-name">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Services;
