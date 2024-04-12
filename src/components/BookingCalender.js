import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingCalender.css';

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isAppointmentConfirmed, setIsAppointmentConfirmed] = useState(false);

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Function to handle time selection
  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentConfirmation = () => {
    setIsAppointmentConfirmed(true);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Function to render available time slots based on selected date
  const renderTimeSlots = () => {
    // Dummy time slots for demonstration
    const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

    return (
      <div className="time-slots">
        {timeSlots.map((time, index) => (
          <button
            key={index}
            className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className='whole-div'>
      <div className="booking-section">
        <div className="booking-calendar">
          <h2>Select Date and Time for Appointment</h2>
          {/* Date picker for selecting date */}
          <div className="date-picker">
            <DatePicker
              selected={selectedDate}
              onChange={date => handleDateSelect(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a date"
            />
          </div>

          {/* Render available time slots */}
          {selectedDate && (
            <div>
              <h3>Available Time Slots for {selectedDate.toLocaleDateString()}</h3>
              {renderTimeSlots()}
            </div>
          )}

          {/* Button to confirm appointment */}
          {selectedDate && selectedTime && (
            <button className="confirm-btn" onClick={handleAppointmentConfirmation}>
              Confirm Appointment
            </button>
          )}

          {isAppointmentConfirmed && (
            <p className="confirmation-message">Your appointment is confirmed, please add your Payment Details and click on "Proceed to Pay" button.</p>
          )}
        </div>
      </div>

      {/* Payment card */}
      <div className="payment-card">
        <h2>Payment Details</h2>
        <p></p>
        <button className="proceed-to-pay-btn">Proceed to Pay</button>
      </div>
    </div>
  );
};

export default BookingCalendar;
