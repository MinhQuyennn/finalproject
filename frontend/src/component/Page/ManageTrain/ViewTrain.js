import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ListOfTrain, SearchTrain } from "../../../services/manageTrain";
function ViewTrain() {
  const [trainData, setTrainData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await ListOfTrain();
      console.log("Train Data:", response.data);

      setTrainData(response.data);
    } catch (error) {
      console.error("Error fetching train data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await SearchTrain(encodeURIComponent(searchTerm.trim()));
      console.log("Search Train API response:", response);

      const searchData = response.data;

      setTrainData(searchData.list);
    } catch (error) {
      console.error("Error searching for train: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      handleSearch();
    }
  }, [searchTerm]);

  return (
    <section className="contentP">
      <div className="text1">Manage Train </div>

      <div className="containerP">
        <div className="employeeList">
          <div className="Filter">
            <div className="filter1"></div>

            <div className="filter2">
              <form
                className="example"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted!");
                  handleSearch();
                }}
              >
                <input
                  type="text"
                  placeholder="Enter train name.."
                  name="search"
                  className="ip"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
          </div>
          <table className="employeeList1">
            <thead>
              <tr>
                <th>Train id</th>
                <th>Train name</th>
                <th>Total seat</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {trainData !== undefined && trainData.length > 0 ? (
                trainData.map((item) => (
                  <tr key={item.train_id}>
                    <td>{item.train_id}</td>
                    <td>{item.train_name}</td>
                    <td>{item.total_seat_of_one_train}</td>
                    <td>
                      <Link
                        to={`/homepageEmployee/Train/viewtraindetail/${item.train_id}`}
                      >
                        <button style={{ width: "50%", marginLeft: "15%" }}>
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">
                    {trainData.length === 0
                      ? "Loading..."
                      : "No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ViewTrain;
