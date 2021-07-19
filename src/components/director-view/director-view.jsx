import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';
import axios from 'axios';

import {
  Card,
  Button,
  Container,
  ListGroup,
} from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    console.log('movie:', movie, 'director:', director);
    return (
      <div className='director-view'>
        <Container>
          <Card className='director-card'>
            <Card.Body>
              <Card.Title className='director-name'>{director.Name}</Card.Title>
            </Card.Body>
          </Card>
        </Container>
      </div>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
  }),
}
