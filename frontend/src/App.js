import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import Login from './component/Page/Login';
// import Footer from './component/Footer';
// import Header from './component/Header';
// import Loader from './component/Loader/Loader';
import ManagerPage from './component/Page/ManagerPage/ManagerPape';
import EmployeePage from './component/Page/EmployeePage/EmployeePage';
import CustomerPage from './component/Page/CustomerPage/CustomerPage';

const publicRoutes = [
  { path: '/', element: <Login /> }

];

const CustomerRoutes = [
  { path: '/home', element: <CustomerPage /> }
];


// Private routes
const ManagerRoutes = [
  { path: '/homepageManager', element:<ManagerPage />}

];
const EmployeeRoutes = [
  { path: '/hompageEmployee', element: <EmployeePage />}

];

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
  
    // Check tokens in local storage
    const tokenManager = localStorage.getItem('token-manager');
    const tokenEmployee = localStorage.getItem('token-employee');
    const tokenUser = localStorage.getItem('token-user');
  
    setIsManager(!!tokenManager);
    setIsEmployee(!!tokenEmployee);
    setIsCustomer(!!tokenUser);


  }, []);


  // if (loading) {
  //   return <Loader />;
  // }

  return (
    <Router>
      <div className='App'>
        {/* <Header /> */}
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

