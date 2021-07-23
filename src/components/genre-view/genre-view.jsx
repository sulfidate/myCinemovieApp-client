import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import axios from 'axios';

import { Container, Card, Button } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  constructor() {
    super();

  }

  render() {
    const { genreData } = this.props;

    console.log('genreData-genreview', genreData._id);

    return (
      <div className='genre-view'>
        <Container>
          <Card className='genre-card'>
            <Card.Body>
              <Card.Title className='genre-name'>Genre:{genreData.Name}</Card.Title>
              <Card.Text className='genre-description'>Description:{genreData.Description}</Card.Text>
            </Card.Body>
          </Card>
          <Card.Footer className='genre-footer'>
            <Link to={`/`}>
              <Button className='returnButton' variant='info'>Return to Movie List</Button>
            </Link>
          </Card.Footer>
        </Container>
      </div>
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  })
};
