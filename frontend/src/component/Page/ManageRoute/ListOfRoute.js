import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListOfRoutes } from "../../../services/manageroute";
import { faRoute } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewRoutes() {
  const [routeData, setRouteData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const fetchData = async () => {
    try {
      const response = await ListOfRoutes();
      console.log("Route Data:", response.data);
      setRouteData(response.data);
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = routeData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="contentP">
      <div className="text1">
        Manage Route{" "}
        <Link to="/homepageEmployee/Route/addroute">
          <span style={{ fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faRoute} />
          </span>
        </Link>{" "}
      </div>

      <div className="containerP">
        <div className="employeeList">
          <table className="employeeList1">
            <thead>
              <tr>
                <th>Route ID</th>
                <th>Departure Date</th>
                <th>Departure Time</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item) => (
                <tr key={item.route_id}>
                  <td>{item.route_id}</td>
                  <td>{new Date(item.departure_date).toLocaleDateString()}</td>
                  <td>{item.departure_time}</td>
                  <td>
                    <Link
                      to={`/homepageEmployee/Route/viewroutedetail/${item.route_id}`}
                    >
                      <button style={{ width: "50%", marginLeft: "15%" }}>
                        View
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            {routeData.length > itemsPerPage && (
              <ul
                className="pagination"
                style={{
                  display: "flex",
                  paddingLeft: "45%",
                }}
              >
                {Array.from(
                  { length: Math.ceil(routeData.length / itemsPerPage) },
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

export default ViewRoutes;
