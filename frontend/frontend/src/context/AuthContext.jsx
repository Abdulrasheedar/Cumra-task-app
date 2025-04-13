import React, { useState, useContext, createContext, useEffect } from 'react';

// Create a global context for authentication
const AuthContext = createContext();

// AuthProvider wraps the entire app and shares auth state
export const AuthProvider = ({ children }) => {
  // Initial state is retrieved from localStorage for persistence
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [username, setUsername] = useState(localStorage.getItem('username'));

  // state from localStorage on page reload
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('username');
    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);
    if (storedUsername) setUsername(storedUsername);
  }, []);

  // Login updates both state and localStorage
  const login = (newToken, newRole, newUsername) => {
    setToken(newToken);
    setRole(newRole);
    setUsername(newUsername);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole);
    localStorage.setItem('username',newUsername); 
  };

  // Logout clears both state and localStorage
  const logout = () => {
    setToken(null);
    setRole(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role'); 
    localStorage.removeItem('username');
  };

  // Provide context values to children components
  return (
    <AuthContext.Provider
      value={{ token, login, logout, role,username, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
