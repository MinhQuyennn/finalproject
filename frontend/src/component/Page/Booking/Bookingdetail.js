import React, { useState, useEffect } from "react";
import { getBookingProcessById } from "../../../services/bookingdetail";
import { useParams } from "react-router-dom";

function Bookingdetail() {
  const [bookingData, setBookingData] = useState(null);
  const { booking_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingProcessById(booking_id);
        setBookingData(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        // Handle the error...
      }
    };

    fetchData();
  }, [booking_id]);

  const formatLocalDate = (utcDate) => {
    const options = {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(utcDate).toLocaleString("en-US", options);
  };

  return (
    <div>
      <h2>Booking Details</h2>
      {bookingData ? (
        <div>
          <p>Booking ID: {bookingData.booking_id}</p>
          <p>Train ID: {bookingData.train_id}</p>
          <p>Route ID: {bookingData.route_id}</p>
          <p>Seat ID: {bookingData.seat_id}</p>
          <p>Carriage ID: {bookingData.carriage_id}</p>
          <p>Booking Date: {formatLocalDate(bookingData.booking_date)}</p>
          <p>Passenger Full Name: {bookingData.passenger_full_name}</p>
          <p>
            Passenger Citizen ID Card:{" "}
            {bookingData.passenger_citizen_identification_card}
          </p>
          <p>Passenger Phone Number: {bookingData.passenger_phonenumber}</p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}

export default Bookingdetail;
