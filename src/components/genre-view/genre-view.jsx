import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';


export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <>
        <div className="genre-view justify-content-md-center">
          <div className="genre-name">
            <div className="value">{genre.Name}</div>
          </div>
          <div className="genre-description">
            <div className="value">{genre.Description}</div>
          </div>

          <Button className="label" variant="info" style={{ margin: '15px 10px 15px 0' }} onClick={() => { onBackClick(null); }}>Back</Button>{' '}
        </div>
      </>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};