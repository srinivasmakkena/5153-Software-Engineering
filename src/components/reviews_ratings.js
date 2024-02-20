import React from 'react';

const ReviewsAndRatings = () => {
  // Dummy data for reviews and ratings
  const reviews = [
    { id: 1, customer: 'John Doe', rating: 5, text: 'Great service, fixed my appliances quickly!' },
    { id: 2, customer: 'Jane Smith', rating: 4, text: 'Excellent price transperancy, highly recommend!' },
    { id: 3, customer: 'alice', rating: 5, text: 'Adding Parts to the cart and tracking status is so cool !!' },
    { id: 4, customer: 'John Doe', rating: 5, text: 'Great service, fixed my appliances quickly!' },
    { id: 5, customer: 'Jane Smith', rating: 4, text: 'Excellent price transperancy, highly recommend!' },
    { id: 6, customer: 'alice', rating: 5, text: 'Adding Parts to the cart and tracking status is so cool !!' },
    { id: 7, customer: 'John Doe', rating: 5, text: 'Great service, fixed my appliances quickly!' },
    { id: 8, customer: 'Jane Smith', rating: 4, text: 'Excellent price transperancy, highly recommend!' },
    // Add more reviews as needed
  ];

  return (
    <div className="reviews-and-ratings">
      <h2 style={{ fontSize: "1.5rem",marginBottom: "1.0rem",fontFamily: 'Roboto, sans-serif', color: "orange",textAlign: 'center', marginTop: '20px' }}>Reviews and Ratings</h2>
      <div className="review-cards">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="customer-info">
              <span className="customer-name">{review.customer}</span>
              <span className="rating-stars">{'★'.repeat(review.rating)}</span>
            </div>
            <div className="review-text">{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ReviewsAndRatings;
