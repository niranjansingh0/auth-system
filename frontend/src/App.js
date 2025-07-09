import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { storage } from './services/api';

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(storage.isAuthenticated());

  // Sync auth state on route change
  useEffect(() => {
    setIsAuthenticated(storage.isAuthenticated());
  }, [location]);

  // Listen for logout/login events from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(storage.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
      />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Register />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}

export default App;
