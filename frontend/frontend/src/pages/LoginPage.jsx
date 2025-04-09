import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from '../context/AuthContext';
import {Form, Button, Alert, Container} from 'react-bootstrap';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [error, setError] = useState('');
  const {login} = useAuth();
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post('http://localhost:8080/api/auth/login',{
            username,
            password
        });
        login(res.data.token);
        navigate('/submissions');
    } catch(err){
        setError('Invalid credentials');
    }
  }

  return (
    <>
    <Container className='mt-5' style={{maxWidth:'400px'}}>
        <h2 className='mb-4'>Login</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
                <Form.Label>username</Form.Label>
                <Form.Control
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder='Enter username'
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>password</Form.Label>
                <Form.Control
                   type='password'
                   value={password}
                   onChange={(e)=> setPassword(e.target.value)}
                   placeholder='Enter password' 
                />
            </Form.Group>
            <Button variant='primary' type='submit'>
                Login
            </Button>
            {error && <Alert variant='danger' className='mt-3'>{error}
            </Alert>}
        </Form>    
    </Container> 
    </>
  );
};

export default LoginPage
