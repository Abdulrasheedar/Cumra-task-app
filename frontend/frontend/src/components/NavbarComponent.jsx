// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// const NavbarComponent = () => {
//   return (
//       <Navbar bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Brand href="#home">Navbar</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="/home">Home</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//   )
// }

// export default NavbarComponent


// components/AppNavbar.js
import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarComponent = () => {
  const { logout, isAuthenticated } = useAuth(); // Assuming `isAuthenticated` is tracked
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null; // Don't show navbar if not logged in

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand>Cumra-Task</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/submissions">Submissions</Nav.Link>
            <Nav.Link as={NavLink} to="/viewsubmissions">View Submissions</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
