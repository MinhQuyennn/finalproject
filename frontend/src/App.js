import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { publicRoutes, ManagerRoutes, EmployeeRoutes, CustomerRoutes } from './routes/index';

// import Footer from './component/Footer';
import Header from './component/Header';
import Loader from './component/Loader/Loader';


const App = () => {
  const [isManager, setIsManager] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay (replace with your actual data fetching logic)
    const fetchData = async () => {
      // Simulate data fetching delay (replace with your actual data fetching logic)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setLoading(false);
    };

    fetchData();
    const currentRole = localStorage.getItem('currentRole');
    if (currentRole === 'manager') {
      setIsManager(true);
    } else if (currentRole === 'employee') {
      setIsEmployee(true);
    } else if (currentRole === 'customer') {
      setIsCustomer(true);
    }

  }, []);


  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <div className='App'>
        
        <Header />
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

          {ManagerRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                isManager ? (
                  route.element
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          ))}

          {EmployeeRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                isEmployee ? (
                  route.element
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          ))}

          {CustomerRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                isCustomer ? (
                  route.element
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          ))}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;

