import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import * as TrainService from "../../../services/trainservices";
import "./train.css";
import DirectionsTransitFilledIcon from "@mui/icons-material/DirectionsTransitFilled";

function Train() {
  const [data, setData] = useState({});
  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split("/");
  const departure = segments[segments.length - 3];
  const arrival = segments[segments.length - 2];
  const { departure_date } = useParams();
  const navigate = useNavigate();

  const isDepartureTimeValid = (departureDate, departureTime) => {
    const currentDateTime = new Date();

    // Check if departureDate and departureTime are defined
    if (!departureDate || !departureTime) {
      console.error("Invalid departure date or time");
      return false;
    }

    // Convert departureDate to a Date object
    const [year, month, day] = departureDate.split("-");
    const departureDateTime = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      departureTime.includes(":")
        ? parseInt(departureTime.split(":")[0], 10)
        : 0,
      departureTime.includes(":")
        ? parseInt(departureTime.split(":")[1], 10)
        : 0,
      0
    );

    // Set the timezone for both currentDateTime and departureDateTime
    const currentDateTimeFormatted = new Date(
      currentDateTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
    );
    const departureDateTimeFormatted = new Date(
      departureDateTime.toLocaleString("en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
      })
    );

    // Log the formatted date and time for debugging
    console.log("Current DateTime:", currentDateTimeFormatted);
    console.log("Departure DateTime:", departureDateTimeFormatted);

    // Compare both date and time
    console.log(
      "Comparison result:",
      departureDateTimeFormatted >= currentDateTimeFormatted
    );
    return departureDateTimeFormatted >= currentDateTimeFormatted;
  };

  const handleSelect = (routeId, trainId, price, stationId, departureTime) => {
    if (isDepartureTimeValid(departure_date, departureTime)) {
      localStorage.setItem("selectedRouteId", routeId);
      localStorage.setItem("selectedTrainId", trainId);
      localStorage.setItem("selectedTrainPrice", price);
      localStorage.setItem("selectedStationId", stationId);
      navigate(`/bookingprocess/${trainId}`);
    } else {
      alert("Invalid - Departure time is in the past");
      navigate(`/route`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TrainService.ListAllTrain(
          departure,
          arrival,
          departure_date
        );

        if (response.list && Array.isArray(response.list)) {
          setData({ list: response.list });
        } else {
          console.error("API error: 'list' is not an array in the response");
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, [departure, arrival, departure_date]);

  return (
    <div>
      <div className="train__container">
        <div
          className="train__left banner-container"
          style={{
            width: "10%",
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(https://d13jio720g7qcs.cloudfront.net/images/guides/origin/600f86893dbc0.jpg)`,
          }}
        >
          <div className="banner-content">
            <div className="text-overlay">BUY ONE GET ONE</div>
          </div>
        </div>

        <div className="train__right" style={{ width: "45%" }}>
          <div>
            {data.list && Array.isArray(data.list) ? (
              data.list.map((train, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "2%",
                    marginTop: "1%",
                  }}
                >
                  <div className="train-content">
                    <div className="train__id">
                      <p>Train ID: {train.train_id}</p>
                      <p>Station ID: {train.station_id}</p>
                    </div>
                    <div className="train__info">
                      <p>Train Name: {train.train_name}</p>
                      <p>Total Seat: {train.total_seat_of_one_train}</p>
                      <p>Total Carriage: {train.total_of_carriage}</p>
                      <p>Departure Station: {train.departure_station}</p>
                      <p>Arrival Station: {train.arrival_station}</p>
                      {train.departure_date && (
                        <p>Departure Date: {train.departure_date}</p>
                      )}
                      {train.arrival_date && (
                        <p>Arrival Date: {train.arrival_date}</p>
                      )}
                      {train.departure_time && (
                        <p>
                          Departure Time: {train.departure_time}{" "}
                          {!isDepartureTimeValid(
                            train.departure_date,
                            train.departure_time
                          ) && (
                            <span style={{ color: "red" }}>
                              (Invalid - in the past)
                            </span>
                          )}
                        </p>
                      )}
                      <p>Price: {train.price}</p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        handleSelect(
                          train.route_id,
                          train.train_id,
                          train.price,
                          train.station_id,
                          train.departure_time
                        )
                      }
                      className="btn__train"
                    >
                      <DirectionsTransitFilledIcon /> BOOKING
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        <div className="train__pic">
          <div className="train__pic__smaller">
            <img src="https://dntt.mediacdn.vn/197608888129458176/2022/9/21/ho-guom-du-lich-ha-noi-ivivu-16637590508811726461079.jpg" />
            <img src="https://hnm.1cdn.vn/2020/06/10/nhipsonghanoi.hanoimoi.com.vn-uploads-images-tuandiep-2020-06-09-_1hphong.jpg" />
            <img src="https://static.vinwonders.com/production/optimize_gioi-thieu-ve-ha-noi-04.jpg" />
          </div>
          <div className="train__pic__smaller">
            <img src="https://songhongtourist.vn/upload/2022-11-30/-getpaidstock-5.jpg" />
            <img src="https://a.cdn-hotels.com/gdcs/production60/d457/8cda93a6-0c14-44df-90ca-05a51a499de6.jpg" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnagAq4YrSt-xPq3Wfvis7IQ4S_EVYJhFQoQ&usqp=CAU" />
          </div>
          <div className="train__pic__smaller">
            <img
              src="https://www.tripsavvy.com/thmb/-nPVciXf7-kl-XrW096N_9c-_IA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ho-chi-minh-city-at-night-22c7df816ce4493eb0e86cf54fe03309.jpg"
              style={{ marginLeft: "25%" }}
            />
            <img src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG8lMjBjaGklMjBtaW5oJTIwY2l0eSUyMHZpZXRuYW18ZW58MHx8MHx8fDA%3D" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Train;
