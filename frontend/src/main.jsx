import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Index from './pages/Index.jsx';
import Login from './componets/Login.jsx';
import Register from './componets/Register.jsx';
import Home from './pages/Home.jsx';
import AdminDashboard from './componets/AdminDashboard.jsx';
import RoomManagement from './componets/RoomMangement.jsx';
import BookingManagement from './componets/BookingManagement.jsx';
import UserManagement from './componets/UserManagement.jsx';
import ProtectedRoute from './componets/ProtectedRoute.jsx'; // Import the ProtectedRoute component
import RoomList from './pages/RoomList.jsx';
import Contact from './pages/Contact.jsx';
import YourBooking from './pages/YourBooking.jsx';
import { UserProvider } from './context/UserContext.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/register" />, // Redirect to the register page
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/room',
        element: <RoomList />,
      },
      {
        path: '/order',
        element: <YourBooking />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },

      // Protecting the admin-related routes
      {
        path: '/admin-dashboard',
        element: <ProtectedRoute role="admin" />,  
        children: [
          {
            path: '',  
            element: <AdminDashboard />,
          },
          {
            path: 'usermanagement',  
            element: <UserManagement />,
          },
          {
            path: 'bookingmanagement', 
            element: <BookingManagement />,
          },
          {
            path: 'roomsmanagement', 
            element: <RoomManagement />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
