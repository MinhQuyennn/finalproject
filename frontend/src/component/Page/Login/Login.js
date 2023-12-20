import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './style.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        const { token, role: userRole, id: accountId } = data;
  
        // Store token, role, and account ID in local storage
        localStorage.setItem('accountID', accountId);
        localStorage.setItem('currentRole', userRole);
  
        // Navigate based on the retrieved role from local storage
        if (userRole === 'customer') {
          navigate('/home');
          localStorage.setItem('token-customer', token);
        } else if (userRole === 'manager') {
          localStorage.setItem('token-manager', token);
          navigate('/homepageManager');
        } else if (userRole === 'employee') {
          localStorage.setItem('token-employee', token);
          navigate('/hompageEmployee');
        }
        

      } else {
        // Handle login failure (e.g., display an error message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  console.log("Day la token-employee" , localStorage.getItem('token-employee'));
  console.log("Day la token-manager" ,localStorage.getItem('token-manager'));
  console.log("Day la token-user" ,localStorage.getItem('token-user'));

  return (
    <section className="hero">
      <div className="Login">
        <div className="text">
          <h3>Login</h3>
        </div>
        <div className="form">
          <label htmlFor="uname">
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="psw">
          </label>
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
                <a className="regis">
                  <Link className="regis" to="/signup">Do not have an account?</Link>
                </a>
              </i>
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
