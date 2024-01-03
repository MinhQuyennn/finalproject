import React, { useEffect, useState } from "react";
import style from "./style.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddEmployee() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    citizenIdentificationCard: "",
    fullname: "",
    phone: "",
    gender: "Male",
    dob: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/addnewemployee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          citizen_identification_card: formData.citizenIdentificationCard,
          fullname: formData.fullname,
          phone: formData.phone,
          gender: formData.gender,
          dob: formData.dob,
          status: "work",
        }),
      });

      const data = await response.json();

      console.log("New employee created:", data);
      toast.success("Employee added successfully");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <div>
      <ToastContainer />

      <section className="contentP">
        <div className="text1">
          Add Employee{" "}
          <span style={{ fontSize: "0.8em" }}>
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
        </div>
        <div className="containerP">
          <div className="employeeList">
            <form onSubmit={handleFormSubmit}>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />

              <label>Password:</label>
              <input
                type="password"
                name="password"
                onChange={handleInputChange}
                value={formData.password}
                required
              />

              <label>Citizen Identification Card:</label>
              <input
                type="text"
                name="citizenIdentificationCard"
                onChange={handleInputChange}
                value={formData.citizenIdentificationCard}
                required
              />

              <label>Full Name:</label>
              <input
                type="text"
                name="fullname"
                onChange={handleInputChange}
                value={formData.fullname}
                required
              />

              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                onChange={handleInputChange}
                value={formData.phone}
                required
              />

              <label>Gender:</label>
              <select
                name="gender"
                onChange={handleInputChange}
                value={formData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                onChange={handleInputChange}
                value={formData.dob}
                required
              />

              <button type="submit">Add Employee</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddEmployee;
