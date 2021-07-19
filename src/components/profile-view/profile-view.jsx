import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'

import { Button, Container, Card } from 'react-bootstrap'

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

  onSignout() {
    this.setState(state => ({
      user: null
    }));

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios
      .get(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
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
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const { movies } = this.props;

    return (
      <React.Fragment>
        <Container>
          <Card border="info" style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title style={{ color: '#17a2b8' }}>Profile</Card.Title>
              <Card.Text>
                display actually user information
              </Card.Text>
              <Card.Link>
                <Button size='sm' className='profile-button' variant='info' /*onClick={() => { axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${username}`); }}*/>De-register user</Button>
              </Card.Link>
            </Card.Body>
          </Card>
          <Card border="info" style={{ width: '18rem', margin: '1rem' }}>
            <Card.Body>
              <Card.Title style={{ color: '#17a2b8' }}>Favorite Movies</Card.Title>
              <div className='card-content'>There are no favorite movies yet!</div>
              <div className='favorites-container'>
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                      return (
                        <div key={movie._id}>
                          <Card className='favorites-item card-content' style={{ width: '16rem', flex: 1 }}>
                            <Link to={`/movies/${movie._id}`}>
                              <Card.Img className='movie-card' variant="top" src={movie.ImagePath} />
                            </Link>
                            <Card.Title className='movie-card-title'>{movie.Title}</Card.Title>
                            <Card.Body className='movie-card-body'>
                              <Button size='sm' className='profile-button' variant='outline-info' onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
                                Remove movie
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    }
                  })}
              </div>
            </Card.Body>
          </Card>
        </Container >
      </React.Fragment >

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
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date),
  })
};