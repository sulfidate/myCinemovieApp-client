import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Container } from 'react-bootstrap';

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import './registration-view.scss';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://mycinemoviedatabase.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
        alert("You have sucessfully registered.");
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('The value you entered is not valid.')
        }
      });
    console.log(username, password, email, birthday);
  };

  return (
    <React.Fragment>
      <Form className='register-form'>
        <h1 className='register-header' style={{ color: '#17a2b8' }}>Welcome to my CineMovie Database!</h1>
        <p className="register-header" id="register-link">
          You want to log in:&nbsp;
          <Link to={`/login`}>here</Link>
        </p>
        <Form.Group controlId='formBasicText'>
          <Form.Label size='lg'>Username</Form.Label>
          <Form.Control
            type='text'
            size='lg'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Enter usename'
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label size='lg'>Email</Form.Label>
          <Form.Control
            type='email'
            size='lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter email'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Label size='lg'>Password</Form.Label>
          <Form.Control
            type='password'
            size='lg'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter new password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicConfirmPassword'>
          <Form.Label size='lg'>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            size='lg'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicDate'>
          <Form.Label size='lg'>Birthday</Form.Label>
          <Form.Control
            type='date'
            size='lg'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder='Enter your birthday'
          />
        </Form.Group>
        <Container className='justify-content-md-center'>
          <Form.Group>
            <Button onClick={handleRegister} className='button submit-button' variant='info' type='submit' size="sm" block >
              Submit
            </Button>
            <Link to={`/`}>
              <Button className='button register-button' type='button' variant='secondary' size="sm" block  >
                already registered ...
              </Button>
            </Link>
          </Form.Group>
        </Container>
      </Form>
    </React.Fragment>
  );
}
RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
};