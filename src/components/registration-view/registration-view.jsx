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

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});


  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);

    const isValid = formValidation();
    if (isValid) {

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
    }
  }

  const formValidation = () => {
    const usernameError = {};
    const passwordError = {};
    const emailError = {};
    let isValid = true;

    if (username.length < 4 || username === '') {
      usernameError.UsernameToShort = "Username must be more than 4 characters.";
      isValid = false;
    }
    if (password.length < 6 || password === '') {
      passwordError.noPassword = "You must enter a password at least 6 characters long.";
      isValid = false;
    }
    if (!email || email.indexOf('@') === -1) {
      emailError.notValidEmail = "Your email doesn't look quite right.";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
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

      <Form style={{ marginTop: '25px', padding: '5px' }} className="register-form" noValidate >
        <Form.Group>
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

        <Form.Group>
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

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>
        {Object.keys(emailError).map((key) => {
          return (
            <div className="form-validation-error" style={{ color: 'red' }} key={key}>
              {emailError[key]}
            </div>
          );
        })}

        <Form.Group>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="date" name="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <Button variant="outline-info" type="button" style={{ margin: '20px 0 0 0' }} onClick={handleRegister}>register</Button>
      </Form>
    </>
  );
}


RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.date
  }),
  onRegister: PropTypes.func
}