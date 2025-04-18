import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert } from "react-bootstrap";
import image from "../assets/Login.png";


const LoginPage = () => {
  // State for form inputs and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call backend login endpoint
      const res = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });
      // Store JWT token, user role, and username in context/localStorage
      login(res.data.token, res.data.roles[0], username);
      navigate("/dashboard");
    } catch (err) {
      // Show error message on login failure
      setError("Invalid credentials");
    }
  };

  return (
    <div
  className="d-flex justify-content-center align-items-center"
  style={{
    height: "100vh",
    width: "100vw",
    backgroundColor: "grey",
  }}
>

  {/* Card container with image and login form */}
  <div
    className="card mb-5 d-flex flex-column flex-lg-row"
    style={{
      width: "90%",
      maxWidth: "1000px",
      height: "auto",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
  >

    <div className="w-100 w-lg-50">
      <img
        src={image}
        alt="Card visual"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderTopLeftRadius: "0.375rem",
          borderBottomLeftRadius: "0.375rem",
        }}
      />
    </div>

    {/*login form */}
    <div
      className="w-100 w-lg-50"
      style={{ padding: "2rem", backgroundColor: "#d1d1d1" }}
    >
      <h2 className="mb-4 text-white">Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="text-white">
            <h5>Username</h5>
          </Form.Label>
          <Form.Control
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="text-white">
            <h5>Password</h5>
          </Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="secondary" type="submit" className="px-5">
            Login
          </Button>
        </div>

        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1" />
          <span className="mx-3 text-white">Don't have an account?</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="d-flex justify-content-center">
          <Link to="/signup" className="btn btn-light px-5">
            Sign Up
          </Link>
        </div>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
