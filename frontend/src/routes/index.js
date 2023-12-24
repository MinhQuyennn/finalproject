import Login from '../component/Page/Login';
import ManagerPage from '../component/Page/ManagerPage/ManagerPage';
import EmployeePage from '../component/Page/EmployeePage/EmployeePage';
import CustomerPage from '../component/Page/CustomerPage/CustomerPage';
import Signup from '../component/Page/Signup';
import ViewEmployee from '../component/Page/ManagerPage/ViewEmployee/viewEmployee';
import AddEmployee from '../component/Page/ManagerPage/ViewEmployee/AddEmployee/AddEmployee'
import ViewProfile from '../component/Page/ManagerPage/ViewProfile/ViewProfile';


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
  { path: '/homepageManager/viewEmployee/addEmployee', element: <AddEmployee /> },
  { path: '/homepageManager/viewProfile/:id', element: <ViewProfile /> }
];

export const EmployeeRoutes = [
  { path: '/hompageEmployee', element: <EmployeePage /> }
];
