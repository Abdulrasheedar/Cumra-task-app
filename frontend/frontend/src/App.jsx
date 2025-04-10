import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SubmissionsPage from './pages/SubmissionsPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import SignUpPage from './pages/SignUpPage';
import Navbar  from './components/NavbarComponent';
import SubmissionsState from './context/submissions/SubmissionsState';
import ViewSubmissionsPage from './pages/ViewSubmissionsPage';
import Dasboard from './pages/Dasboard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import ManageUsersPage from './pages/ManageUsersPage';


const App=() =>{
return(
  <>
  
  <BrowserRouter>
    <AuthProvider>
      <SubmissionsState >
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="signup" element={<SignUpPage/>} />
        <Route path="/submissions" element = {<UserRoute><SubmissionsPage /></UserRoute>} />
        <Route path="/viewsubmissions" element = {<PrivateRoute><ViewSubmissionsPage /></PrivateRoute>} />
        <Route path="/dashboard" element = {<PrivateRoute><Dasboard /></PrivateRoute>} />
        <Route path="/manageusers" element = {<AdminRoute><ManageUsersPage /></AdminRoute>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </SubmissionsState>
    </AuthProvider>
  </BrowserRouter>
  </>
  );
}

export default App
