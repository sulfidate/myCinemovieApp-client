import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { GenreView } from '../genre-view/genre-view';


import { Card, Button, Container } from 'react-bootstrap';

import axios from 'axios';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  addFavorite = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios.patch(`https://mycinemoviedatabase.herokuapp.com/users/${user}/Favorites/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`${this.props.movie._id} added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getGenres(token) {
    axios.get('https://mycinemoviedatabase.herokuapp.com/genres/:Name', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          genre: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render() {
    const { movie, genre } = this.props;

    if (!movie) return null;

    console.log('movie:', movie._id);
    console.log('genre:', genre);

    return (
      <Container className="movie-view " fluid style={{ maxWidth: '98%', marginTop: '20px' }}>
        <Card className='movie-view-card'>
          <Card.Img className='movie-poster' variant="top" src={movie.ImagePath} style={{ width: '50%' }} />
          <Card.Title className='movie-title'>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text className='movie-body'>{movie.Description}</Card.Text>

            <Card.Text>
              <Button className='director-view-button' variant='outline-info' >
                <Link to={`/directors/`} style={{ textDecoration: 'none' }}>Director</Link>
              </Button>
            </Card.Text>
            <Card.Text>
              <Button className='genre-view-button' variant='outline-info' >
                <Link to={`/genres/${genre.Name}`} style={{ textDecoration: 'none' }}>Genre:{genre.Name}</Link>
              </Button>
            </Card.Text>
            <Card.Text>
              <Button className='addFavButton' variant='outline-info' onClick={this.addFavorite}>
                <Link to={``}>Add Movie to Favorites</Link>
              </Button>
            </Card.Text>
            <Link to={`/`}>
              <Button className='back-button' variant='info' >Return to Movie List</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container >
    );
  }
}

MovieView.propTypes = {

  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
  }),
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  ),
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string,
  }),
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string
      })
    ),
    Username: PropTypes.string.isRequired
  })
};
