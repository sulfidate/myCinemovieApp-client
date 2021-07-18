import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


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

    axios.post(`https://mycinemoviedatabase.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        alert(`${this.props.movie.Name} added to Favorites List`)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, director, genre } = this.props;

    if (!movie) return null;

    return (
      <Container className="movie-view " fluid style={{ maxWidth: '98%', marginTop: '20px' }}>
        <Card className='movie-view-card'>
          <Card.Img className='movie-poster' variant="top" src={movie.ImagePath} style={{ width: '75%' }} />
          <Card.Title className='movie-title'>{movie.Title}</Card.Title>
          <Card.Body>
            <Card.Text className='movie-body'>{movie.Description}</Card.Text>

            <Card.Text className='movie-body'>
              <Button className='director-view-button' variant='secondary' >Director:</Button>
              {/* <Link to={`/directors/${director.Name}`} style={{ textDecoration: 'none' }}> {director.Name}</Link> */}
            </Card.Text>
            <Card.Text className='movie-body'>
              <Button className='genre-view-button' variant='secondary' >Genre:</Button>
              {/* <Link to={`/genres/${genre.Name}`} style={{ textDecoration: 'none' }}> {genre.Name}</Link> */}
            </Card.Text>

            <Link to={``}>
              <Button className='addFavButton' variant='info' style={{ margin: '10px 20px 10px 10px' }} onClick={this.addFavorite}> Add Movie to Favorites</Button>
            </Link>
            <Link to={`/`}>
              <Button className='back-button' variant='info' >Return to Movie List</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

MovieView.propTypes = {

  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
  }),
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string
      })
    ),
    username: PropTypes.string
  })
};
