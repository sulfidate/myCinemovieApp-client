import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

import { Row, Col, Container, Navbar, NavDropdown, Button } from 'react-bootstrap';


import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      token: null,
      isLoaded: false,
      isLoaded2: false,
      selectedMovie: null,
      user: null,
      userData: null,
      genres: [],
      selectedGenre: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let userToken = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        token: localStorage.getItem('token')
      });
      this.getUser(accessToken, userToken);
      this.getMovies(accessToken);
    }
  }

  newUser(newData) {
    localStorage.setItem('user', newData.Username);
    this.setState({
      userData: newData,
      user: newData.Username
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  setSelectedGenre(selectedGenre) {
    this.setState({
      selectedGenre: selectedGenre
    });
  }

  getUser(token, user) {
    axios.get(`https://mycinemoviedatabase.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('Success with getUser');
        this.setState({
          userData: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  getMovies(token) {
    axios.get(`https://mycinemoviedatabase.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGenres(token) {
    axios.get(`https://mycinemoviedatabase.herokuapp.com/genres`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          genre: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
        console.log('testing');
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      token: authData.token
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getUser(authData.token, authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
  }

  onLoggedOut(signState) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: signState,
      token: null,
      userData: null
    });
  }

  render() {
    const { movies, user, genres } = this.state;
    return (
      <Router>
        <header>
          <Container>
            <Navbar expand="lg" variant="light" bg="light">
              <Navbar.Brand href="#home">my Cinemovie database</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <NavDropdown title={user + "`s account"} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#add-favorites">add favorites</NavDropdown.Item>
                  <NavDropdown.Item href="#edit-account">edit account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout-user">
                    <Button variant="info" size="sm" block onClick={() => { this.onLoggedOut() }}>Logout user</Button>
                  </NavDropdown.Item>
                </NavDropdown>

              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={genres.find(m => m._id === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}