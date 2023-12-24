import React, { useEffect, useState } from 'react';
import style from './style.css'



function ViewProfile() {
 
  const [data, setMeetingData] = useState([]);

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getManagerByID/${localStorage.getItem("accountID")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        console.log('responseData:', responseData);
  
        setMeetingData(responseData.Account || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchMeetingData();
  }, []);
  
  return (
    <body>
      <section className="hero1">
        <div className='containerP1'>

          <div className="text1">

            Your<span> Profile</span>

        </div>
        <div className="pro5">
          {data && data.length > 0 ? (
            <ul className="custom-list">
              {data.map((item) => (
                <li key={item.id} className="list-item">
                  <span className="property">Full Name:</span> <span className="value">{item.fullname}</span><br />
                  <span className="property">Email:</span> <span className="value">{item.email}</span><br />
                  <span className="property">Citizen identification card:</span> <span className="value">{item.citizen_identification_card}</span><br />
                  <span className="property">Phone Number:</span> <span className="value">{item.phone}</span><br />
                  <span className="property">Gender:</span> <span className="value">{item.gender}</span><br />
                  <span className="property">Date of Birth:</span> <span className="value">{item.dob}</span><br />
                </li>
              ))}
            </ul>
          ) : (
            <p>No data available</p>
          )}
        </div>
        </div>
        
  
      </section>
    </body>
  );
  
}


export default ViewProfile;
