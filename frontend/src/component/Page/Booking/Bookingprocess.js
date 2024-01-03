import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchCarriages,
  fetchSeats,
  createBookingProcess,
} from "../../../services/bookingprocess";
import "./Bookingprocess.css";

const CarriageComponent = () => {
  const [carriages, setCarriages] = useState([]);
  const [seats, setSeats] = useState([]);
  const [trainId, setTrainId] = useState(null);
  const [selectedCarriageId, setSelectedCarriageId] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [chosenSeatId, setChosenSeatId] = useState(null);
  const [showSeats, setShowSeats] = useState(false);
  const [hoveredCarriage, setHoveredCarriage] = useState(null);

  useEffect(() => {
    const storedTrainId = localStorage.getItem("selectedTrainId");
    const storedCarriageId = localStorage.getItem("selectedCarriageId");
    const storedRouteId = localStorage.getItem("selectedRouteId");

    setTrainId(storedTrainId);
    setSelectedCarriageId(storedCarriageId);
    setSelectedRouteId(storedRouteId);

    if (storedTrainId) {
      fetchData(storedTrainId);
    } else {
      console.error("No train_id found in local storage.");
    }

    if (storedCarriageId) {
      fetchSeatsData(storedCarriageId, storedRouteId);
    }
  }, []);

  const fetchData = async (trainId) => {
    const carriagesData = await fetchCarriages(trainId);
    setCarriages(carriagesData);
  };

  const fetchSeatsData = async (carriageId, routeId) => {
    const seatsData = await fetchSeats(trainId, carriageId, routeId);
    setSeats(seatsData);
  };

  const handleCarriageButtonClick = (carriageId, price) => {
    localStorage.setItem("selectedCarriageId", carriageId);
    localStorage.setItem("selectedCarriagePrice", price);
    setSelectedCarriageId(carriageId);
    setChosenSeatId(null);
    fetchSeatsData(carriageId, selectedRouteId);
    setShowSeats(true);
  };

  const getSeatButtonStyle = (status, seatId) => {
    switch (status) {
      case "Is booked":
        return { backgroundColor: "red", color: "white" };
      case "Available":
        return seatId === chosenSeatId
          ? { backgroundColor: "yellow", color: "black" }
          : { backgroundColor: "green", color: "white" };
      case "CHOOSING":
        return { backgroundColor: "yellow", color: "black" };
      default:
        return {};
    }
  };

  const handleSeatButtonClick = (status, seatId) => {
    if (status === "Is booked") {
      alert("This seat is already booked!");
    } else if (status === "Available" || status === "CHOOSING") {
      setChosenSeatId((prevChosenSeatId) =>
        prevChosenSeatId === seatId ? null : seatId
      );

      localStorage.setItem("selectedSeatId", seatId);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const bookingData = {
      customer_id: localStorage.getItem("selectedCustomerId"),
      route_id: localStorage.getItem("selectedRouteId"),
      train_id: localStorage.getItem("selectedTrainId"),
      seat_id: localStorage.getItem("selectedSeatId"),
      carriage_id: localStorage.getItem("selectedCarriageId"),
      station_id: localStorage.getItem("selectedStationId"),
      booking_date: new Date().toISOString().split("T")[0],
      payment_method: "Online",
      payment_status: "Not yet",
      total_price: (
        parseFloat(localStorage.getItem("selectedTrainPrice")) +
        parseFloat(localStorage.getItem("selectedCarriagePrice"))
      ).toFixed(2),
      passenger_full_name: event.target.passengerName.value,
      passenger_citizen_identification_card: event.target.passengerIdCard.value,
      passenger_phonenumber: event.target.passengerPhoneNumber.value,
    };

    try {
      const response = await createBookingProcess(bookingData);
      console.log("Booking response:", response);

      const bookingId = response.booking_id;

      window.location.href = `/bookingdetail/${bookingId}`;
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  return (
    <div style={{ paddingTop: "6%" }}>
      <div>
        <h2 style={{ marginLeft: "5%" }}>Carriages</h2>
        <div className="carriages__content">
          {carriages.map((carriage) => (
            <div
              className="carriages__button"
              key={carriage.carriageId}
              onMouseLeave={() => setHoveredCarriage(null)}
              onMouseEnter={() => setHoveredCarriage(carriage.carriage_id)}
            >
              <button
                onClick={() =>
                  handleCarriageButtonClick(
                    carriage.carriage_id,
                    carriage.price
                  )
                }
                className={
                  carriage.carriage_id === selectedCarriageId ? "selected" : ""
                }
              >
                {carriage.carriage_id} - {carriage.carriage_type}
              </button>
              <div
                className={`carriage-price ${
                  hoveredCarriage === carriage.carriage_id ? "active" : ""
                }`}
              >
                Price: {carriage.price}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="selected__form__seat">
        <div className="seat__form">
          {showSeats && selectedCarriageId && (
            <div className="seat__detail">
              <h2>Seats for Carriage {selectedCarriageId}</h2>
              <div className="seat__width">
                {seats.map((seat) => (
                  <div
                    key={seat.seatId}
                    style={{ width: "30%", marginRight: "2%" }}
                  >
                    <button
                      style={getSeatButtonStyle(seat.status, seat.seat_id)}
                      onClick={() =>
                        handleSeatButtonClick(seat.status, seat.seat_id)
                      }
                    >
                      {seat.seat_id}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="form__detail">
          {showSeats && selectedCarriageId && (
            <>
              <h2>Passenger Detail</h2>
              <form onSubmit={handleSubmit} style={{ marginBottom: "5%" }}>
                <h4>Passenger name: </h4>
                <input type="text" name="passengerName" required />
                <h4>Passenger citizen identification card: </h4>
                <input type="text" name="passengerIdCard" required />
                <h4>Passenger phone number: </h4>
                <input type="text" name="passengerPhoneNumber" required />
                <button type="submit">Confirm / Submit</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarriageComponent;
