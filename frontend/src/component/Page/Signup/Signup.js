import React, { useState } from 'react';
import styles from './style.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {

  const [gender, setGender] = useState('Female');
  const handleTimeChange = (e) => {
    setGender(e.target.value);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    date_of_birth: '',
    position: '',
    company: '',
    gender: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      // You may want to provide feedback to the user here
      return;
    }

    try {
      // Example using fetch API, replace with your actual API endpoint
      const response = await fetch(`https://backend-final-web.onrender.com/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          full_name: formData.full_name,
          date_of_birth: formData.date_of_birth,
          position: formData.position,
          company: formData.company,
          gender: gender,
          phonenumber: formData.phonenumber,
          password: formData.password,
        }),
      });

      if (response.ok) {
        console.log('Signup successful!');
        navigate('/');
      } else {
        console.error('Signup failed');
        if (response.status === 401) {
          console.error('Email already exists');
          alert('Signup failed. The email already exists. Please use a different email.');
        }
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <section className={`hero signup`} id="home">
      <div className='storee'>
        <div className={`text`}>
          <h2>Sign Up</h2>
        </div>
        <div className={`container`}>
          <div className={`content`}>
            <form onSubmit={handleSubmit}>
              <div className={`user-details`}>

                <div className={`input-box`}>
                  <span className={`details`}>Email</span>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className={`input-box`}>
                  <span className={`details`}>Full Name</span>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={`input-box`}>
                  <span className={`details`}>Date of Birth</span>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    placeholder="Enter your DoB"
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className={`input-box`}>
                  <span className={`details`}>Position</span>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Enter your position"
                    required
                  />
                </div>
                <div className={`input-box`}>
                  <span className={`details`}>Company</span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enter your company"
                    required
                  />
                </div>

                <div className={`input-box`}>
                  <label >Gender</label>
                  <select
                    value={gender}
                    onChange={handleTimeChange}
                  >
                    <option value="Female" >Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div className={`input-box`}>
                  <span className={`details`}>phonenumber</span>
                  <input
                    type="text"
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    placeholder="Enter your phonenumber"
                    required
                  />
                </div>

                <div className={`input-box`}>
                  <span className={`details`}>Password</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className={`input-box`}>
                  <span className={`details`}>Confirm Password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className={`log`}>
                <p className={`log`}>
                  <i>
                    <Link className={`log`} to="/">
                      Already have an account? Login
                    </Link>
                  </i>
                </p>
              </div>
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Signup;
