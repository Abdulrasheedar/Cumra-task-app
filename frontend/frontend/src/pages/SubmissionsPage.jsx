import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const SubmissionsPage = () => {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const fetchSubmissions = async () => {
    const res = await axios.get(`${baseURL}/user/submissions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/user/submissions`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setContent("");
      fetchSubmissions();
      setShowAlert(true); // Show success alert
      setTimeout(() => setShowAlert(false), 3000); // Hide after 3 seconds
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#f8f9fa",
        padding: "80px",
        boxSizing: "border-box",
      }}
    >
      <Card className="w-100" style={{ maxWidth: "600px", width: "100%" }}>
        <Card.Body>
          <h2 className="mb-4 text-center">Submission Form</h2>
          {showAlert && (
            <div className="mb-3">
              <div className="alert alert-success text-center" role="alert">
                Submission successful!
              </div>
            </div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter content"
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="success" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SubmissionsPage;
