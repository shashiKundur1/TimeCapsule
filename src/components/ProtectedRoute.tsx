import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'react-hot-toast';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    toast.error('Please log in to access this page');
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

export default ProtectedRoute;