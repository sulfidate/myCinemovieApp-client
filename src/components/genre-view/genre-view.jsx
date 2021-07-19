import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import axios from 'axios';

import {
  Container,
  Card,
  Button,
  ListGroup
} from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className='genre-view'>
        <Container>
          <Card className='genre-card'>
            <Card.Body>
              <Card.Title className='genre-name'>{genre.Name}</Card.Title>
              <Card.Text className='genre-description'>{genre.Description}</Card.Text>
            </Card.Body>
          </Card>
          <Card.Footer className='genre-footer'>
            <Link to={`/`}>
              <Button className='returnButton' variant='dark'>Return to Movie List</Button>
            </Link>
          </Card.Footer>
        </Container>
      </div>
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
}