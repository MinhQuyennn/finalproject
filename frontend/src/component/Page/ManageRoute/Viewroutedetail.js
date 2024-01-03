import React, { useEffect, useState } from "react";
import * as ManageRouteFunction from "../../../services/manageroute";
import { useParams } from "react-router-dom";
import style from "./style.css";

function ViewRouteById() {
  const { route_id } = useParams();
  const [routeData, setRouteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ManageRouteFunction.ViewRouteById(route_id);

        if (
          response.data &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          setRouteData(response.data.result[0]);
        } else {
          console.error("API error: No data found for the given route ID");
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, [route_id]);

  return (
    <section className="hero1">
      <div className="containerP1">
        <div className="text1">
          Route<span> Detail</span>
        </div>
        {routeData ? (
          <ul className={style.customList}>
            <li
              className="property"
              key={routeData.id}
              style={{ width: "100%" }}
            >
              <span className="property">Route ID:</span>{" "}
              <span className="property">{routeData.route_id}</span>
              <br />
              <span className="property">Departure Date:</span>{" "}
              <span className="value">{routeData.departure_date}</span>
              <br />
              <span className="property">Departure Time:</span>{" "}
              <span className="value">{routeData.departure_time}</span>
            </li>
          </ul>
        ) : (
          <p className="text1">Loading...</p>
        )}
      </div>
    </section>
  );
}

export default ViewRouteById;
