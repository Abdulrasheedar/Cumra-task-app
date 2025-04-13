// components/UserRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// This component protects routes that should only be accessed by users with ROLE_USER
const UserRoute = ({ children }) => {
  const { token, role } = useAuth();

  // If token exists and role is USER, render the child component
  // Otherwise, redirect the user to login page
  return token && role === "ROLE_USER" ? children : <Navigate to="/login" />;
};

export default UserRoute;
