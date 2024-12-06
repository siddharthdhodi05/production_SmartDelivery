// App.jsx
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dash from './components/dashboard/Dash';
import Order from './components/orders/Order';
import Partner from './components/partners/Partner';
import Assignment from './components/assignment/Assignment';
import CreateAssignment from './components/assignment/CreateAssignment';
import AddPartner from './components/partners/AddPartner';
import AddOrder from './components/orders/AddOrder';
import Register from './components/register/Register';
import Login from './components/login/Login';

const router = createBrowserRouter([
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dash />
      },
      {
        path: "/order",
        element: <Order />
      },
      {
        path: "/partner",
        element: <Partner />
      },
      {
        path: "/assignment",
        element: <Assignment />
      },
      {
        path: "/createAssign",
        element: <CreateAssignment />
      },
      {
        path: "/addpart",
        element: <AddPartner />
      },
      {
        path: "/addOrder",
        element: <AddOrder />
      },
    ]
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
