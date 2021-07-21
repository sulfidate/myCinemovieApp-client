import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';
import { Row, Col, Navbar, Nav, NavDropdown, Form, FormControl, Container, Button, Image } from 'react-bootstrap';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  componentDidMount() {
    axios.get('https://mycinemoviedatabase.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  changeReg(regStatus) {
    this.setState({
      registered: regStatus
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!user && registered) return <LoginView regData={Status => this.changeReg(Status)} loggingIn={user => this.onLoggedIn(user)} />;

    if (!user && !registered) return <RegistrationView regData={Status => this.changeReg(Status)} />;

    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <div className="main-wrapper justify-content-md-center">
        <header>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand style={{ fontSize: '3em', marginRight: '1em' }} href="#home">my Cinemovie database</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as user: <a href="#profile">{user}</a>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <Row className="main-view">
          {selectedMovie
            ? (
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            )
            : movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            ))
          }
        </Row>
      </div>
    );

  }
}