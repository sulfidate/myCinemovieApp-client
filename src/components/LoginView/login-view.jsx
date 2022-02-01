import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, Card, CardGroup, Navbar } from "react-bootstrap";
import { HeaderView } from "../HeaderView/header-view";
import { FooterView } from "../FooterView/footer-view";
import './login-view.scss';
import axios from "axios";
import { Redirect, Link, NavLink } from "react-router-dom";

export default function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Input Validation
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');

  const handleTextChange1 = (e) => {
    if (!username) {
      setBtnDisabled(true)
      setUsernameErr('Username Required');
    } else if (username.length < 7) {
      setUsernameErr('Username must be at least 8 characters long');
      setBtnDisabled(true);
    } else {
      setUsernameErr(null);
    }
    setUsername(e.target.value);

  }
  const handleTextChange2 = (e) => {
    if (!password) {
      setBtnDisabled(true);
      setPasswordErr('Password Required');
    } else if (password.length < 5) {
      setPasswordErr('Password must be at least 6 characters long');
      setBtnDisabled(true);
    } else {
      setUsernameErr(null);
      setPasswordErr(null);
      setBtnDisabled(false);
    }
    setPassword(e.target.value);

  }

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      // setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 8) {
      // setUsernameErr('Username must be at least 8 characters long');
      isReq = false;
    }
    if (!password) {
      // setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 6) {
      // setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://mycinemoviedatabase.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
          console.log("handlesubmit:", data);
        })
        .catch(e => {
          console.log('no such user');
          alert('User is not registered -> please register or try again with correct user information. Thanks for using our App!')
        });
    }
  };

  return (

    <Container>
      <Container>
        <Navbar
          className='header-view'
          variant='dark'
          bg='info'
          fixed='top'
        >
          <Container>
            <Navbar.Brand>myCineMovieApp</Navbar.Brand>
          </Container>

          <Navbar.Text>
            <Link to={"/register"}>
              <Button
                variant="light link"
                style={{ color: '#17A2B8' }}
              >
                Register
              </Button>
            </Link>
          </Navbar.Text>

        </Navbar>
      </Container>

      <Row
        className="login-view justify-content-center"
        style={{ margin: '7rem 1rem 7rem 1rem' }}
      >
        <Col></Col>
        <Col
          xs={11}
          sm={11}
          md={8}
          lg={6}
          xl={6}
          xxl={6}
        >

          <CardGroup>
            <Card
              bg='light'
              key=''
              text='info'
              className="mb-2"
              border='info'
            >

              <Card.Header
                as="h3"
              >
                Login
              </Card.Header>

              <Card.Body>
                <Form>

                  <Form.Group
                    className="mb-3"
                    controlId="formLoginUsername"
                  >
                    <Form.Label
                      className="form-label colorInfo"
                    >
                      Username
                    </Form.Label>
                    <Form.Control
                      style={{ fontSize: 'small' }}
                      type="text"
                      placeholder="Please login with username"
                      value={username}
                      onBlur={handleTextChange1}
                      onChange={handleTextChange1}
                      required
                      minLength={8} />
                    <Form.Text
                      className="text-muted"
                    >
                      {usernameErr &&
                        <p
                          style={{ color: 'red' }}
                        >
                          {usernameErr}
                        </p>
                      }
                    </Form.Text>
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="formLoginPassword"
                  >
                    <Form.Label
                      className="form-label colorInfo"
                    >
                      Password
                    </Form.Label>
                    <Form.Control
                      style={{ fontSize: 'small' }}
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onBlur={handleTextChange2}
                      onChange={handleTextChange2}
                      required
                      minLength={6}
                    />
                    <Form.Text>
                    </Form.Text>
                    <Form.Text
                      className="text-muted"
                    >
                      {passwordErr &&
                        <p
                          style={{ color: 'red' }}
                        >
                          {passwordErr}
                        </p>
                      }
                    </Form.Text>

                  </Form.Group>

                  <Button
                    variant="info"
                    type="submit"
                    onClick={handleSubmit}
                    disabled={btnDisabled}
                  >
                    Log in
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </CardGroup>

        </Col>
        <Col></Col>
      </Row>

      <FooterView />

    </Container >

  );
}

// PropTypes
LoginView.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  onLoggedIn: PropTypes.func.isRequired,
};