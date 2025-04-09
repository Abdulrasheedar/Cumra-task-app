import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext'; // ✅ must be added


const SubmissionsPage = () => {
  const {token} = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchSubmissions = async ()=> {
    const res = await axios.get('http://localhost:8080/api/user/submissions',{
        headers: {Authorization: `Bearer ${token}`},
    });
    setSubmissions(res.data);
  };

  useEffect(()=>{
    fetchSubmissions();
  },[]);

  const handleSubmit =  async(e) =>{
    e.preventDefault();
    await axios.post(
        'http://localhost:8080/api/user/submissions',
        {title, content},
        {headers: {Authorization:`Bearer ${token}`}}
    );
    setTitle('');
    setContent('');
    fetchSubmissions();
  }
  return (
    <Container className='mt-5'>
        <h2 className='mb-4'>Your Submissions</h2>
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                value={title}
                onChange={(e)=> setTitle(e.target.value)}
                placeholder='Enter title' />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                placeholder='Enter content' />
            </Form.Group>

            <Button variant='success' type='submit'>
                Submit
            </Button>

        </Form>
        {submissions.map((sub)=>(
            <Card className='mb-3' key={sub.id}>
                <Card.Body>
                    <Card.Title>{sub.title}</Card.Title>
                    <Card.Text>{sub.content}</Card.Text>
                </Card.Body>

            </Card>
        ))}
    </Container>
  )
}

export default SubmissionsPage;
