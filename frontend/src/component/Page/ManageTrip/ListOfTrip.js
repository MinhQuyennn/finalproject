import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListOfTrip } from "../../../services/managetrip";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ManageListOfTrip() {
  const [tripData, setTripData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const fetchData = async () => {
    try {
      const response = await ListOfTrip();
      console.log("Trip Data:", response.data);

      if (Array.isArray(response.data.trips)) {
        setTripData(response.data.trips);
      } else {
        console.error("Invalid trip data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalItems = tripData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 5;

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(
        <li
          style={{ marginLeft: "1%" }}
          key={i}
          className={currentPage === i ? "active" : ""}
        >
          <button onClick={() => paginate(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <section className="contentP">
      <div className="text1">
        Manage Trip
        <Link to="/homepageEmployee/Trip/addtrip">
          <span style={{ paddingLeft: "1%", fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faTrain} />
          </span>
        </Link>{" "}
      </div>

      <div className="containerP">
        <div className="employeeList">
          <table className="employeeList1">
            <thead>
              <tr>
                <th>Train id</th>
                <th>Route id</th>
                <th>Station id</th>
                <th>Departure station</th>
                <th>Arrival station</th>
                <th>Departure time</th>
                <th>Break time</th>
                <th>Arrival time expected</th>
              </tr>
            </thead>

            <tbody>
              {tripData
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item) => (
                  <tr key={item.train_id}>
                    <td>{item.train_id}</td>
                    <td>{item.route_id}</td>
                    <td>{item.station_id}</td>
                    <td>{item.departure_station}</td>
                    <td>{item.arrival_station}</td>
                    <td>{item.departure_time}</td>
                    <td>{item.breaktime}</td>
                    <td>{item.arrival_time_expected}</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {totalItems > itemsPerPage && (
            <ul
              className="pagination"
              style={{
                display: "flex",
                paddingLeft: "35%",
                paddingTop: "2%",
              }}
            >
              <li style={{ marginLeft: "1%" }}>
                <button onClick={() => paginate(currentPage - 1)}>Prev</button>
              </li>

              {currentPage > 3 && <li style={{ marginLeft: "1%" }}>...</li>}

              {renderPageNumbers()}

              {currentPage < totalPages - 2 && (
                <li style={{ marginLeft: "1%" }}>...</li>
              )}

              {/* Display "Next" button */}
              <li style={{ marginLeft: "1%" }}>
                <button onClick={() => paginate(currentPage + 1)}>Next</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

export default ManageListOfTrip;
