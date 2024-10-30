import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import React from 'react';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = Cookies.get('access_token');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;