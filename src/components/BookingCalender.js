import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import './BookingCalender.css';
import PaymentDetails from './PaymentDetails';

const BookingCalendar = (customer, setCustomer) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isAppointmentConfirmed, setIsAppointmentConfirmed] = useState(false);
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [repairRequests, setRepairRequests] = useState([]);
  const nested_customer = customer.customer;
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const response = await fetch(`http://localhost:8000/professionals/?id=${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch professional details");
        }

        const data = await response.json();
        setProfessional(data.professional);
      } catch (error) {
        console.error("Error fetching professional details:", error);
      }
    };

    fetchProfessional();
    fetchRepairServices();
  }, [id]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAppointmentConfirmation = () => {
    setIsAppointmentConfirmed(true);
    setSelectedDate(null);
    setSelectedTime(null);
  };
  const fetchRepairServices = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/get_service_requests?professional_id=${id}`
      );
      const data = await response.json();
      setRepairRequests(data.service_requests); // Assuming service_requests is the key for the array of services in the response
      console.log(data);
    } catch (error) {
      console.error("Error fetching repair services:", error);
    }
  };
  const isDateBlocked = (date) => {
    // Check if the date is already present in the existing service requests
    const existingDates = repairRequests.map(request => new Date(request.date));
  
    // Block the date if it matches any existing dates
    return existingDates.some(existingDate =>
      date.getFullYear() === existingDate.getFullYear() &&
      date.getMonth() === existingDate.getMonth() &&
      date.getDate() === existingDate.getDate()
    );
  };

  const renderTimeSlots = () => {
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
  console.log(customer);
  return (
    <div className='whole-div'>
      <div className="booking-section">
        <div className="booking-calendar">
          {professional && (
            <div className="professional-details">
              <h2>Selected Professional</h2>
              <div className="professional-info">
                <p>{customer.name}</p>
                <p><strong>Name:</strong> {professional.user_name}</p>
                <p><strong>Price per Hour:</strong> ${professional.price_per_hour}</p>
                {/* You can display other professional details here */}
              </div>
            </div>
          )}
          <h2>Select Date and Time for Appointment</h2>
          <div className="date-picker">
            <DatePicker
              selected={selectedDate}
              onChange={date => handleDateSelect(date)}
              dateFormat="MM/dd/yyyy"
              placeholderText="Select a date"
              filterDate={date => !isDateBlocked(date)} 
            />
          </div>

          {selectedDate && (
            <div>
              <h3>Available Time Slots for {selectedDate.toLocaleDateString()}</h3>
              {renderTimeSlots()}
            </div>
          )}

          {selectedDate && selectedTime && (
            <>
             <h3>Selected Time: {selectedTime}</h3>
             <h3>Selected Date: {selectedDate.toLocaleDateString()}</h3>
            {/* <button className="confirm-btn" onClick={handleAppointmentConfirmation}>
              Confirm Appointment
            </button> */}
            </>
          )}

          {isAppointmentConfirmed && (
            <p className="confirmation-message">Your appointment is confirmed, please add your Payment Details and click on "Proceed to Pay" button.</p>
          )}
        </div>
      </div>
          <div className='payment-card'>
          <PaymentDetails customer={nested_customer}  selectedDate={selectedDate} selectedTime = {selectedTime} professional ={professional}/>
          </div>
      
    </div>
  );
};

export default BookingCalendar;
