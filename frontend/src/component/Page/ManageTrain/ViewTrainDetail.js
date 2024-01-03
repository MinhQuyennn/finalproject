import React, { useEffect, useState } from "react";
import * as ManageTrainFunction from "../../../services/manageTrain";
import { useParams } from "react-router-dom";
import style from "./style.css";

function ViewTrainById() {
  const { train_id } = useParams();
  const [trainData, setTrainData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ManageTrainFunction.ViewTrain(train_id);

        if (
          response.data &&
          response.data.result &&
          response.data.result.length > 0
        ) {
          setTrainData(response.data.result[0]);
        } else {
          console.error("API error: No data found for the given train ID");
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchData();
  }, [train_id]);

  return (
    <section className="hero1">
      <div className="containerP1">
        <div className="text1">
          Your<span> Train Detail</span>
        </div>
        {trainData ? (
          <ul className={style.customList}>
            <li
              className="property"
              key={trainData.id}
              style={{ width: "100%" }}
            >
              <span className="property">Train ID:</span>{" "}
              <span className="property">{trainData.train_id}</span>
              <br />
              <span className="property">Train Name:</span>{" "}
              <span className="value">{trainData.train_name}</span>
              <br />
              <span className="property">Total Seats:</span>{" "}
              <span className="value">{trainData.total_seat_of_one_train}</span>
              <br />
              <div style={{ display: "flex", width: "100%" }}>
                <span className="property">Description:</span>{" "}
                <span className="value" style={{ marginLeft: "0.1%" }}>
                  {trainData.description}
                </span>
              </div>
              <br />
              <span className="property">Full name:</span>{" "}
              <span className="value">{trainData.full_name}</span>
            </li>
          </ul>
        ) : (
          <p className="text1">Loading...</p>
        )}
      </div>
    </section>
  );
}

export default ViewTrainById;
