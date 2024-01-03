import React, { useState } from "react";
import style from "./style.css";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as managestaion from "../../../services/managestaion";
import { useNavigate } from "react-router-dom";

function AddStation() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const station = {
        departure_station: formData.departure_station,
        arrival_station: formData.arrival_station,
        price: formData.price,
        distance: formData.distance,
      };

      const response = await managestaion.addStation(station);

      console.log("New route created:", response);
      toast.success("Route added successfully");

      navigate("/homepageEmployee/Station");
    } catch (error) {
      console.error("Error creating route:", error);
    }
  };

  return (
    <div>
      <ToastContainer />

      <section className="contentP">
        <div className="text1">
          Add Station{" "}
          <span style={{ fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faRoute} />
          </span>
        </div>
        <div className="containerP">
          <div className="employeeList">
            <form onSubmit={handleFormSubmit}>
              <label>Departure station:</label>
              <input
                type="text"
                name="departure_station"
                onChange={handleInputChange}
                value={formData.departure_station}
                required
              />

              <label>Arrival station:</label>
              <input
                type="text"
                name="arrival_station"
                onChange={handleInputChange}
                value={formData.arrival_station}
                required
              />

              <label>Price: </label>
              <input
                type="text"
                name="price"
                onChange={handleInputChange}
                value={formData.price}
                required
              />

              <label>Distance: </label>
              <input
                type="text"
                name="distance"
                onChange={handleInputChange}
                value={formData.distance}
                required
              />

              <button type="submit">ADD STATION</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddStation;
