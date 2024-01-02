import React, { useEffect, useState } from 'react';
import style from './style.css'



function ViewProfileC() {

  const [data, setMeetingData] = useState([]);
  const [data1, setMeetingData1] = useState([]);
  const [updatedData, setUpdatedData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getCustomerByID/${localStorage.getItem("accountID")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setMeetingData(responseData.Account || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchMeetingData1 = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getCustomerByID1/${localStorage.getItem("accountID")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setMeetingData1(responseData.Customer || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMeetingData();
    fetchMeetingData1();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'dob' ? new Date(value).toISOString().split('T')[0] : value;
    setUpdatedData({ ...updatedData, [name]: formattedValue });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8081/UpdateCustomerByID2/${localStorage.getItem("accountID")}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      setMeetingData(updatedData);
      setIsEditing(false);
      window.location.reload();

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);

    // Set the current data when entering edit mode
    if (!isEditing) {
      setUpdatedData(data1.length > 0 ? { ...data1[0] } : {});
    }
  };

  return (
    <body>
      <section className="hero1">
        <div className='containerP1'>

          <div className="text1">

            Your<span> Profile</span>

          </div>
          <div className="pro5">
            {isEditing ? (
              <form>
                <label>
                  Full Name:
                  <input type="text" name="fullname" value={updatedData.fullname || ''} onChange={handleInputChange} />
                </label>
                <label>
                  Phone Number:
                  <input type="text" name="phone" value={updatedData.phone || ''} onChange={handleInputChange} />
                </label>
                <label>
  Gender:
  <select name="gender" value={updatedData.gender || ''} onChange={handleInputChange}>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</label>
                <label>
                  Date of Birth:
                  <input type="date" name="dob" value={updatedData.dob || ''} onChange={handleInputChange} />
                </label>
                <label>
                  Citizen Identification Card:
                  <input type="text" name="citizen_identification_card" value={updatedData.citizen_identification_card || ''} onChange={handleInputChange} />
                </label>
                <button type="button" onClick={handleSave}>Save</button>
              </form>
            ) : (
              <ul className="custom-list">
                {data && data.length > 0 ? (
                  data.map((item) => (
                    <li key={item.id} className="list-item">
                      <span className="property">Full Name:</span> <span className="value">{item.fullname}</span><br />
                      <span className="property">Email:</span> <span className="value">{item.email}</span><br />
                      <span className="property">Citizen identification card:</span> <span className="value">{item.citizen_identification_card}</span><br />
                      <span className="property">Phone Number:</span> <span className="value">{item.phone}</span><br />
                      <span className="property">Gender:</span> <span className="value">{item.gender}</span><br />
                      <span className="property">Date of Birth:</span> <span className="value">{item.dob}</span><br />
                    </li>
                  ))
                ) : (
                  <p>No data available</p>
                )}
              </ul>
            )}
          <button onClick={handleToggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
          </div>
        </div>


      </section>
    </body>
  );

}


export default ViewProfileC;
