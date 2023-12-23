import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8081/getPasswordToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setMessage('');
        navigate('/reset-password');
      } else {
        const data = await response.json(); // Parse response data
        setMessage(data.message || 'Error: Email not found. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="hero">
      <div className="Login">
        <div className="text">
          <h3>Forgotten Password</h3>
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="info-message">{message}</div>}
        <form onSubmit={handleEmailSubmit} >
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={handleEmailChange} 
            required
          />
          <button type="submit">
            SUBMIT
          </button>
        </form>
        <div className="login__forgot-password">
          <Link to="/">Remembered your password? Sign in</Link>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
