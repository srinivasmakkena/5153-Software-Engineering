import React, { useState } from 'react';

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
    <div className="search-form">
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="button" onClick={handleSearch}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {products.map(product => (
            <div key={product.id}>
              <h3>{product.fields.name}</h3>
              <p>Price: {product.fields.price}</p>
              <img src={product.fields.image_url} alt={product.fields.name} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
