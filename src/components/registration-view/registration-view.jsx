import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Col, Nav, Navbar } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    /* Send a request to the server for authentication */
    axios.post('https://mycinemoviedatabase.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self'); // second argument _self is necessary to open page in current tab
      })
      .catch(e => {
        console.log('error registering user')
      });
  };

  return (
    <>
      <header>
        <Container>
          <Navbar bg="light" collapseOnSelect expand="lg" sticky="top" style={{ marginTop: '25px' }} >
            <Container>
              <Navbar.Brand href="#home"><h1 style={{ color: '#0dcaf0' }}>Registration</h1></Navbar.Brand>
            </Container>
            <Container fluid>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="me-auto" className="justify-content-end">
                  <Nav.Link href="/">
                    <Button variant="info" style={{ color: 'white' }} size="sm" >
                      you want to login ..?
                    </Button>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Container>
      </header>

      <Form style={{ marginTop: '25px', padding: '5px' }}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <Button variant="outline-info" type="button" style={{ margin: '20px 0 0 0' }} onClick={handleRegister}>register</Button>
      </Form>
    </>
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func
};