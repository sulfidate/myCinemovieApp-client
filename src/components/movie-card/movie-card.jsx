import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Button, Image } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {
    const { movieData } = this.props;

    console.log(
      'movies-moviecard:', movieData,
      // 'genres-moviecard:', genres,
      // 'directors-moviecard:', directors
    );



    return (
      <Card style={{ marginTop: '25px', padding: '5px' }} border="info" >
        <Image rounded variant="top"
          src={movieData.ImagePath} />
        <Card.Body>
          <Card.Title style={{ minHeight: '4.5rem', fontSize: '1.3rem' }}>{movieData.Title}</Card.Title>
          <Link to={`/movies/${movieData._id}`}>
            <Button variant="outline-info">open card</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.boolean,
    Genre: PropTypes.arrayOf(PropTypes.string).isRequired,
    Director: PropTypes.arrayOf(PropTypes.string).isRequired,
    Actors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};