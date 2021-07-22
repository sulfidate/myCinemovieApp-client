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
    const { genre } = this.props;
    console.log(genre);
    return (
      <div className='genre-view'>
        <Container>
          <Card className='genre-card'>
            <Card.Body>
              <Card.Title className='genre-name'>Genre: {genre.Name}</Card.Title>
              <Card.Text className='genre-description'>Description: {genre.Description}</Card.Text>
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
  genre: PropTypes.arrayOf(
    PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
    // genre: PropTypes.shape({
    //   Description: PropTypes.string.isRequired,
    //   Name: PropTypes.string.isRequired,
    //   _id: PropTypes.string.isRequired
    // })
    // genre: PropTypes.shape({
    //     Name: PropTypes.string.isRequired,
    //     Description: PropTypes.string.isRequired,
    //   }),
  )
}
