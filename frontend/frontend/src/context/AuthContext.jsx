import React, { useState, useContext, createContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const login = (newToken, newRole, newUsername) => {
    setToken(newToken);
    setRole(newRole);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('username',newUsername); 
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider
      value={{ token, login, logout, role,username, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
