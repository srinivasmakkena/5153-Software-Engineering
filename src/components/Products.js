import React, { useState } from 'react';
import "./Products.css"
import productImage from './assets/no_products.png'; // Import your login image here

function Products() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:8000/get_products/?query=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        setProducts(data);
        setLoading(false);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
        setError('Error fetching products. Please try again.');
      });
  };

  return (
    <div className="container">
      <div className="search-form">
        <div className="search-container">
          <input type="text" placeholder="Search..." value={query} onChange={(text_event) => setQuery(text_event.target.value)} />
          <button type="button" onClick={handleSearch}><i class="fa fa-search" aria-hidden="true"></i></button>
        </div>
      </div>
      <div className="product-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
          ) : products.length === 0 ? (
            <div className="no-product">
              <img src={productImage} alt="No products found" />
              {/* <img src="https://img.freepik.com/premium-vector/curious-woman-searching-gesture-looking-far-away-with-hand-her-head-trying-find-something_199628-477.jpg" alt="No products found" /> */}
              <p>No products found. Try searching for something to get started!</p>
            </div>
          ) : (
            products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image_url} alt={product.name} />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p>Price: $ {product.price}</p>
                  <button>Add to Cart</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

export default Products;