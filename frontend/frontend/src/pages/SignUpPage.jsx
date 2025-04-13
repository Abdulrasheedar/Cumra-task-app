import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import image from "../assets/Signup.png";
import axios from "axios";
import { validateSignup } from "../utils/Validation";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateSignup({ username, email, password });

    if (validationErrors.length > 0) {
      setError(validationErrors);
      setSuccess("");
      return;
    }

    try {
      // Send signup request to backend
      const res = await axios.post(`${baseURL}/auth/signup`, {
        username,
        email,
        password,
      });

      setError([]);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      // Handle backend validation or system errors
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMsg = Array.isArray(errorData)
          ? errorData
          : [errorData.message || "Signup failed."];
        setError(errorMsg);
      } else {
        setError(["Something went wrong during signup."]);
      }
      setSuccess("");
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
            alt="Sign up visual"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderTopLeftRadius: "0.375rem",
              borderBottomLeftRadius: "0.375rem",
            }}
          />
        </div>
        <div
          className="w-100 w-lg-50"
          style={{ padding: "2rem", backgroundColor: "#d1d1d1" }}
        >
          <h2 className="mb-4 text-white">Sign Up</h2>
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
                <h5>Email</h5>
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
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
                Sign Up
              </Button>
            </div>

            <div className="d-flex align-items-center my-4">
              <hr className="flex-grow-1" />
              <span className="mx-3 text-white">Already have an account?</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="d-flex justify-content-center">
              <Link to="/login" className="btn btn-light px-5">
                Login
              </Link>
            </div>

            {Array.isArray(error) && error.length > 0 && (
              <Alert variant="danger" className="mt-3">
                <ul className="mb-0">
                  {error.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </Alert>
            )}

            {success && (
              <Alert variant="success" className="mt-3">
                {success}
              </Alert>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
