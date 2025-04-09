import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SubmissionsPage from './pages/SubmissionsPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App=() =>{
return(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/submissions" element = {<PrivateRoute><SubmissionsPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App
