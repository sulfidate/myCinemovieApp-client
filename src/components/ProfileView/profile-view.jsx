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
  FormGroup,
} from 'react-bootstrap'
import './profile-view.scss'
import { Redirect, Link } from 'react-router-dom'
import MovieCard from '../MovieCard/movie-card'
import CurrentUserData from './current-userdata'

export default class ProfileView extends React.Component {
  constructor() {
    super()

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    }
  }

  onRemoveFavorite = (m) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    axios
      .delete(
        `https://mycinemoviedatabase.herokuapp.com/users/${user}/FavoritesDelete/${m._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        localStorage.setItem(
          'favMovies',
          JSON.stringify(response.data.FavoriteMovies)
        )
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  editUser = (e) => {
    e.preventDefault()
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    axios
      .put(
        `https://mycinemoviedatabase.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        })

        localStorage.setItem('user', this.state.Username)
        const data = response.data
        alert('Profile is updated!')
        window.open(`/users/${Username}`, '_self')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  onDeleteUser() {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account?'
    )
    if (confirmed) {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')
      axios
        .delete(`https://mycinemoviedatabase.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert(user + 'has been deleted')
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          window.location.pathname = '/'
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  setUsername(value) {
    this.setState({
      Username: value,
    })
    this.Username = value
  }

  setPassword(value) {
    this.setState({
      Password: value,
    })
    this.Password = value
  }

  setEmail(value) {
    this.setState({
      Email: value,
    })
    this.Email = value
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    })
    this.Birthday = value
  }

  render() {
    const { movies, user } = this.props
    const { FavoriteMovies, Username, Email, Birthday } = this.props

    return (
      <Container>
        <Row className='profile-view mt-7 mb-7' style={{ minWidth: '400px' }}>
          <Col>
            <CardGroup>
              <Card
                bg='light'
                key=''
                text='info'
                className='user-profile mb-2'
                border='info'
              >
                <Card.Header as='h3'>User Profile</Card.Header>

                {/* current-userdata */}
                <CurrentUserData
                  name={Username}
                  email={Email}
                  birthday={Birthday}
                />

                {/* favorites-movies */}
                <Card.Body className='favorites-movies-data'>
                  <Card.Title as='h5' style={{ margin: '0.5% 0 1% 0' }}>
                    Your Favorite Movies
                  </Card.Title>

                  <Card
                    style={{
                      border: '0.1rem solid #17a2b8',
                    }}
                  >
                    <Card.Body>
                      {FavoriteMovies.length === 0 && (
                        <div className='text-center'>No Favorite Movie</div>
                      )}
                      <Row className='favorite-container'>
                        {FavoriteMovies.length > 0 &&
                          movies.map((movie) => {
                            if (
                              movie._id ===
                              FavoriteMovies.find((fav) => fav === movie._id)
                            ) {
                              return (
                                <Col
                                  sm={6}
                                  md={6}
                                  lg={4}
                                  xl={4}
                                  xxl={2}
                                  key={movie._id}
                                >
                                  <Card>
                                    <MovieCard movie={movie} />
                                    <Button
                                      size='sm'
                                      variant='outline-warning'
                                      value={movie._id}
                                      onClick={() =>
                                        this.onRemoveFavorite(movie)
                                      }
                                    >
                                      {' '}
                                      Remove{' '}
                                    </Button>
                                  </Card>
                                </Col>
                              )
                            }
                          })}
                      </Row>
                    </Card.Body>
                  </Card>
                </Card.Body>

                {/* user-update */}
                <Card.Body className='user-update'>
                  <Form.Label as='h5' style={{ margin: '0.5% 0 1% 0' }}>
                    Update your profile
                  </Form.Label>

                  <Form
                    className='update-form'
                    style={{
                      border: '0.1rem solid #17a2b8',
                      padding: '1.5rem',
                    }}
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group className='form-group-username'>
                      <Form.Label className='form-label colorInfo'>
                        Username:
                        <span className='ml-2'>{Username}</span>
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: 'small' }}
                        type='text'
                        placeholder='Username cannot be updated. (To get a new username delete profile and register with new username!)'
                        disabled
                        value={this.username}
                      />
                      <Form.Text className='text-muted'>
                        <p></p>
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className='form-group-password'>
                      <Form.Label className='form-label colorInfo'>
                        Update password:
                      </Form.Label>
                      <Form.Control
                        type='password'
                        name='Password'
                        placeholder='Choose new password - at least 6 Chars'
                        onChange={(e) => this.setPassword(e.target.value)}
                      />
                      <Form.Text className='text-muted'>
                        <p></p>
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className='form-group-email'>
                      <Form.Label className='form-label colorInfo'>
                        Update email:
                      </Form.Label>
                      <Form.Control
                        type='email'
                        name='Email'
                        placeholder='Enter new email - valid format: xxx@xxx.xxx'
                        onChange={(e) => this.setEmail(e.target.value)}
                      />
                      <Form.Text className='text-muted'>
                        <p></p>
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className='form-group-birthday'>
                      <Form.Label className='form-label colorInfo'>
                        Update birthday
                      </Form.Label>
                      <Form.Control
                        type='date'
                        name='Birthday'
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>

                    <Container className='form-btn'>
                      <Button
                        className='form-btn-sbm'
                        variant='info'
                        type='submit'
                        onClick={this.editUser}
                      >
                        Update User
                      </Button>

                      <Button
                        className='form-btn-del'
                        variant='outline-danger'
                        style={{
                          border: '1px solid #17a2b8',
                          color: '#17a2b8',
                        }}
                        onClick={() => this.onDeleteUser()}
                      >
                        {' '}
                        <span>Delete User</span>{' '}
                      </Button>
                    </Container>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
}
