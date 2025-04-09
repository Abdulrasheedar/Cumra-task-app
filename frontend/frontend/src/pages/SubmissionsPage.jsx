import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const SubmissionsPage = () => {
  const { token } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fetchSubmissions = async () => {
    const res = await axios.get('http://localhost:8080/api/user/submissions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSubmissions(res.data);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      'http://localhost:8080/api/user/submissions',
      { title, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTitle('');
    setContent('');
    fetchSubmissions();
  };

  return (
    <div className='d-flex justify-content-center align-items-center'
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#f8f9fa',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
        <Card style={{ width: '80rem' }}>
        <Card.Body>
      <h2 className="mb-4">Your Submissions</h2>

      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            value={title}
            style={{maxWidth:'600px'}}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            style={{maxWidth:'600px'}}
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="success" type="submit" className="px-4">
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
