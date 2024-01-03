import React, { useState } from "react";
import styles from "./style.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);

        const { token, role: userRole, id: accountId } = data;
        console.log("Account ID:", accountId);

        let additionalData = {};

        localStorage.setItem("accountID", accountId);
        console.log(
          "After setting accountID:",
          localStorage.getItem("accountID")
        );

        localStorage.setItem("currentRole", userRole);

        if (userRole === "customer") {
          navigate("/route");
          localStorage.setItem("token-customer", token);
          localStorage.setItem("token-customer", token);
          console.log("Day la token-user", localStorage.getItem("token-user"));
          window.location.reload();
        } else if (userRole === "manager") {
          localStorage.setItem("token-manager", token);
          navigate("/homepageManager");
          console.log(
            "Day la token-manager",
            localStorage.getItem("token-manager")
          );
          window.location.reload();
        } else if (userRole === "employee") {
          const employeeResponse = await fetch(
            `http://localhost:8081/getEmployeeByAcc/${accountId}`
          );
          additionalData = await employeeResponse.json();
          console.log("Employee Data:", additionalData);

          const { Status: status } = additionalData;

          if (status === "quit") {
            alert(
              "You don't have permission to log in. Please contact your manager to unlock your account."
            );
            return;
          } else {
            localStorage.setItem("token-employee", token);
            navigate("/hompageEmployee");
            console.log(
              "Day la token-employee",
              localStorage.getItem("token-employee")
            );
            window.location.reload();
          }
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <section className="hero">
      <div className="Login">
        <div className="text">
          <h3>Login</h3>
        </div>
        <div className="form">
          <label htmlFor="uname"></label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="psw"></label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="regis">
            <p className="regis">
              <i>
                <a className="regis" href="/forgotten-password">
                  Forgotten your password?
                </a>
              </i>
              <a className="regis">
                <Link className="regis" to="/signup">
                  Do not have an account?
                </Link>
              </a>
            </p>
          </div>
          <button type="button" onClick={handleSubmit}>
            LOGIN
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
