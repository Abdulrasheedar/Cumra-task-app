import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarComponent = () => {
  const { logout, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) return null; // Hide navbar if not logged in

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to= "/dashboard"
          style={{ cursor: "pointer" }}
        >
          Cumra-Task
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {role === "ROLE_ADMIN" && (
              <>
                <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/viewsubmissions">
                  View & Manage Submissions
                </Nav.Link>
                <Nav.Link as={NavLink} to="/manageusers">
                  Manage Users
                </Nav.Link>
              </>
            )}
            {role === "ROLE_USER" && (
              <>
              <Nav.Link as={NavLink} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} to="/submissions">
                  New Submission
                </Nav.Link>
                <Nav.Link as={NavLink} to="/viewsubmissions">
                  View & Manage Submissions
                </Nav.Link>
              </>
            )}
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
