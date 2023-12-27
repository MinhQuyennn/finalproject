import React, { useState, useEffect } from 'react';
import style from './style.css';

function CustomerPage() {
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    // Function to fetch the customer ID based on account ID
    const fetchCustomerID = async () => {
      try {
        const account_id = localStorage.getItem('accountID');
        const response = await fetch(`http://localhost:8081/GetCustomerIDByAccountID/${account_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // For GET requests, body should be empty or omitted
        });

        if (!response.ok) {
          throw new Error('Failed to fetch customer ID');
        }

        const data = await response.json();
        setCustomerId(data.customer_id);
        localStorage.setItem('selectedCustomerId', data.customer_id)
      } catch (error) {
        console.error('Error fetching customer ID:', error);
      }
    };

    // Call the fetchCustomerID function
    fetchCustomerID();
  }, []);

  return (
    <div>
      <h1>Customer Page</h1>
      {customerId ? (
        <p>Customer ID: {customerId}</p>
      ) : (
        <p>Loading customer ID...</p>
      )}
    </div>
  );
}

export default CustomerPage;
