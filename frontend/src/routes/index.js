import Login from "../component/Page/Login";
import ManagerPage from "../component/Page/ManagerPage/ManagerPage";
import CustomerPage from "../component/Page/CustomerPage/CustomerPage";
import Signup from "../component/Page/Signup";
import ViewEmployee from "../component/Page/ManagerPage/ViewEmployee/ViewEmployee";
import AddEmployee from "../component/Page/ManagerPage/ViewEmployee/addEmployee/addEmployee";
import ViewProfile from "../component/Page/ManagerPage/ViewProfile/ViewProfile";
import ViewUser from '../component/Page/EmployeePage/ViewUser';
import EmployeePage from "../component/Page/EmployeePage/EmployeePage";
import AddUser from '../component/Page/EmployeePage/AddUser';

export const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

export const CustomerRoutes = [{ path: "/home", element: <CustomerPage /> }];

export const ManagerRoutes = [
  { path: "/homepageManager", element: <ManagerPage /> },
  { path: "/homepageManager/viewEmployee", element: <ViewEmployee /> },
  {
    path: "/homepageManager/viewEmployee/addEmployee",
    element: <AddEmployee />,
  },
  { path: "/homepageManager/viewProfile/:id", element: <ViewProfile /> },
];

export const EmployeeRoutes = [
  { path: "/hompageEmployee", element: <EmployeePage/> },
  { path: '/homepageEmployee/viewUser', element: <ViewUser /> },
  { path: '/homepageEmployee/viewUser/addUser', element: <AddUser /> },,
];
