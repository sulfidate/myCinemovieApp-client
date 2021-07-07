import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view justify-content-md-center">
        <Col md={8}>
          <Image className="movie-poster" src={movie.ImagePath} thumbnail fluid style={{ width: '500px' }} />
          <div className="movie-title">
            <h1 className="label">Title: <span className="value">{movie.Title}</span></h1>
          </div>
          <div className="movie-description">
            <h2 className="label">Description: </h2>
            <p className="value">{movie.Description}</p>
            <Button variant="info" size="sm" block onClick={() => { onBackClick(null); }}>Back</Button>{' '}
          </div>
        </Col>
      </Row>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};