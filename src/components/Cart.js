import React, { useState, useEffect } from 'react';
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import cartImg from "./assets/empty-cart.png";

const CartPage = ({ customer, proUser, setglobalCartItems }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold the total price
  const navigate = useNavigate();

  // Extracting user ID from customer object
  const userId = customer.id;

  // Function to fetch cart details from the backend
  const fetchCartDetails = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//get_cart/?customer_id=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart details');
      }
      const data = await response.json();
      if (data && data.cart_items) {
        setCartItems(data.cart_items);
        // Calculate total price
        let totalPrice = 0;
        data.cart_items.forEach(item => {
          totalPrice += item.price * item.quantity;
        });
        setTotalPrice(totalPrice);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error('Error fetching cart details:', error);
    }
  };
  
  // Call fetchCartDetails when component mounts
  useEffect(() => {
    fetchCartDetails();
  }, [userId]); // Fetch again if userId changes

  // Function to remove an item from the cart
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//remove_from_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `customer_id=${userId}&product_id=${productId}`
      });
      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }
      // After successful deletion, update the cartItems state
      fetchCartDetails();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Function to add quantity of an item in the cart
  const addQuantity = async (productId) => {
    try {
      const response = await fetch('https://quicklocalfixapi.pythonanywhere.com//add_to_cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `customer_id=${userId}&product_id=${productId}`
      });
      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }
      // After successful addition, update the cartItems state
      fetchCartDetails();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Navigate to the products page when the button is clicked
  const goToProductsPage = () => {
    navigate('/Products');
  };
  const goToCheckout = () => {
    // Redirect to address selection page
    navigate('/AddressSelection');
  };
  return (
    <div className="cart-page">
      <h2 className="cart-heading">Shopping Cart</h2>
      <div className="cart-items-container">
        {cartItems.length === 0 ? (
          <>
            <img src={cartImg} alt="empty cart image" className="empty-cart-image" />
            <p>Your cart is empty.</p>
          </>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">${item.price} * {item.quantity} = ${(item.price *item.quantity).toFixed(2)}</p>
                <div className="quantity-controls">
                  <button className="quantity-btn remove-btn" onClick={() => removeFromCart(item.id)}>-</button>
                  <span className="item-count">{item.quantity}</span>
                  <button className="quantity-btn add-btn" onClick={() => addQuantity(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
          {cartItems.length > 0 && <div className="total-price">Total Price: ${totalPrice.toFixed(2)}</div>}
      </div>
      <div className="cart-actions">
        <button className="continue-shopping-btn" onClick={goToProductsPage}>Continue Shopping</button>
        {cartItems.length > 0 && (
          <button className="checkout-btn" onClick={goToCheckout}>Checkout</button>
        )}
      </div>
     
    </div>
  );
};

export default CartPage;
