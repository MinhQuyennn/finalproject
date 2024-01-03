import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ViewUser() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchTicketHistory = async () => {
    const customer_id = localStorage.getItem("selectedCustomerId");
    try {
      const response = await fetch(
        `http://localhost:8081/api/ticket/${customer_id}`
      );

      if (response.ok) {
        const ticketData = await response.json();
        console.log("Ticket history:", ticketData);
        setData(Array.isArray(ticketData) ? ticketData : []);
      } else {
        throw new Error("Failed to fetch ticket history");
      }
    } catch (error) {
      console.error("Error fetching ticket history:", error);
    }
  };

  const handleDeleteTicket = async (bookingId) => {
    
    try {
      const response1 = await fetch(`http://localhost:8081/api/ticket/book/${bookingId}`, {
        method: 'GET',
      });
      const ticketData = await response1.json();
      console.log(ticketData);
      const departureDate = new Date(ticketData.departure_date);
      console.log(departureDate);
      const currentDate = new Date();
      console.log(currentDate);
      const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
      const differenceInDays = Math.round((departureDate - currentDate) / oneDay);
      console.log(differenceInDays);
      if (differenceInDays < 1) {
        toast.error(`Cancel failed. It's over the allowed time to cancel this ticket.`);
        return; // Cancel deletion due to time constraint
      }
else { 
  const response = await fetch(
  `http://localhost:8081/api/ticket/${bookingId}`,
  {
    method: "PUT",
  }
);
if (response.ok) {

  // Implement deletion logic here...

  toast.success(`Ticket ${bookingId} deleted successfully`);
  fetchTicketHistory(); // Fetch updated ticket history after deletion
} else {
  throw new Error(`Failed to fetch ticket ${bookingId}`);
}}
     
    } catch (error) {
      console.error(`Error deleting ticket ${bookingId}:`, error);
    }
  };

  useEffect(() => {
    fetchTicketHistory();
    console.log("Fetching ticket history...");
  }, []);

  return (
    <section className="contentP">
      <div className="text1">Ticket History for Customer</div>
      <div className="containerP">
        <table className="ticketHistoryTable">
          <thead>
            <tr>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Departure Station</th>
              <th>Arrival Station</th>
              <th>Status</th>
              <th>Action</th> {/* Added table header for Action */}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.departure_date}</td>
                <td>{item.departure_time}</td>
                <td>{item.departure_station}</td>
                <td>{item.arrival_station}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleDeleteTicket(item.booking_id)}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="6">No ticket history available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </section>
  );
}

export default ViewUser;
