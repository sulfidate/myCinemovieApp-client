import React, { Component } from 'react';
import { Card, Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class FavoriteItem extends Component {
  render() {
    return (
      <Container>
        <Card style={{ marginTop: '25px', padding: '5px' }} border="info" >
          <Image rounded variant="top"
            src={movies.ImagePath} />
          <Card.Body>
            <Card.Title style={{ minHeight: '4.5rem', fontSize: '1.3rem' }}>{movies.Title}</Card.Title>
            <Link to={`/movies/${movies._id}`}>
              <Button variant="outline-info">open card</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

export default FavoriteItem
