import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    // console.log('movie-moviecard:', movie._id);
    // console.log('user-mainv:', user);
    // console.log('genres-mainv:', genres);
    // console.log('directors-mainv:', directors);

    return (
      <Card className="card" border="info" style={{ marginBottom: '2.7rem' }}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="movie-title" style={{ height: '3.9em' }}>{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="info" size="sm" block>Open card</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
  }),
};