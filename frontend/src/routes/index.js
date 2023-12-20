// Pages
import Homepage from '../component/Page/Homepage';
import Homepage_Admin from '../component/Page/Homepage_Admin/HomepageAd';
import Login from '../component/Page/Login';
import ViewBookingUser from '../component/Page/ViewBooking_User';
import ViewBookingAdmin from '../component/Page/ViewBooking_Admin/ViewBookingAdmin';
import { Route, Navigate } from 'react-router-dom';

// Public routes
const publicRoutes = [
    { path: '/home', component: Homepage },
    { path: '/', component: Login },
    { path: '/home/viewBooking', component: ViewBookingUser }
];

const privateRoutes = [
    { path: '/homeAd/viewBooking', component: ViewBookingAdmin },
    { path: '/homeAd', component: Homepage_Admin }
];


export { publicRoutes, privateRoutes };