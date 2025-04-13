import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarComponent = () => {
  const { logout, isAuthenticated, role } = useAuth(); // Auth context to determine user status and role
  const navigate = useNavigate();

  // Handle logout and redirect to login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Do not render navbar if user is not authenticated
  if (!isAuthenticated) return null;

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        {/* Brand logo or title that redirects to dashboard */}
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
            {/* Admin navigation links */}
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
            {/* Regular user navigation links */}
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
          {/* Logout button */}
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
