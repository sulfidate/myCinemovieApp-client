import React from 'react';
import { PropTypes } from 'prop-types';

import { Card, Button, Image, Link, Nav } from 'react-bootstrap';


export class MovieView extends React.Component {



  render() {
    const { movieData, directorData, genreData, onBackClick } = this.props;

    console.log(
      'movieData-moviev:', movieData,
      'genreData-moviev:', genreData,
      'directorData-moviev:', directorData
    );

    return (

      <Card style={{ marginTop: '25px', padding: '5px' }} border="info" >
        <Image rounded
          variant="top"
          src={movieData.ImagePath}
          style={{ width: '100%', maxWidth: '360px' }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: '1.7rem' }} >{movieData.Title}</Card.Title>
          <Card.Text style={{ fontSize: '1.3rem' }} >{movieData.Description}</Card.Text>

          <Nav.Link href={`/directors/${movieData.Director[1]}`}>
            <Button variant="outline-info" size="lg" style={{ margin: '5px' }}>Director: {`${movieData.Director[1]}`} </Button>
          </Nav.Link>

          <Nav.Link href={`/genres/${movieData.Genre[1]}`}>
            <Button variant="outline-info" size="lg" style={{ margin: '5px' }}>Genre: {`${movieData.Genre[1]}`} </Button>
          </Nav.Link>

          <Button variant="info" size="lg" style={{ marginLeft: '50px', color: 'white' }} onClick={() => onBackClick(null, "")}>back</Button>
        </Card.Body>
      </Card >
    );
  }
}

MovieView.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Featured: PropTypes.boolean,
    // Genre: PropTypes.arrayOf(PropTypes.arrayOf(
    //   PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     Name: PropTypes.string.isRequired,
    //     Description: PropTypes.string.isRequired
    //   }))),
    // Director: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     _id: PropTypes.string.isRequired,
    //     Name: PropTypes.string.isRequired,
    //     Bio: PropTypes.string.isRequired
    //   })),
    Actors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  // directorData: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     _id: PropTypes.string.isRequired,
  //     Name: PropTypes.string.isRequired,
  //     Bio: PropTypes.string.isRequired
  //   })
  // )

};
