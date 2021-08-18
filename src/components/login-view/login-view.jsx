import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Container, Navbar, Nav } from 'react-bootstrap';
import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
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
        console.log('no such user', e)
      });
  };

  return (
    <>
      <header>
        <Container>
          <Navbar bg="light" collapseOnSelect expand="lg" fixed="top" style={{ marginTop: '35px' }} >
            <Container>
              <Navbar.Brand href="https://github.com/sulfidate" target='_blank' >
                <img
                  src="https://avatars.githubusercontent.com/u/78739948?v=4"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="logo sulfidate"
                />
              </Navbar.Brand>
              <Navbar.Brand href="/"><h1 style={{ color: '#0dcaf0' }}>myCineMovieDatabase</h1></Navbar.Brand>
            </Container>
            <Container fluid id='signed-nav-btn'>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <Nav className="me-auto" className="justify-content-end">

                  {/* <NavBtn user={user} /> */}

                </Nav>
              </Navbar.Collapse>
            </Container>


          </Navbar>
        </Container>
      </header>

      <Container>
        <Navbar bg="light" collapseOnSelect expand="lg" sticky="top" style={{ marginTop: '25px' }} >
          <Container>
            <Navbar.Brand href="#home"><h1 style={{ color: '#0dcaf0' }}>Login</h1></Navbar.Brand>
          </Container>
          <Container fluid>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav className="me-auto" className="justify-content-end">
                <Nav.Link href="/register">
                  <Button variant="info" style={{ color: 'white' }} size="sm" >
                    Not registered yet...
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>


      <Form style={{ marginTop: '25px', padding: '5px' }}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Button variant="outline-info" type="submit" style={{ margin: '20px 0 0 0' }} onClick={handleSubmit}>login</Button>
      </Form >
    </>
  );
}