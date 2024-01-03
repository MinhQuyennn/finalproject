import React, { useEffect, useState } from "react";
import "./searchRoute.css";
import * as routeservice from "../../../services/routeservice";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "@mui/material/Button";

function SearchRoute() {
  const [data, setData] = useState([]);
  const [valuedeparture, setValueDeparture] = useState("");
  const [valuearrival, setValueArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredArrivals, setFilteredArrivals] = useState([]);

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  const onChangeDeparture = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setValueDeparture(searchTerm);
    filterDepartures(searchTerm);
  };

  const onSearchDeparture = (searchTerm) => {
    setValueDeparture(searchTerm);
    setFilteredDepartures([]);
  };

  const onChangeArrival = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setValueArrival(searchTerm);
    filterArrivals(searchTerm);
  };

  const onSearchArrival = (searchTerm) => {
    setValueArrival(searchTerm);
    setFilteredArrivals([]);
  };

  const onChangeDate = (event) => {
    const currentDate = new Date();
    const selectedDate = new Date(event.target.value);

    if (selectedDate < currentDate + 1) {
      alert("Selected date cannot be in the past");
      setDepartureDate("");
    } else {
      setDepartureDate(event.target.value);
    }
  };

  const filterDepartures = (searchTerm) => {
    setFilteredDepartures(
      Array.from(
        new Set(
          data
            .filter((index) => {
              const departureStation = index.departure_station.toLowerCase();
              return (
                searchTerm &&
                departureStation.startsWith(searchTerm) &&
                departureStation !== searchTerm
              );
            })
            .map((index) => index.departure_station)
        )
      )
    );
  };

  const filterArrivals = (searchTerm) => {
    setFilteredArrivals(
      Array.from(
        new Set(
          data
            .filter((index) => {
              const arrivalStation = index.arrival_station.toLowerCase();
              return (
                searchTerm &&
                arrivalStation.startsWith(searchTerm) &&
                arrivalStation !== searchTerm
              );
            })
            .map((index) => index.arrival_station)
        )
      )
    );
  };

  const handleSearch = async () => {
    try {
      const response = await routeservice.SearchDepartureAndArrival(
        encodeURIComponent(valuedeparture.trim()),
        encodeURIComponent(valuearrival.trim()),
        encodeURIComponent(departureDate.trim())
      );

      console.log("Train API response:", response);

      if (!response || !response.routes) {
        console.error("API error: No routes in the response");
        return;
      }
    } catch (error) {
      console.error("Error searching for route:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await routeservice.ListAllRoute();
        console.log("API response: ", response);

        if (!response || !response.routes) {
          console.error("API error: No data in the response");
          return;
        }

        setData(response.routes);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Data:", data);
  }, [data]);

  return (
    <div className="search__route">
      <div className="header-container">
        <h2 style={{ marginLeft: "120%", width: " 100%", marginTop: "14%" }}>
          <span style={{ color: "red" }}>B</span>
          <span style={{ color: "orange" }}>O</span>
          <span style={{ color: "yellow" }}>O</span>
          <span style={{ color: "green" }}>K</span>
          <span style={{ color: "blue" }}>I</span>
          <span style={{ color: "indigo" }}>N</span>
          <span style={{ color: "violet" }}>G</span>
          <span> </span>
          <span style={{ color: "navy" }}>N</span>
          <span style={{ color: "purple" }}>O</span>
          <span style={{ color: "brown" }}>W</span>
        </h2>
      </div>

      <div className="search-container">
        <div className="search__departure">
          <input
            className="form-control"
            type="text"
            value={valuedeparture}
            onChange={onChangeDeparture}
            placeholder="Departure"
            aria-label="Search"
            style={{ width: "100%" }}
          />

          {filteredDepartures.length > 0 && (
            <div className="departure-dropdown-container">
              <div className="dropdown">
                {filteredDepartures.map((index, idx) => (
                  <div
                    onClick={() => onSearchDeparture(index)}
                    className="dropdown-row"
                    key={`${index}_${idx}`}
                  >
                    {index}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="search__arrival">
          <input
            className="form-control"
            type="text"
            value={valuearrival}
            onChange={onChangeArrival}
            placeholder="Arrival"
            aria-label="Search"
            style={{ width: "100%" }}
          />

          {filteredArrivals.length > 0 && (
            <div className="arrival-dropdown-container">
              <div className="dropdown">
                {filteredArrivals.map((index, idx) => (
                  <div
                    onClick={() => onSearchArrival(index)}
                    className="dropdown-row"
                    key={`${index}_${idx}`}
                  >
                    {index}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div
            className="search__date"
            style={{ paddingTop: "6%", paddingRight: "0%" }}
          >
            <Form.Group controlId="dob">
              <Form.Control
                type="date"
                name="dob"
                value={departureDate}
                onChange={onChangeDate}
                placeholder="Departure Date"
                min={getCurrentDate()}
              />
            </Form.Group>
          </div>
        </div>

        <div className="search__button-container">
          <Link
            to={`/train/${encodeURIComponent(
              valuedeparture
            )}/${encodeURIComponent(valuearrival)}/${encodeURIComponent(
              departureDate
            )}`}
          >
            <Button
              variant="outlined"
              href="#outlined-buttons"
              onClick={handleSearch}
              style={{
                marginLeft: "10%",
                position: "absolute",
                marginTop: "20px",
              }}
            >
              Search
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SearchRoute;
