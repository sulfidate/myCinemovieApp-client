import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Navbar, Nav } from 'react-bootstrap';
import './login-view.scss'
import { NavBtnLogIn } from '../header-view/nav-btn-login';
import { useState } from 'react';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);

    const isValid = formValidation();
    if (isValid) {

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
          console.log('no such user', e);
          alert(username + " is not registered");
        }).then(() => window.location.reload());
    }
  };

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    let isValid = true;

    if (username.length < 4 || username === '') {
      usernameError.UsernameToShort = "Username must be more than 4 characters.";
      isValid = false;
    }
    if (password.length < 6 || password === '') {
      passwordError.noPassword = "You must enter a password at least 6 characters long.";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
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

                  <NavBtnLogIn />

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

      <Form style={{ marginTop: '25px', padding: '5px' }} className="register-form" noValidate >
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" required value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>
        {Object.keys(usernameError).map((key) => {
          return (
            <div className="form-validation-error" style={{ color: 'red' }} key={key}>
              {usernameError[key]}
            </div>
          );
        })}


        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        {Object.keys(passwordError).map((key) => {
          return (
            <div className="form-validation-error" style={{ color: 'red' }} key={key}>
              {passwordError[key]}
            </div>
          );
        })}


        <Button variant="outline-info" type="submit" style={{ margin: '20px 0 0 0' }} onClick={handleSubmit}>login</Button>
      </Form >
    </>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  })
}