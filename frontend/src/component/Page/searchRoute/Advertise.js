import React from "react";
import classes from "./Advertise.css";

function Advertise() {
  return (
    <div className="advertise__route">
      <div className="advertise__container">
        <div
          className={"container-fluid " + classes.containerfluid}
          style={{
            backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/022/906/697/non_2x/high-speed-train-at-station-and-blurred-cityscape-at-night-on-background-postproducted-generative-ai-digital-illustration-of-non-existing-train-model-free-photo.jpg')`,
          }}
        >
          <div className="container">
            <div className="row align-items-center" style={{ height: "41rem" }}>
              <div
                className="col-12 text-start"
                style={{ paddingTop: "25%", paddingLeft: "20%" }}
              >
                <h1 style={{ color: "#32325C" }}>
                  Booking <br /> Train Today
                </h1>
                <h2 className="mt-4" style={{ color: "#32325C" }}>
                  Unbox joy with hassle-free train bookings.
                  <br />
                  Experience an unforgettable journey from start to finish.
                </h2>
                <button
                  className={"btn btn-success px-3 py-2 " + classes.button}
                  style={{ width: "20%", borderRadius: "25px" }}
                >
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advertise;
