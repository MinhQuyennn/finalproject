import React, { useEffect, useState } from "react";
import "./style.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function ViewUser() {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedUserData, setEditedUserData] = useState({});

  const navigate = useNavigate();

  const handleUpdate = async (customer_id) => {
    try {
      const response = await fetch(
        `http://localhost:8081/UpdateCustomerByID/${customer_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUserData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Updated customer:", data);
        setEditMode(null);
        fetchData();
        alert("Updated successfully");
      } else {
        throw new Error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
      alert("Failed to update customer");
    }
  };

  const handleCancel = () => {
    setEditedUserData({});
    setEditMode(null);
  };

  const fetchData = () => {
    let url = `http://localhost:8081/getAllCustomers`;

    if (selectedStatus) {
      url = `http://localhost:8081/getDatafromUserAndStatusFillter/${selectedStatus}`;
    }

    if (searchTerm) {
      url = `http://localhost:8081/SearchUserByName/${searchTerm}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((apiData) => {
        console.log("API ResponseF:", apiData);
        setData(apiData.CustomersInformation);
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

  const handleDelete = async (customerId, customerName, accountId) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the customer '${customerName}' and their associated account?`
    );
    if (isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8081/deleteCustomerByID/${accountId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Deleted customer and associated account:", data);
          fetchData();
          alert("Deleted successfully");
        } else {
          throw new Error("Failed to delete customer and account");
        }
      } catch (error) {
        console.error("Error deleting customer and account:", error);
        alert("Failed to delete customer and associated account");
      }
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
      <div className="text1">Manage Customer</div>
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

          <div className="text2">List of customers</div>
          <table className="employeeList1">
            <thead>
              <tr>
                <th>Customer id</th>
                <th>account id</th>
                <th>citizen identification card</th>
                <th>fullname</th>
                <th>phone</th>
                <th>gender</th>
                <th>dob</th>
                <th>role</th>
                <th>email</th>
                <th>password</th>
              </tr>
            </thead>

            <tbody>
              {data !== undefined && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.customer_id}>
                    <td>{item.customer_id}</td>
                    <td>{item.account_id}</td>
                    <td>{item.citizen_identification_card}</td>
                    <td>{item.fullname}</td>
                    <td>{item.phone}</td>
                    <td>{item.gender}</td>
                    <td>{item.dob}</td>
                    <td>{item.role}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
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

export default ViewUser;
