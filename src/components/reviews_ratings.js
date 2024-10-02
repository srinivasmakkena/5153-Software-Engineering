import React, { useState, useEffect } from 'react';
import './ReviewsAndRatings.css';

const ReviewsAndRatings = ({ customer, Pid }) => {
  const [reviews, setReviews] = useState([]);
  const [newReviewText, setNewReviewText] = useState('');
  const [selectedRating, setSelectedRating] = useState(5); // Default rating value
  const [showInput, setShowInput] = useState(true);
  const [repairRequests, setRepairRequests] = useState([]);
  const [showInputBlock, setShowInputBlock] = useState(true);
  useEffect(() => {
    fetchReviews();
    fetchRepairRequests();
  }, [Pid]);
  useEffect(() => {
    const userCanReview = repairRequests.some(request => request.customer_id === customer.customer.name);
    console.log(userCanReview,repairRequests,customer);
    setShowInputBlock(userCanReview);
  }, [repairRequests, customer]);
  const fetchReviews = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//fetch-reviews/?repair_person_id=${Pid}`);

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      console.log(data);
      if (data.reviews) {
        setReviews(data.reviews);
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const fetchRepairRequests = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//get_service_requests?professional_id=${Pid}`);

      if (!response.ok) {
        throw new Error("Failed to fetch repair requests");
      }

      const data = await response.json();
      console.log(data);
      setRepairRequests(data.service_requests);
    } catch (error) {
      console.error("Error fetching repair requests:", error);
    }
  };
  useEffect(() => {
    const userReviewed = reviews.some(review => review.review_customer.id === customer.customer.id);
    console.log(userReviewed,reviews,customer);
    setShowInput(!userReviewed);
  }, [reviews, customer]);

  const handleAddReview = async () => {
    try {
      const response = await fetch(`https://quicklocalfixapi.pythonanywhere.com//add-review/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ professional_id: Pid, text: newReviewText, rating: selectedRating, customer_id: customer.customer.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add review");
      }

      fetchReviews();
      setNewReviewText('');
      setSelectedRating(5); // Reset rating selection
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="reviews-and-ratings-professional">
      {showInputBlock && (
        <>
        {showInput ? (
        <div className="add-review-container-professional">
          <div className="input-title"><b>Write your Review:<i class="fa fa-star-half-o" aria-hidden="true"></i></b></div>
          <textarea
            type="text"
            value={newReviewText}
            onChange={(e) => setNewReviewText(e.target.value)}
            placeholder="Add your review..."
          />
          <select value={selectedRating} onChange={(e) => setSelectedRating(parseInt(e.target.value))}>
            {[1, 2, 3, 4, 5].map(rating => (
              <option key={rating} value={rating}>{'★'.repeat(rating)}</option>
            ))}
          </select>
          {!newReviewText.trim() || selectedRating  && <button onClick={handleAddReview} className='review-button-add'>Add Review</button>}
        </div>
      ) : (
        <div className="reviewed-message">You have already reviewed this professional.</div>
      )}
      </>
    )}
      <h2 className="reviews-heading-professional">Reviews and Ratings</h2>
      <div className="review-cards-professional">
      {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review} className="review-card-professional">
              <div className="customer-info-professional">
                <span className="customer-name-professional">{review.review_customer.user_name}</span>
                <span className="rating-stars-professional">{'★'.repeat(review.review_rating)}</span>
              </div>
              <div className="review-text-professional">&emsp;{review.review_text}</div>
            </div>
          ))
        ) : (
          <div className="no-reviews">No reviews yet.</div>
        )}
      </div>
    </div>
  );
};

export default ReviewsAndRatings;
