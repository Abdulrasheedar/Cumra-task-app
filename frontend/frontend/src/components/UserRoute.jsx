// components/UserRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { token, role } = useAuth();
  return token && role === "ROLE_USER" ? children : <Navigate to="/login" />;
};

export default UserRoute;
