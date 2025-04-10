// components/AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, role } = useAuth();
  return token && role === "ROLE_ADMIN" ? children : <Navigate to="/login" />;
};

export default AdminRoute;
