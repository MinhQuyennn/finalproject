import React, { useEffect, useState } from "react";
import style from "./style.css";
import { useNavigate } from "react-router-dom";

function ViewBooking() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleCancelBooking = (bookingId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (isConfirmed) {
      fetch(`http://localhost:8081/CancelBooking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Cancellation Response:", data);
          fetchData();
        })
        .catch((error) => {
          console.error("Error cancelling booking:", error);
        });
      alert("Booking cancelled successfully");
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    return formattedDate;
  };

  const fetchData = () => {
    const url = `http://localhost:8081/api/listofticket`;

    fetch(url)
      .then((response) => response.json())
      .then((apiData) => {
        console.log("API Response:", apiData);
        setData(apiData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <section className="contentP">
      <div className="text1">Manage Ticket</div>
      <div className="containerP">
        <div className="employeeList">
          <table className="employeeList1">
            <thead>
              <tr>
                <th>Booking ID </th>
                <th>Customer ID</th>
                <th>Route ID</th>
                <th>Train ID</th>
                <th>Carriage ID</th>
                <th>Seat ID</th>
                <th>Departure date</th>
                <th>Departure time</th>
                <th>Departure station</th>
                <th>Passenger fullname</th>
                <th>Passenger citizenidentification</th>
                <th>Passenger phonenumber</th>
                <th>Passenger method</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data !== undefined && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.booking_id}>
                    <td>{item.booking_id}</td>
                    <td>{item.route_id}</td>
                    <td>{item.train_id}</td>
                    <td>{item.carriage_id}</td>
                    <td>{item.seat_id}</td>
                    <td>{item.price}</td>
                    <td>{formatDate(item.departure_date)}</td>
                    <td>{item.departure_time}</td>
                    <td>{item.departure_station}</td>
                    <td>{item.passenger_full_name}</td>
                    <td>{item.passenger_citizen_identification_card}</td>
                    <td>{item.passenger_phonenumber}</td>
                    <td>{item.payment_method}</td>
                    <td>{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    {data === null ? "Loading..." : "No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ViewBooking;
