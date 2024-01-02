import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListOfTrip } from "../../../services/managetrip";
import { faTrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ManageListOfTrip() {
  const [tripData, setTripData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // Adjust the number of items per page as needed

  const fetchData = async () => {
    try {
      const response = await ListOfTrip();
      console.log("Trip Data:", response.data);

      // Check if response.data.trips is an array
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

  // Calculate the index of the last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to display
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentItems = tripData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              {currentItems.map((item) => (
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

          {/* Pagination */}
          <div>
            {tripData.length > itemsPerPage && (
              <ul
                className="pagination"
                style={{
                  display: "flex",
                  paddingLeft: "35%",
                  paddingTop: "2%",
                }}
              >
                {/* Display "..." if there are more than 5 pages and currentPage is not within the first three pages */}
                {tripData.length > 5 && currentPage > 3 && (
                  <li style={{ marginLeft: "1%" }}>...</li>
                )}

                {/* Display page numbers in the range of (currentPage - 2) to (currentPage + 2) */}
                {Array.from(
                  {
                    length: Math.min(
                      5,
                      Math.ceil(tripData.length / itemsPerPage)
                    ),
                  },
                  (_, i) => {
                    const pageNumber =
                      currentPage > 2 ? currentPage - 2 + i : i + 1;
                    return (
                      <li
                        style={{ marginLeft: "1%" }}
                        key={pageNumber}
                        className={currentPage === pageNumber ? "active" : ""}
                      >
                        <button onClick={() => paginate(pageNumber)}>
                          {pageNumber}
                        </button>
                      </li>
                    );
                  }
                )}

                {/* Display "..." if there are more than 5 pages and currentPage is not within the last three pages */}
                {tripData.length > 5 &&
                  currentPage <
                    Math.ceil(tripData.length / itemsPerPage) - 2 && (
                    <li style={{ marginLeft: "1%" }}>...</li>
                  )}

                {/* Display last page button */}
                <li
                  style={{ marginLeft: "1%" }}
                  className={
                    currentPage === Math.ceil(tripData.length / itemsPerPage)
                      ? "active"
                      : ""
                  }
                >
                  <button
                    onClick={() =>
                      paginate(Math.ceil(tripData.length / itemsPerPage))
                    }
                  >
                    {Math.ceil(tripData.length / itemsPerPage)}
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageListOfTrip;
