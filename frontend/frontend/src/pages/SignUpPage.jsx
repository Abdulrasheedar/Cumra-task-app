import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import image from "../assets/Signup.png"; // same image used in login page
import axios from "axios";
const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //Password validations
  const validateInputs = () => {

    const errors = [];

    if (!/^[a-zA-Z0-9_]{4,}$/.test(username)) {
      errors.push(
        "Username must be at least 4 characters and only contain letters, numbers, or underscores."
      );
    }
    if (!email.includes("@")) {
      errors.push("Invalid email format.");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain an uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain a lowercase letter.");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain a digit.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Password must contain a special character (!@#$%^&*).");
    }
     // Email validation (only accept gmail, yahoo, outlook)
     const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
     const emailDomain = email.split("@")[1];
 
     if (
       !email ||
       !email.includes("@") ||
       !allowedDomains.includes(emailDomain)
     ) {
       errors.push(
         "Email must be a valid address ending in @gmail.com, @yahoo.com, or @outlook.com."
       );
     }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();

    if (validationErrors.length > 0) {
      setError(validationErrors.join("\n"));
      return;
    }

    try {
      console.log(username, email, password);
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        username,
        email,
        password,
      });
      console.log("res: ", res);
      console.log({ username, email, password });
      navigate("/login"); // redirect to login after success
    } 
    catch (err) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        const errorMsg = Array.isArray(errorData)
          ? errorData.join("\n")
          : errorData.message || "Signup failed.";
        setError(errorMsg);
      } else {
        setError("Something went wrong during signup.");
      }
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
              <a href="/login" className="btn btn-light px-5">
                Login
              </a>
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

export default SignUpPage;
