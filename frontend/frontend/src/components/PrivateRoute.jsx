import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

// This component protects private routes from unauthorized access
const PrivateRoute = ({children}) => {
    const {token} = useAuth(); // Check if the user is authenticated
  
  // If token exists, render the protected component
  // Else, redirect user to the login page  
  return token ? children:<Navigate to="/login" />
}

export default PrivateRoute
