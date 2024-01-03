import React, { useState, useEffect } from "react";
import { getBookingProcessById } from "../../../services/bookingdetail";
import { useParams } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bookingdetail() {
  const [bookingData, setBookingData] = useState(null);
  const { booking_id } = useParams();
  const [pdfBlob, setPdfBlob] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const station_id = localStorage.getItem("selectedStationId");

  const generateTicketPDF = async (bookingData) => {
    console.log(bookingData);
    const validBookingData = {
      booking_id: bookingData.booking_id,
      departure_date: bookingData.departure_date,
      departure_station: bookingData.departure_station,
      arrival_station: bookingData.arrival_station,
      passenger_full_name: bookingData.passenger_full_name,
      departure_time: bookingData.departure_time,
      price: bookingData.total_price,
      seat_id: bookingData.seat_id,
      carriage_id: bookingData.carriage_id,
      route_id: bookingData.route_id,
      train_id: bookingData.train_id,
      station_id: station_id,
      passenger_citizen_identification_card:
        bookingData.passenger_citizen_identification_card || null,
      passenger_phonenumber: bookingData.passenger_phonenumber,
      status: bookingData.status,
    };
    console.log(validBookingData);
    try {
      const response = await fetch("http://localhost:8081/api/ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validBookingData), // Use the validated data
      });

      // Handle the PDF response from the backend
      const pdfBlob = await response.blob(); // Assuming the response is a Blob (PDF)
      const url = URL.createObjectURL(pdfBlob);
      setDownloadUrl(url); // Set the download URL to trigger the download
    } catch (error) {
      console.error("Error generating ticket PDF:", error);
      // Handle any errors while generating the ticket PDF
      // Display an error message to the user
      // setError("Error generating ticket PDF. Please try again.");
    }
  };

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
  console.log(bookingData);

  const formatLocalDate = (utcDate) => {
    const options = {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(utcDate).toLocaleString("en-US", options);
  };

  const initialOptions = {
    clientId:
      "AQnOTzKEYtfCByVXFQy5pVa2-R2H8eiOQ-LaCNSs5-17Fwkx4dsKt0H5AU_Js7HhrYF8YwZ0GgBBsV-j",
    currency: "USD",
    intent: "capture",
  };

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  const handleApprove = async (data, actions) => {
    // Perform actions after successful PayPal payment here
    setPaidFor(true); // Assuming setPaidFor is a state setter function
    console.log(12);
    try {
      // Call the function to generate the ticket PDF passing the bookingData
      await generateTicketPDF(bookingData);
      toast.success("Payment successful!"); // Display a success toast notification
      console.log("meow" + bookingData);
    } catch (error) {
      console.error("Error generating ticket PDF:", error);
      // Handle any errors while generating the ticket PDF
      setError("Error generating ticket PDF. Please try again.");
    }
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div style={{ paddingTop: "6%", paddingLeft: "8%" }}>
        <h2 style={{ paddingBottom: "1%", color: "#fc935a" }}>
          Booking Details
        </h2>
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
            <p
              style={{ marginLeft: "61%", fontSize: "35px", fontWeight: "700" }}
            >
              Total Price: {bookingData.total_price}
            </p>
            {downloadUrl ? (
              <div style={{ marginTop: "10px" }}>
                {/* Styled download link */}
                <a
                  href={downloadUrl}
                  download="ticket.pdf"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    color: "#fff",
                    backgroundColor: "#007bff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textAlign: "center",
                    marginLeft: "0px ", // Adjusted left and right margin to 20px
                    transition: "background-color 0.3s", // Adding transition for hover effect
                  }}
                  // Adding hover effect
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "brown"; // Change to a slightly darker shade on hover
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#3D3B40"; // Revert back to original color on hover out
                  }}
                >
                  Print Ticket PDF
                </a>
              </div>
            ) : (
              <PayPalButtons
                onClick={(data, actions) => {
                  const hasAlreadyBoughtCourse = false;
                  if (hasAlreadyBoughtCourse) {
                    setError("You Already bough this course");
                    return actions.reject();
                  } else {
                    return actions.resolve();
                  }
                }}
                createOrder={(data, actions) => {
                  const totalPriceDivided = (bookingData.total_price / 22).toFixed(2); // Calculate the value
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalPriceDivided,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, action) => {
                  const order = await action.order.capture();
                  console.log("order", order);

                  handleApprove(data.orderID);
                }}
                onCancel={() => {}}
                onError={(err) => {
                  setError(err);
                  console.log("PayPal Checkout onError", err);
                }}
              />
            )}
            <ToastContainer />
          </div>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>
    </PayPalScriptProvider>
  );
}

export default Bookingdetail;
