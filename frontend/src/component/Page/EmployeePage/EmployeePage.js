import React, { useEffect, useState } from 'react';


function EmployeePage() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getFullNameByIDEmployee/${localStorage.getItem("accountID")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch full name');
        }
        const responseData = await response.json();
        console.log('Response Data:', responseData);
  
        
        const fullName = responseData.Manager[0].fullname;
  
        setFullName(fullName);
      } catch (error) {
        console.error('Error fetching full name:', error);
      }
    };
  
    fetchFullName();
  }, []);
  
  
  return (
    <section className="hero">
    <div className='main-content' >
        <h4> <span>Hi employee</span>  {fullName}</h4>
        <h1>
          Well <span>Comeback</span>
        </h1>
        <div className='main-btn'>
        </div>
      </div>
    </section>
  );
}

export default EmployeePage;
