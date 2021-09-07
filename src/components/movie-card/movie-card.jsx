import React from 'react';
import { PropTypes } from 'prop-types';
import { Card, Button, Image } from 'react-bootstrap';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {

  render() {
    const { movieData } = this.props;

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
