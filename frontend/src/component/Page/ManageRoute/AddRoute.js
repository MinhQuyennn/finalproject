import React, { useState } from "react";
import style from "./style.css";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as RouteService from "../../../services/manageroute";
import { useNavigate } from "react-router-dom";

function AddRoute() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const routeData = {
        departure_date: formData.departureDate,
        departure_time: formData.departureTime,
      };

      const response = await RouteService.AddNewRoute(routeData);

      console.log("New route created:", response);
      toast.success("Route added successfully");

      navigate("/homepageEmployee/Route");
    } catch (error) {
      console.error("Error creating route:", error);
    }
  };

  return (
    <div>
      <ToastContainer />

      <section className="contentP">
        <div className="text1">
          Add Route{" "}
          <span style={{ fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faRoute} />
          </span>
        </div>
        <div className="containerP">
          <div className="employeeList">
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginTop: "2%" }}>
                <label>Departure Date:</label>
                <input
                  type="date"
                  name="departureDate"
                  onChange={handleInputChange}
                  value={formData.departureDate}
                  required
                />
              </div>
              <p></p>
              <div style={{ marginTop: "2%" }}>
                <label>Departure Time:</label>
                <input
                  type="time"
                  name="departureTime"
                  onChange={handleInputChange}
                  value={formData.departureTime}
                  required
                />
              </div>

              <button type="submit">Add Route</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddRoute;
