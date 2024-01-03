import Login from "../component/Page/Login";
import ManagerPage from "../component/Page/ManagerPage/ManagerPage";
import CustomerPage from "../component/Page/CustomerPage/CustomerPage";
import Signup from "../component/Page/Signup";
import ViewEmployee from "../component/Page/ManagerPage/ViewEmployee/ViewEmployee";
import AddEmployee from "../component/Page/ManagerPage/ViewEmployee/addEmployee/addEmployee";
import ViewProfile from "../component/Page/ManagerPage/ViewProfile/ViewProfile";
import ViewUser from "../component/Page/EmployeePage/ViewUser";
import EmployeePage from "../component/Page/EmployeePage/EmployeePage";
import ContactUs from "../component/Page/CustomerPage/ContactUs/ContactUs";
import AddUser from "../component/Page/EmployeePage/AddUser";
import ViewTrain from "../component/Page/ManageTrain/ViewTrain";
import ViewTrainById from "../component/Page/ManageTrain/ViewTrainDetail";
import ListOfRoute from "../component/Page/ManageRoute/ListOfRoute";
import ViewRouteById from "../component/Page/ManageRoute/Viewroutedetail";
import AddRoute from "../component/Page/ManageRoute/AddRoute";
import ViewProfileC from "../component/Page/CustomerPage/viewProfile";
import ViewStaion from "../component/Page/ManageStation/ViewStation";
import AddStation from "../component/Page/ManageStation/AddStation";
import ListOfTrip from "../component/Page/ManageTrip/ListOfTrip";
import AddTrip from "../component/Page/ManageTrip/AddTrip";
import ManageTicket from "../component/Page/ManageTicket/ManageTicket";
import Route from "../component/Page/searchRoute/Route";
import ViewTicket from "../component/Page/CustomerPage/ViewTicket";

export const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

export const CustomerRoutes = [
  { path: "/route", element: <Route /> },
  { path: "/home/viewProfile/:id", element: <ViewProfileC /> },
  { path: "/home/route", element: <Route /> },
  { path: "/home/viewTicket", element: <ViewTicket /> },
  { path: "/home/contactUs", element: <ContactUs /> },
];

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
  { path: "/hompageEmployee", element: <EmployeePage /> },
  { path: "/homepageEmployee/viewUser", element: <ViewUser /> },
  { path: "/homepageEmployee/viewUser/addUser", element: <AddUser /> },
  { path: "/homepageEmployee/Train", element: <ViewTrain /> },
  {
    path: "/homepageEmployee/Train/viewtraindetail/:train_id",
    element: <ViewTrainById />,
  },
  {
    path: "/homepageEmployee/Route",
    element: <ListOfRoute />,
  },
  {
    path: "/homepageEmployee/Route/viewroutedetail/:route_id",
    element: <ViewRouteById />,
  },
  { path: "/homepageEmployee/Route/addroute", element: <AddRoute /> },
  { path: "/homepageEmployee/Station", element: <ViewStaion /> },
  { path: "/homepageEmployee/AddStation/addstation", element: <AddStation /> },
  { path: "/homepageEmployee/Trip", element: <ListOfTrip /> },
  { path: "/homepageEmployee/Trip/addtrip", element: <AddTrip /> },
  { path: "/homepageEmployee/Ticket", element: <ManageTicket /> },
];
