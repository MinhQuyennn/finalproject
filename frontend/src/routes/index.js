import Login from '../component/Page/Login';
import ManagerPage from '../component/Page/ManagerPage/ManagerPage';
import EmployeePage from '../component/Page/EmployeePage/EmployeePage';
import CustomerPage from '../component/Page/CustomerPage/CustomerPage';
import Signup from '../component/Page/Signup';
import ViewEmployee from '../component/Page/ManagerPage/ViewEmployee';
import AddEmployee from '../component/Page/ManagerPage/ViewEmployee/addEmployee';

export const publicRoutes = [
  { path: '/', element: <Login /> },
  { path: '/signup', element: <Signup /> }
];

export const CustomerRoutes = [
  { path: '/home', element: <CustomerPage /> }
];

export const ManagerRoutes = [
  { path: '/homepageManager', element: <ManagerPage /> },
  { path: '/homepageManager/viewEmployee', element: <ViewEmployee /> },
  { path: '/homepageManager/viewEmployee/addEmployee', element: <AddEmployee /> }
];

export const EmployeeRoutes = [
  { path: '/hompageEmployee', element: <EmployeePage /> }
];
