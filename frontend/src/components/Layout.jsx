import React from 'react';
import Navbar from './shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './shared/Footer';
import Login from './login/Login';

const Layout = () => {
  // Check if token is available in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Outlet /> {/* This will render the child route component */}
          <Footer />
        </>
      ) : (
        <Login /> // Redirects or shows login if not authenticated
      )}
    </>
  );
};

export default Layout;
