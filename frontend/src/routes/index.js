import Login from '../component/Page/Login';
import ManagerPage from '../component/Page/ManagerPage/ManagerPage';
import EmployeePage from '../component/Page/EmployeePage/EmployeePage';
import CustomerPage from '../component/Page/CustomerPage/CustomerPage';

export const publicRoutes = [
  { path: '/', element: <Login /> }
];

export const CustomerRoutes = [
  { path: '/home', element: <CustomerPage /> }
];

export const ManagerRoutes = [
  { path: '/homepageManager', element: <ManagerPage /> }
];

export const EmployeeRoutes = [
  { path: '/hompageEmployee', element: <EmployeePage /> }
];
