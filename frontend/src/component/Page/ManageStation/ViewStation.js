import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ListOfStation } from "../../../services/managestaion";

function ViewStaion() {
  const [stations, setStationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await ListOfStation();
      console.log("Train Data:", response.data);
      setStationData(response.data);
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stations.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="contentP">
      <div className="text1">
        Manage Station
        <Link to="/homepageEmployee/AddStation/addstation">
          <span style={{ paddingLeft: "1%", fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faLocationDot} />
          </span>
        </Link>{" "}
      </div>

      <div className="containerP">
        <div className="employeeList">
          <div className="Filter">
            <div className="filter1"></div>
          </div>
          <table className="employeeList1">
            <thead>
              <tr>
                <th>Station id</th>
                <th>Departure station</th>
                <th>Arrival station</th>
                <th>Price</th>
                <th>Distance</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr key={item.station_id}>
                  <td>{item.station_id}</td>
                  <td>{item.departure_station}</td>
                  <td>{item.arrival_station}</td>
                  <td>{item.price}</td>
                  <td>{item.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            {stations.length > itemsPerPage && (
              <ul
                className="pagination"
                style={{
                  display: "flex",
                  paddingLeft: "45%",
                }}
              >
                {Array.from(
                  { length: Math.ceil(stations.length / itemsPerPage) },
                  (_, i) => (
                    <li
                      style={{ marginLeft: "1%" }}
                      key={i + 1}
                      className={currentPage === i + 1 ? "active" : ""}
                    >
                      <button onClick={() => paginate(i + 1)}>{i + 1}</button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewStaion;
