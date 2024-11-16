import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import React from 'react';
import {
  createBrowserRouter,
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
