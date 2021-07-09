import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './movie-view.scss';


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Col lg={10}>
        <div className="movie-view justify-content-md-center">
          <Image className="movie-poster" src={movie.ImagePath} rounded fluid />
          <div className="movie-title">
            <div className="value">{movie.Title}</div>
          </div>
          <div className="movie-description">
            <div className="value">{movie.Description}</div>
          </div>
          <Button className="label" variant="info" size="lg" block style={{ margin: '15px 0 15px 0' }} onClick={() => { onBackClick(null); }}>Back</Button>{' '}
        </div>
      </Col>
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