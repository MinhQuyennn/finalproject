import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleTokenChange = (e) => {
        setToken(e.target.value);
      };
    
      const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
      };
    
      const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
      };
    
      const handleTokenSubmit = async (e) => {
        e.preventDefault();
    
        if (newPassword !== confirmPassword) {
          setMessage('Error: Passwords do not match.');
          return;
        }
    
        try {
          // Make a POST request to your backend API to reset the password with token and new password
          const response = await fetch(`http://localhost:8081/reset-password`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resetToken: token, newPassword, confirmPassword }),
          });
    
          if (response.status === 200) {
            setMessage('Password reset successful. You can now login with your new password.');
            toast.success('Password reset successful. You can now login with your new password.');
            navigate('/');
          } else {
            setMessage('Error: Could not reset password. Please try again later.');
            toast.error('Error: Could not reset password. Please try again later.');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('An error occurred. Please try again later.');
        }
      };

  return (
    <section className="hero">
      <div className="Login">
        <div className="text">
          <h3>Reset Password</h3>
        </div>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="info-message">{message}</div>}
        <form onSubmit={handleTokenSubmit} >
          <div classname="1">
          <input
            type="text"
            placeholder="Enter Token"
            name="email"
            value={token}
            onChange={handleTokenChange}
            required
          />
            </div>

            <div classname="2">
            <input
            type="password"
            placeholder="Change Password"
            name="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />
          </div>
          <div classname="3">
            <input
            type="password"
            placeholder="Confirm Password"
            name="email"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
            </div>
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

export default ResetPassword;
