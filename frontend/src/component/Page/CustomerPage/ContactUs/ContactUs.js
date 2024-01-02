import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelopesBulk } from '@fortawesome/free-solid-svg-icons';



function ContactUs() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getFullNameByIDCustomer/${localStorage.getItem("accountID")}`);
        if (!response.ok) {
          throw new Error('Failed to fetch full name');
        }
        const responseData = await response.json();
        console.log('Response Data:', responseData);
  
        
        const fullName = responseData.Customer[0].fullname;
  
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
        <h1> <span>Hi</span>  {fullName},</h1>
        <h4>Thank you for your interest in our <span>train ticket booking system</span></h4>
        <h4>If you need help, please contact us at 
          <ul>
            <li>
              <span>2231355 </span> <FontAwesomeIcon icon={faPhone} />
            </li>
          </ul>
          <ul>
            <li>
              <span>hihi@example.com</span> <FontAwesomeIcon icon={faEnvelopesBulk} />
 
            </li>
          </ul>
          </h4> 

        <div className='main-btn'>
        </div>
      </div>
    </section>
  );
}


export default ContactUs;