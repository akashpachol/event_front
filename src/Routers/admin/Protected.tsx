import React from 'react';
import { Navigate } from 'react-router-dom';

type RouteProps={
  isAuthenticated:boolean |null,
  children: React.ReactNode; 
}

export const PrivateRoute:React.FC <RouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/adminlogin" />;
};

export const RestrictedRoute:React.FC <RouteProps> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? <Navigate to="/adminlogin" /> : children;
};


