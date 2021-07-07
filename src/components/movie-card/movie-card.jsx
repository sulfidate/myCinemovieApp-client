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
      <Row className="movie-card justify-content-md-center">
        <Col md={12}>
          <Card className="card" border="info">
            <Image variant="top" thumbnail src={movie.ImagePath} />
            <Card.Body className="card-body">
              <Card.Subtitle className="card-subtitle" >{movie.Title}</Card.Subtitle>
              <Button className="card-button" onClick={() => onMovieClick(movie)} variant="info" size="sm" block>Open</Button>
            </Card.Body>
          </Card >
        </Col>
      </Row >
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