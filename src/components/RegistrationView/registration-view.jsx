import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  Navbar,
} from 'react-bootstrap'
import './registration-view.scss'
import { Redirect, Link } from 'react-router-dom'

export default function RegistrationView(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [birthday, setBirthday] = useState('')

  const [btnDisabled, setBtnDisabled] = useState(true)
  const [usernameErr, setUsernameErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [emailErr, setEmailErr] = useState('')

  /**
   *  function to validate username change
   * @memberof RegistrationView
   * @param {string} username
   * @param {*} e
   *  @returns {boolean}
   *
   */
  const validateUsername = (e) => {
    if (!username) {
      setBtnDisabled(true)
      setUsernameErr('Username Required')
    } else if (username.length === 0 || username.length < 7) {
      setUsernameErr('Username must be at least 8 characters long')
      setBtnDisabled(true)
    } else {
      setUsernameErr(null)
    }
    setUsername(e.target.value)
  }

  /**
   * function to validate password change
   * @memberof RegistrationView
   * @param {string} password
   * @param {*} e
   * @returns {boolean}
   */
  const validatePassword = (e) => {
    if (!password) {
      setBtnDisabled(true)
      setPasswordErr('Password Required')
    } else if (password.length < 5) {
      setPasswordErr('Password must be at least 6 characters long')
      setBtnDisabled(true)
    } else {
      setPasswordErr(null)
    }
    setPassword(e.target.value)
  }

  /**
   * function to validate email change
   * @memberof RegistrationView
   * @param {string} email
   * @param {*} e
   * @returns {boolean}
   */
  const validateEmail = (e) => {
    if (!email) {
      setBtnDisabled(true)
      setEmailErr('Email Required')
    } else if (email.length <= 5 || email.indexOf('@') === -1) {
      setEmailErr(
        `Email seems not to be in valid format - missing @ or . character (xxx@xxx.xxx)`
      )
      setBtnDisabled(true)
    } else {
      setEmailErr(null)
      setBtnDisabled(false)
    }
    setEmail(e.target.value)
  }

  /**
   * function to validate
   * @memberof RegistrationView
   *
   * @param {*} e
   * @returns {boolean}
   */
  const validate = () => {
    let isReq = true
    if (!username) {
      setUsernameErr('Username Required')
      isReq = false
    } else if (username.length < 8) {
      setUsernameErr('Username must be at least 8 characters long')
      isReq = false
    }
    if (!password) {
      setPasswordErr('Password Required')
      isReq = false
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long')
      isReq = false
    }
    if (!email) {
      setEmailErr('Email Required')
      isReq = false
    } else if (email.indexOf('@') === -1 && email.indexOf('.') === -1) {
      setEmailErr(
        'Email seems not to be in valid format - missing @ or . character (xxx@xxx.xxx)'
      )
      isReq = false
    }
    return isReq
  }

  /**
   * function to handle submit
   * @memberof RegistrationView
   * @param {*} e
   * @returns {boolean}
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const isReq = validate()
    if (isReq) {
      axios
        .post('https://mycinemoviedatabase.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data
          alert('Registration successful, please login!')
          window.open('/', '_self')
        })
        .catch((response) => {
          console.error(response)
          alert('unable to register - fill information in right format!')
        })
    }
  }

  return (
    <Container>
      <Container>
        <Navbar className='header-view' variant='dark' bg='info' fixed='top'>
          <Container>
            <Navbar.Brand>myCineMovieApp</Navbar.Brand>
          </Container>

          <Navbar.Text>
            <Link to={'/'}>
              <Button variant='light link' style={{ color: '#17A2B8' }}>
                Login
              </Button>
            </Link>
          </Navbar.Text>
        </Navbar>
      </Container>

      <Row
        className='registration-view justify-content-center'
        style={{ margin: '7rem 1rem 7rem 1rem' }}
      >
        <Col></Col>
        <Col xs={11} sm={11} md={8} lg={6} xl={6} xxl={6}>
          <CardGroup>
            <Card bg='light' key='' text='info' className='mb-2' border='info'>
              <Card.Header as='h3'>Registration Form</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className='mb-3' controlId='formRegisterUsername'>
                    <Form.Label className='form-label colorInfo'>
                      Username
                    </Form.Label>
                    <Form.Control
                      style={{ fontSize: 'small' }}
                      type='text'
                      placeholder='Please register with username - at least 8 Chars'
                      value={username}
                      onBlur={validateUsername}
                      onChange={validateUsername}
                      required
                      minLength={8}
                    />
                    <Form.Text className='text-muted'>
                      {usernameErr && (
                        <p style={{ color: 'red' }}>{usernameErr}</p>
                      )}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formRegisterPassword'>
                    <Form.Label className='form-label colorInfo'>
                      Password
                    </Form.Label>
                    <Form.Control
                      style={{ fontSize: 'small' }}
                      type='password'
                      placeholder='Choose password - at least 6 Chars'
                      value={password}
                      onBlur={validatePassword}
                      onChange={validatePassword}
                      required
                      minLength={6}
                    />
                    <Form.Text className='text-muted'>
                      {passwordErr && (
                        <p style={{ color: 'red' }}>{passwordErr}</p>
                      )}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formRegisterEmail'>
                    <Form.Label className='form-label colorInfo'>
                      Email address
                    </Form.Label>
                    <Form.Control
                      style={{ fontSize: 'small' }}
                      type='email'
                      placeholder='Enter your email - valid format: xxx@xxx.xxx'
                      value={email}
                      onBlur={validateEmail}
                      onChange={validateEmail}
                      required
                    />
                    <Form.Text className='text-muted'>
                      {emailErr && <p style={{ color: 'red' }}>{emailErr}</p>}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className='mb-3' controlId='formRegisterBirthday'>
                    <Form.Label className='form-label colorInfo'>
                      Birthday
                    </Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Enter birthday'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Button
                  variant='info'
                  type='submit'
                  disabled={btnDisabled}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

/**
 * PropTypes
 * @memberof RegistrationView
 * @type {object}
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {string} birthday
 *
 * @property {function} setUsername
 *
 */
// PropTypes
RegistrationView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date),
  }),
  onRegister: PropTypes.func,
}
