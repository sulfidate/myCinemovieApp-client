import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { Button, Container, Card, Form } from 'react-bootstrap'

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    (this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(username);
  }

  onSignout() {
    this.setState(state => ({
      user: null
    }));

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const { movies } = this.props;

    return (

      <Container>
        <h1 className='profile-header' style={{ color: '#17a2b8' }}>
          <span style={{ fontSize: '1.8rem' }}>{username}'s</span> Profile
        </h1>

        <Card border="info" style={{ width: '18rem', margin: '1rem', padding: '1.8rem' }}>
          <Card.Title style={{ color: '#17a2b8' }}>Current user information</Card.Title>
          <Card.Body>
          </Card.Body>
        </Card >
        <Button size='sm' className='profile-button' variant='info'>de-register user</Button>
      </Container >
    );
  }
}
ProfileView.propTypes = {
  users: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired
      })
    ),
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birthday: PropTypes.instanceOf(Date),
  }),
}

