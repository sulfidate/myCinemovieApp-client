import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://mycinemoviedatabase.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      });
  };

  return (
    <Form className='login-form justify-content-md-center'>
      <h1 className='login-header' style={{ color: '#17a2b8' }}>Login</h1>
      <p className="register-header" id="register-link">
        You want to register:&nbsp;
        <Link to={`/register`}>here</Link>
      </p>

      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='username'
        />
      </Form.Group>
      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='password'
        />
      </Form.Group>
      <Container className='justify-content-md-center'>
        <Form.Group>
          <Button onClick={handleSubmit} className='button submit-button' variant='info' type='submit' size="sm" block >
            Submit
          </Button>
        </Form.Group>
      </Container>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pasword: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func,
  onRegister: PropTypes.func
};