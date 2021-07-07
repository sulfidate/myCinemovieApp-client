import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication, then call props.onLoggedIn(username)
    props.loggingIn(username);
  };

  const handleRegistration = () => {
    let reg = false
    props.regData(reg);
  }

  return (
    <Row className="login-view justify-content-md-center">
      <Col md={5}>
        <Jumbotron fluid>
          <Container>
            <h1>my Cinemovie database</h1>
            <p>
              This pretty little database gives you, as a registered user, the possibility to get information about films, such as their directors or their genres.
            </p>
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
        </Form>
      </Col>
    </Row >
  );
}

LoginView.propTypes = {
  regData: PropTypes.func.isRequired,
  loggingIn: PropTypes.func.isRequired
};