import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Index from './pages/Index.jsx'
import Login from './componets/Login.jsx'
import Register from './componets/Register.jsx'
import Home from './pages/Home.jsx'
import AllRooms from './pages/AllRooms.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:'/',
        element:<Index />
      },
      {
        path:'/login',
        element:<Login />
      },
      {
        path:'/register',
        element:<Register />
      },
      {
        path:'/home',
        element:<Home />
      },
      {
        path:'/rooms',
        element:<AllRooms />
      },
       
    ]
  },
 
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
 </StrictMode>,
)
