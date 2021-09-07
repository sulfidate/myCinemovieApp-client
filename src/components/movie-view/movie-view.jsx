import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

import './movie-view.scss';

import { Card, Button, Image, Link, Nav, Container } from 'react-bootstrap';


export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '', isToggleOn: 'hide-fav-btn' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
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
              <Button variant="outline-info" size="lg" style={{ margin: '.1rem' }}>Director: {`${movieData.Director[1]}`} </Button>
            </Nav.Link>
            <Nav.Link href={`/genres/${movieData.Genre[1]}`}>
              <Button variant="outline-info" size="lg" style={{ margin: '.1rem' }}>Genre: {`${movieData.Genre[1]}`} </Button>
            </Nav.Link>
            <Container>
              <Button
                className="btn"
                id={this.state.isToggleOn ? "add-fav-btn" : "hide-fav-btn"}
                variant="outline-info"
                size="lg"
                style={{ margin: '2rem 0 0 1rem' }}
                onClick={() => { this.handleAdd(movieData); this.handleClick() }}>
                add movie to my favorites
              </Button>

            </Container>
          </Container>
          <Container>
            <Button
              variant="info"
              size="lg"
              style={{ margin: '3rem 0 0 1rem', color: 'white' }}
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

