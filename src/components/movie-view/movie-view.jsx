import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { Card, Button, Image, Link, Nav, Container } from 'react-bootstrap';


export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = { value: '' };
  }

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.patch(`https://mycinemoviedatabase.herokuapp.com/users/${user}/Favorites/` +
      this.props.movieData._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(token);
        console.log(response);
        alert(this.props.movieData.Title + " has been added to your favorites!");
      })
  }

  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${user}/FavoritesDelete/` +
      this.props.movieData._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movieData.Title + " has been deleted to your favorites!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movieData, directorData, genreData, onBackClick, addFavMov, FavoriteMovies } = this.props;

    return (

      <Card style={{ marginTop: '25px', padding: '5px' }} border="info" >
        <Image
          rounded
          variant="top"
          src={movieData.ImagePath}
          style={{ width: '100%', maxWidth: '360px' }}
        />
        <Card.Body>
          <Card.Title style={{ fontSize: '1.7rem' }} >{movieData.Title}</Card.Title>
          <Card.Text style={{ fontSize: '1.3rem' }} >{movieData.Description}</Card.Text>
          <Container>
            <Nav.Link href={`/directors/${movieData.Director[1]}`}>
              <Button variant="outline-info" size="lg" style={{ margin: '.1rem', width: '30rem' }}>Director: {`${movieData.Director[1]}`} </Button>
            </Nav.Link>
            <Nav.Link href={`/genres/${movieData.Genre[1]}`}>
              <Button variant="outline-info" size="lg" style={{ margin: '.1rem', width: '30rem' }}>Genre: {`${movieData.Genre[1]}`} </Button>
            </Nav.Link>
            <div>
              <Button
                id="add-favorite-btn"
                variant="outline-info"
                size="lg"
                style={{ margin: '2rem 0 0 1rem', width: '14.5rem' }}
                onClick={() => this.handleAdd(movieData)}              >
                add movie to my favorites
              </Button>
            </div>

          </Container>
          <Container>
            <Button
              variant="info"
              size="lg"
              style={{ margin: '3rem 0 0 1rem', color: 'white', width: '10rem' }}
              onClick={() => onBackClick(null, "")}
            >
              back
            </Button>
          </Container>

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
