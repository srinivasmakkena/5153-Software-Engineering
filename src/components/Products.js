import React, { useState, useEffect} from 'react';
import "./Products.css"
import productImage from './assets/no_products.png'; // Import your login image here

function Products({ customer, ProUser, cartItems, setCartItems }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const fetchCartDetails = async () => {
    try {
      if (!customer || !customer.id) {
        return;
      }
      const response = await fetch(`http://localhost:8000/get_cart/?customer_id=${customer.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart details');
      }
      const data = await response.json();
      setCartItems(data.cart_items);
      const productIds = data.cart_items.map(item => item.id);
      setAddedProducts(productIds);
      
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  };

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

  const addToCart = (productId) => {
    fetch('http://localhost:8000/add_to_cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `customer_id=${customer.id}&product_id=${productId}`
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add item to cart');
        }
        fetchCartDetails(); // Update cart items after adding to cart
        setAddedProducts([...addedProducts, productId]);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
        // Optionally, you can handle the error here (e.g., show an error message)
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
                  <button  className={addedProducts.includes(product.id) ? 'added' : ''} onClick={() => addToCart(product.id)} disabled={addedProducts.includes(product.id)}>
                    {addedProducts.includes(product.id) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

export default Products;
