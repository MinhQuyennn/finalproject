import React, { useEffect, useState } from "react";
import "./searchRoute.css";
import * as routeservice from "../../../services/routeservice";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import { MDBCol } from "mdbreact";
import Button from "@mui/material/Button";

function SearchRoute() {
  const [data, setData] = useState([]);
  const [valuedeparture, setValueDeparture] = useState("");
  const [valuearrival, setValueArrival] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [filteredDepartures, setFilteredDepartures] = useState([]);
  const [filteredArrivals, setFilteredArrivals] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

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
    const dateValue = event.target.value;
    setDepartureDate(dateValue);
  };

  const filterDepartures = (searchTerm) => {
    setFilteredDepartures((prevDepartures) =>
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
    setFilteredArrivals((prevArrivals) =>
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
      // Rest of the code...
    } catch (error) {
      console.error("Error searching for route:", error);
      // Handle the error...
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await routeservice.ListAllRoute();
        console.log("API response: ", response);

        if (response.data.error) {
          console.error("API error: ", response.data.error);
          return;
        }

        setData(response.data.lists ?? []);
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
      <h2 style={{ marginTop: "-4px" }}>
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
      <div className="search-container">
        <div className="search__departure">
          <MDBCol md="6">
            <input
              className="form-control"
              type="text"
              value={valuedeparture}
              onChange={onChangeDeparture}
              placeholder="Departure"
              aria-label="Search"
              style={{ width: "180%", color: "black" }}
            />
          </MDBCol>

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

        <div className="search__arrival">
          <MDBCol md="6">
            <input
              className="form-control"
              type="text"
              value={valuearrival}
              onChange={onChangeArrival}
              placeholder="Arrival"
              aria-label="Search"
              style={{ width: "180%" }}
            />
          </MDBCol>

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
        <div className="row">
          <div className="search__date">
            <Form.Group controlId="dob">
              <Form.Control
                type="date"
                name="dob"
                value={departureDate}
                onChange={onChangeDate}
                placeholder="Date of Birth"
              />
            </Form.Group>
          </div>
        </div>
      </div>
      <Link
        to={`/train/${encodeURIComponent(valuedeparture)}/${encodeURIComponent(
          valuearrival
        )}/${encodeURIComponent(departureDate)}`}
      >
        <Button
          variant="outlined"
          href="#outlined-buttons"
          onClick={handleSearch}
          style={{ marginLeft: "100px" }}
        >
          Search
        </Button>
      </Link>
    </div>
  );
}

export default SearchRoute;
