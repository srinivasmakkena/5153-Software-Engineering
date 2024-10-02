import React, { useState, useEffect } from "react";
import DashboardProducts from "./DashboardProducts"; // Import the Products component
import "./ProductManagement.css";
import { toast } from 'react-toastify';

const ProductManagement = ({ professionalData }) => {
  const [usersWithRequests, setUsersWithRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [SelectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchUsersWithRequests = async () => {
      try {
        const response = await fetch(
          `https://quicklocalfixapi.pythonanywhere.com//get_service_requests?professional_id=${professionalData.id}`
        );
        const data = await response.json();
        // Filter out users with pending or in-progress service requests
        const users = data.service_requests
          .filter(
            (request) =>
              request.status !== "Completed" && request.status !== "Cancelled"
          )
          .map((request) => request.customer_id);
        // Deduplicate users
        const uniqueUsers = Array.from(new Set(users));
        setUsersWithRequests(uniqueUsers);
      } catch (error) {
        console.error("Error fetching users with requests:", error);
      }
    };

    if (professionalData) {
      fetchUsersWithRequests();
    }
  }, [professionalData]);

  useEffect(() => {
    fetchCart();
  }, [SelectedCustomer]);

  useEffect(() => {
    const fetchUserId = async () => {
      if (selectedUser) {
        try {
          const response = await fetch(
            `https://quicklocalfixapi.pythonanywhere.com//get_user_by_name/?user_name=${selectedUser}`
          );
          const data = await response.json();
          if (data.status === "200") {
            setSelectedCustomer(data.customer);
          } else {
            console.error("Error fetching user ID:", data.error);
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
        }
      }
    };
    fetchUserId();
  }, [selectedUser]);

  const handleAddToCart = async (product) => {
    if (SelectedCustomer) {
      try {
        const formData = new FormData();
        formData.append("customer_id", SelectedCustomer.id);
        formData.append("product_id", product.id);

        const response = await fetch("https://quicklocalfixapi.pythonanywhere.com//add_to_cart/", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.status === "200") {
          setCartItems(data.cart_items);
          console.log(`Added ${product.name} to ${selectedUser}'s cart`);
        } else {
          console.error("Error adding item to cart:", data.error);
        }
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      console.error("No user selected");
    }
  };
  const fetchCart = async () => {
    if (SelectedCustomer) {
      try {
        const response = await fetch(
          `https://quicklocalfixapi.pythonanywhere.com//get_cart/?customer_id=${SelectedCustomer.id}`
        );
        const data = await response.json();
        if (data.status === "200") {
          setCartItems(data.cart_items);
        } else {
          console.error("Error fetching cart items:", data.error);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    }
  };
  const removeFromCart = async (productId) => {
    try {
      const response = await fetch("https://quicklocalfixapi.pythonanywhere.com//remove_from_cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `customer_id=${SelectedCustomer.id}&product_id=${productId}`,
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      // After successful deletion, update the cartItems state
      fetchCart();
      toast.warning('Item removed from cart!', {});
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };
  return (
    <div className="product-management-container">
      <div className="product-list-dashboard">
        <h2>Product Management</h2>
        <div className="repair-requests">
          <div className="select-user-dashboard">
            <h3>Select a User</h3>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Select User</option>
              {usersWithRequests.map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          {SelectedCustomer && (
            <DashboardProducts
              customer={SelectedCustomer}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          )}
        </div>
      </div>
      {SelectedCustomer && cartItems.length > 0 && (
        <div className="dashboard-cart">
          <h2> {SelectedCustomer.user_name}'s - Cart</h2>
          <div className="dashboard-cart-items">
            {cartItems.map((item) => (
              <div className="dashboard-cart-item" key={item.id}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="dashboard-product-image-cart"
                />
                <div className="dashboard-product-info">
                  <p className="dashboard-product-name">{item.name}</p>
                  <p className="dashboard-product-price">
                    Price: ${item.price}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {(!SelectedCustomer || cartItems.length === 0) && (
        <div className="dashboard-cart">
          {SelectedCustomer ? (
            <>
              <h2> {SelectedCustomer.user_name}'s - Cart</h2>
              <p>{SelectedCustomer.user_name} has no items in the cart.</p>
            </>
          ) : (
            <p>No user selected.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
