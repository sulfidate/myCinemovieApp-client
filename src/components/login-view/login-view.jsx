import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Row, Col, Form, Button, Form, Jumbotron, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './login-view.scss';



export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function errorMsg() {
    const error = document.getElementById('error');
    error.innerText = "Username or Password is wrong";
  }

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
    <Row className="login-view justify-content-md-center">
      <Col md={6}>
        <Jumbotron fluid>
          <Container>
            <h1 className="title">Login View</h1>
            <p>
              To login please fill in you're username and password...
            </p>
          </Container>
        </Jumbotron>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="info" size="sm" block type="submit" onClick={handleSubmit} >
            Submit
          </Button>
          <Link to={`/register`}>
            <Button className="m-3" variant="info" type="link">Register</Button>
          </Link>
        </Form>
      </Col>
    </Row >
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};