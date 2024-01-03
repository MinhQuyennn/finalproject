import React, { useEffect, useState } from "react";
import style from "./style.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ViewEmployee() {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleRowClick = (employeeId) => {
    navigate(`/updateEmployee/${employeeId}`);
  };

  const fetchData = () => {
    let url = `http://localhost:8081/getDatafromUser`;

    if (selectedStatus) {
      url = `http://localhost:8081/getDatafromUserAndStatusFillter/${selectedStatus}`;
    }

    if (searchTerm) {
      url = `http://localhost:8081/getEmployeesByFullname?fullname=${searchTerm}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((apiData) => {
        console.log("API ResponseF:", apiData);
        setData(apiData.accounts || apiData.employees);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleWorkStatus = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to change the status to `quit`? This account will be blocked"
    );
    if (isConfirmed) {
      fetch(`http://localhost:8081/UpdateStatusByID/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "quit",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Quit:", data);
          fetchData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      alert("Change the status Status changed to `quit` successfully");
    }
  };

  const handleQuitStatus = (id) => {
    // Make a request to update the Status status to 'Work'
    const isConfirmed = window.confirm(
      "Are you sure you want to change the status to `work`?"
    );
    if (isConfirmed) {
      fetch(`http://localhost:8081/UpdateStatusByID/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "work",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Status Work:", data);
          fetchData();
        })
        .catch((error) => {
          console.error("Error approving Status:", error);
        });
      alert("Change the status Status changed to `work` successfully");
    }
  };

  const handleDelete = async (employeeId, employeeName, accountId) => {
    const isConfirmed = window.confirm(
      `You want to delete the '${employeeName}' employee of account?`
    );
    if (isConfirmed) {
      try {
        const employeeResponse = await fetch(
          `http://localhost:8081/DeleteEmployeeByID/${employeeId}`,
          {
            method: "DELETE",
          }
        );

        const employeeData = await employeeResponse.json();
        console.log("Deleted employee:", employeeData);

        const accountResponse = await fetch(
          `http://localhost:8081/DeleteAccountByID/${accountId}`,
          {
            method: "DELETE",
          }
        );

        const accountData = await accountResponse.json();
        console.log("Deleted account:", accountData);

        setTimeout(() => {
          console.log("Data before fetch:", data);
          fetchData();
          console.log("Data after fetch:", data);
        }, 500);
      } catch (error) {
        console.error("Error deleting employee or account:", error);
      }
      alert("Deleted successfully");
    }
  };

  const updatePhoneNumber = async (employeeId, newPhoneNumber) => {
    try {
      const response = await fetch(
        `http://localhost:8081/updatePhoneNumber/${employeeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone: newPhoneNumber }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update phone number");
      }

      const result = await response.json();

      if (result.Status) {
        console.log(result.Status);
        fetchData();
      } else {
        console.log(result.Error);
      }
    } catch (error) {
      console.error("Error updating phone number:", error.message);
    }
  };

  const handlePhoneChange = (e, employeeId) => {
    const newPhoneNumber = e.target.value;
    updatePhoneNumber(employeeId, newPhoneNumber);
  };

  useEffect(() => {
    fetchData();
    console.log("Fetching data...");
  }, [selectedStatus, searchTerm]);

  return (
    <section className="contentP">
      <div className="text1">
        Manage Employee{" "}
        <Link to="/homepageManager/viewEmployee/addEmployee">
          <span style={{ fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
        </Link>{" "}
      </div>
      <div className="containerP">
        <div className="employeeList">
          <div className="Filter">
            <div className="filter1">
              <label>Status</label>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="selectF"
              >
                <option value="">All</option>
                <option value="Work">Work</option>
                <option value="Quit">Quit</option>
              </select>
            </div>

            <div className="filter2">
              <form
                className="example"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submitted!");
                  fetchData();
                }}
              >
                <input
                  type="text"
                  placeholder="Enter name.."
                  name="search"
                  className="ip"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="text2">List of employees</div>

          <table className="employeeList1">
            <thead>
              <tr>
                <th>employee id</th>
                <th>account id</th>
                <th>citizen identification card</th>
                <th>fullname</th>
                <th>phone</th>
                <th>gender</th>
                <th>dob</th>
                <th>status</th>
                <th>email</th>
                <th>password</th>
                <th className="delete">Actions</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {data !== undefined && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.employee_id}>
                    <td>{item.employee_id}</td>
                    <td>{item.account_id}</td>
                    <td>{item.citizen_identification_card}</td>
                    <td>{item.fullname}</td>
                    <td>
                      <input
                        type="phone"
                        value={item.phone}
                        onChange={(e) => handlePhoneChange(e, item.employee_id)}
                        className="input-phone"
                      />
                    </td>
                    <td>{item.gender}</td>
                    <td>{item.dob}</td>
                    <td>{item.status}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td className="delete">
                      <button
                        onClick={() => handleQuitStatus(item.employee_id)}
                      >
                        Work
                      </button>
                      <button
                        onClick={() => handleWorkStatus(item.employee_id)}
                      >
                        Quit
                      </button>
                    </td>
                    <td className="delete">
                      <button
                        onClick={() =>
                          handleDelete(
                            item.employee_id,
                            item.fullname,
                            item.account_id
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11">
                    {data === null ? "Loading..." : "No data available"}
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

export default ViewEmployee;
