import React from 'react';
import { Navigate } from 'react-router-dom';
import { storage } from '../services/api';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = storage.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;