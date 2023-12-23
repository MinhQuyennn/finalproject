import React, { useState } from 'react';
import styles from './style.css';
import { Link, useNavigate } from 'react-router-dom';
const backendUrl = process.env.REACT_APP_BACKEND_URL;


function Signup() {
  const [gender, setGender] = useState('Female');
  const handleTimeChange = (e) => {
    setGender(e.target.value);
  };
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    fullname: '',
    dob: '',
    id_card: '',
    citizen_identification_card: '',
    gender: '',
    phone: '',
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
      const response = await fetch(`http://localhost:8081/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          fullname: formData.fullname,
          dob: formData.dob,
          id_card: formData.id_card,
          citizen_identification_card: formData.citizen_identification_card,
          gender: gender,
          phone: formData.phone,
          password: formData.password,
        }),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        const { id, role } = responseData;
        localStorage.setItem('accountID', id);
        localStorage.setItem('currentRole', role);
        console.log('Signup successful!');
        navigate('/');
      } else {
        console.error('Signup failed:', responseData); // Log the error response
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
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className={`input-box`}>
                  <span className={`details`}>Date of Birth</span>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    placeholder="Enter your Date of Birth"
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className={`input-box`}>
                  <span className={`details`}>ID Card</span>
                  <input
                    type="text"
                    name="id_card"
                    value={formData.id_card}
                    onChange={handleChange}
                    placeholder="Enter your ID Card"
                    required
                  />
                </div>
                <div className={`input-box`}>
                  <span className={`details`}>Citizen Identification Card</span>
                  <input
                    type="text"
                    name="citizen_identification_card"
                    value={formData.citizen_identification_card}
                    onChange={handleChange}
                    placeholder="Enter your Citizen Card"
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
                  <span className={`details`}>Phone Number</span>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your Phone Number"
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
