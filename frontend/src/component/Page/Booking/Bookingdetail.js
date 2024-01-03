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
    <div style={{ paddingTop: "6%", paddingLeft: "8%" }}>
      <h2 style={{ paddingBottom: "1%", color: "#fc935a" }}>Booking Details</h2>
      {bookingData ? (
        <div className="booking__detail__info">
          <div
            style={{ width: "100%", display: "flex", alignItems: "baseline" }}
          >
            <span className="booking_id">
              {" "}
              Booking ID: {bookingData.booking_id}
            </span>
            <span
              style={{
                marginLeft: "5%",
                color: "white",
                alignItems: "baseline",
                fontSize: "10px",
              }}
            >
              Booking Date: {formatLocalDate(bookingData.booking_date)}
            </span>
          </div>
          <div className="booking__info">
            <p id="train__id">Train ID: {bookingData.train_id}</p>
            <p id="route__id">Route ID: {bookingData.route_id}</p>
            <p id="seat__id">Seat ID: {bookingData.seat_id}</p>
            <p id="carriage__id">Carriage ID: {bookingData.carriage_id}</p>
          </div>
          <div className="passenger__info">
            <div style={{ display: "flex" }}>
              <p id="c__name">Passenger Name: </p>
              <p id="c__name">{bookingData.passenger_full_name}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p id="c__id">Passenger Citizen Identification Card: </p>
              <p id="c__id">
                {bookingData.passenger_citizen_identification_card}
              </p>
            </div>
            <div style={{ display: "flex" }}>
              <p id="c__phone">Passenger Phone Number: </p>
              <p id="c__phone">{bookingData.passenger_phonenumber}</p>
            </div>
          </div>
          <p></p>
          <p style={{ marginLeft: "61%", fontSize: "35px", fontWeight: "700" }}>
            Total Price: {bookingData.total_price}
          </p>
        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
}

export default Bookingdetail;
