import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Alert, Container, Card } from "react-bootstrap";
import image from "../assets/Login.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      login(res.data.token);
      navigate("/submissions");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //     width: "100vw",
    //     backgroundColor: "grey",
    //   }}
    // >
    //   <div
    //     className="card mb-5"
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       width: "80%",
    //       height: "80%",
    //       boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    //     }}
    //   >
    //     {/* Image Section */}
    //     <div style={{ flex: 1 }}>
    //       <img
    //         src={image}
    //         alt="Card visual"
    //         style={{
    //           width: "100%",
    //           height: "100%",
    //           objectFit: "cover",
    //           borderTopLeftRadius: "0.375rem",
    //           borderBottomLeftRadius: "0.375rem",
    //         }}
    //       />
    //     </div>

    //     {/* Form Section */}
    //     <div style={{ flex: 1, padding: "2rem", backgroundColor:'#c603fc' }}>
    //       <h2 className="mb-4">Login</h2>
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group className="mb-3">
    //           <Form.Label>
    //             <h5>Username</h5>
    //           </Form.Label>
    //           <Form.Control
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //             placeholder="Enter username"
    //           />
    //         </Form.Group>

    //         <Form.Group className="mb-3">
    //           <Form.Label>
    //             <h5>Password</h5>
    //           </Form.Label>
    //           <Form.Control
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             placeholder="Enter password"
    //           />
    //         </Form.Group>
    //         <div className="d-flex justify-content-center">
    //           <Button variant="secondary" type="submit" className="px-5">
    //             Login
    //           </Button>
    //         </div>
    //         <div className="d-flex align-items-center my-4">
    //           <hr className="flex-grow-1" />
    //           <span className="mx-3 text-muted">Don't have an account?</span>
    //           <hr className="flex-grow-1" />
    //         </div>
    //         <div className="d-flex justify-content-center">
    //           <a href="/signup" className="btn btn-primary px-5">
    //             Sign Up
    //           </a>
    //         </div>

    //         {error && (
    //           <Alert variant="danger" className="mt-3">
    //             {error}
    //           </Alert>
    //         )}
    //       </Form>
    //     </div>
    //   </div>
    // </div>
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
    {/* Image Section */}
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

    {/* Form Section */}
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
          <a href="/signup" className="btn btn-light px-5">
            Sign Up
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

export default LoginPage;
