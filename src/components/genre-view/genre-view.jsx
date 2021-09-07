import React from 'react';
import { PropTypes } from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

import { Col, Row, Card, Button, Image, Link, Nav, Container } from 'react-bootstrap';



export class GenreView extends React.Component {

  render() {
    const { genreData, onBackClick, movies } = this.props;
    const genreMovies = movies.filter(m => m.Genre[1] === genreData[1]);

    return (

      <Card style={{ marginTop: '25px', padding: '5px' }} border="info" >
        <Card.Body>
          <Card.Title style={{ fontSize: '2rem' }} >{genreData[1]}</Card.Title>
          <Card.Text style={{ fontSize: '1.3rem' }} >{genreData[2]}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Text style={{ fontSize: '1.3rem' }} >More {genreData[1]} movies: </Card.Text>
          <Container fluid>
            {genreMovies.map((m, i) => (
              <Card.Link
                href={`/movies/${m._id}`}
                key={i}>
                <Image rounded thumbnail
                  variant="bottom"
                  src={m.ImagePath}
                  style={{ width: '100%', maxWidth: '10rem', float: 'left', marginRight: '.9rem' }}
                />

              </Card.Link>
            )
            )}
          </Container>
          <Button variant="info" size="lg" style={{ marginLeft: '50px', color: 'white' }} onClick={() => onBackClick(null, "")}>back</Button>
        </Card.Body>
      </Card >
    );
  }
}
