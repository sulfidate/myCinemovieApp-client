import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="card" border="info">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title style={{ height: '3.9rem' }}>{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="info" size="sm" block>Open</Button>
          </Link>
        </Card.Body>
      </Card >
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
};