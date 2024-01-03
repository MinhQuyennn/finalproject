import React, { useState, useEffect } from "react";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ManageTripFunction from "../../../services/managetrip";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddTrip() {
  const [trainId, setTrainId] = useState(1);
  const [routeId, setRouteId] = useState(1);
  const [stationData, setStationData] = useState([
    {
      stationId: 1,
      arrivalTime: "",
      breakTime: "00:05:00",
    },
    {
      stationId: 2,
      arrivalTime: "",
      breakTime: "00:05:00",
    },
  ]);
  const [trainData, setTrainData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [stationOptions, setStationOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchRouteData();
    fetchStationData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ManageTripFunction.ListOfTrain();
      console.log("Train Data:", response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setTrainData(response.data);
      } else {
        console.error("Invalid train data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  };

  const fetchRouteData = async () => {
    try {
      const response = await ManageTripFunction.ListOfRoute();
      console.log("Route Data:", response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRouteData(response.data);
      } else {
        console.error("Invalid route data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  const fetchStationData = async () => {
    try {
      const response = await ManageTripFunction.ListOfStation();
      console.log("Station Data:", response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setStationOptions(response.data);
      } else {
        console.error("Invalid station data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching station data:", error);
    }
  };

  const handleTrainChange = (e) => {
    const selectedTrainId = parseInt(e.target.value, 10);
    setTrainId(selectedTrainId);
  };

  const handleRouteChange = (e) => {
    setRouteId(e.target.value);
  };

  const handleStationChange = (index, e) => {
    const updatedStationData = [...stationData];
    updatedStationData[index].stationId = e.target.value;
    setStationData(updatedStationData);
  };

  const handleArrivalExpectedTimeChange = (index, e) => {
    const updatedStationData = [...stationData];
    updatedStationData[index].arrivalTime = e.target.value;
    setStationData(updatedStationData);
  };

  const handleBreakTimeChange = (index, e) => {
    const updatedStationData = [...stationData];
    updatedStationData[index].breakTime = e.target.value;
    setStationData(updatedStationData);
  };

  const handleAddStation = () => {
    setStationData((prevStationData) => [
      ...prevStationData,
      {
        stationId: "",
        arrivalTime: "",
        breakTime: "",
      },
    ]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        second: { train_id: trainId, route_id: routeId },
        first_and_half: stationData.map((station) => ({
          route_id: routeId,
          station_id: station.stationId,
          arrival_time_expected: station.arrivalTime,
          breaktime: station.breakTime,
        })),
      };

      console.log("Payload:", payload);

      localStorage.setItem("train_id", trainId);
      localStorage.setItem("route_id", routeId);

      stationData.forEach((station, index) => {
        localStorage.setItem(`station_id_${index}`, station.stationId);
        localStorage.setItem(
          `arrival_time_expected_${index}`,
          station.arrivalTime
        );
        localStorage.setItem(`breaktime_${index}`, station.breakTime);
      });

      await axios.post(`http://localhost:8081/api/addNewTrip`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("New trip added successfully!");
      navigate("/homepageEmployee/Trip");
    } catch (error) {
      console.error("Error adding new trip", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (
          error.response.data.message ===
          "Station already assigned to the specified route"
        ) {
          toast.error(
            "Error: Station already assigned to the specified route. Please choose a different station."
          );
        } else {
          toast.error("Error adding new trip. Please try again.");
        }
      } else {
        toast.error("Error adding new trip. Please try again.");
      }
    }
  };

  return (
    <div>
      <ToastContainer />

      <section className="contentP">
        <div className="text1">
          Add Trip{" "}
          <span style={{ fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faTrain} />
          </span>
        </div>
        <div className="containerP">
          <div className="employeeList">
            <form onSubmit={handleFormSubmit}>
              <label>Train:</label>
              <select
                value={trainId}
                onChange={handleTrainChange}
                name="train_id"
              >
                {trainData.map((item) => (
                  <option key={item.train_id} value={item.train_id}>
                    {item.train_id} - {item.train_name}
                  </option>
                ))}
              </select>

              <label>Route:</label>
              <select
                value={routeId}
                onChange={handleRouteChange}
                name="route_id"
              >
                {routeData.map((item) => (
                  <option key={item.route_id} value={item.route_id}>
                    {item.route_id} - {item.departure_date} -{" "}
                    {item.departure_time}
                  </option>
                ))}
              </select>

              {stationData.map((station, index) => (
                <div key={index}>
                  <label>Station {index + 1}:</label>
                  <select
                    value={station.stationId}
                    onChange={(e) => handleStationChange(index, e)}
                  >
                    {stationOptions.map((option) => (
                      <option key={option.station_id} value={option.station_id}>
                        {option.station_id} - {option.departure_station} -{" "}
                        {option.arrival_station}
                      </option>
                    ))}
                  </select>

                  <label>Arrival expected time:</label>
                  <input
                    type="text"
                    value={station.arrivalTime}
                    onChange={(e) => handleArrivalExpectedTimeChange(index, e)}
                    placeholder="Arrival expected time"
                  />

                  <label>Break time:</label>
                  <input
                    type="text"
                    value={station.breakTime}
                    onChange={(e) => handleBreakTimeChange(index, e)}
                    placeholder="Break time"
                  />
                </div>
              ))}

              <button type="button" onClick={handleAddStation}>
                Add More Station
              </button>

              <button type="submit">ADD TRIP</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddTrip;
