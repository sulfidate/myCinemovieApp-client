import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import './login-view.scss';

// react-bootstrap
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

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
    <React.Fragment>
      <Container>
        <Form className='login-form'>
          <h1 className='login-header' style={{ color: '#17a2b8' }}>Login</h1>
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
              <Link to={`/register`}>
                <Button className='button register-button' type='button' variant='secondary' size="sm" block  >
                  not registered yet ...
                </Button>
              </Link>
            </Form.Group>
          </Container>
        </Form>
      </Container>
    </React.Fragment>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pasword: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};