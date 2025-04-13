import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// This component is used to protect admin-only routes
const AdminRoute = ({ children }) => {
  const { token, role } = useAuth();
  // If user is logged in and has admin role, allow access; else redirect to login
  return token && role === "ROLE_ADMIN" ? children : <Navigate to="/login" />;
};

export default AdminRoute;
