import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Col lg={3}>
        <Card className="card" border="info">
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title style={{ height: '3.9rem' }}>{movie.Title}</Card.Title>
            <Button onClick={() => onMovieClick(movie)} variant="info" size="sm" block>Open</Button>
          </Card.Body>
        </Card >
      </Col>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};