import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check for auth token or similar state

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (e.g., dashboard components)
  return children;
};

export default PrivateRoute;
  