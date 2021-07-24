import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import { ProfileView } from '../profile-view/profile-view';

import { Link } from "react-router-dom";
import { Navbar, NavDropdown, Nav, Form, Button, Container, Col, Row } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      directors: [],
      genres: [],
      selectedMovie: null,
      selectedGenre: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getGenres(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://mycinemoviedatabase.herokuapp.com/movies', {
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
    axios.get('https://mycinemoviedatabase.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          genres: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onGenresClick() {

  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
  }

  onLogout() {
    this.setState(state => ({
      user: null
    }));
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, user, directors, genres, selectedGenre } = this.state;

    // console.log('movies-mainv:', movies._id);
    // console.log('user-mainv:', user);
    // console.log('genres-mainv:', genres);
    // console.log('directors-mainv:', directors);

    if (!movies) return <div className="main-view" />;

    return (
      <Router>
        <header>
          <Container>
            <Navbar bg="light" expand="lg" fixed="top" variant='light' style={{ padding: '1rem' }}>
              <Container>
                <Navbar.Brand className='home' as={Link} to={`/`} target='_self' >
                  <Button variant="outline-info" size="lg" block className='brand-button' style={{ fontSize: '1.8rem' }}>myCineMovieDatabase</Button>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                  <Nav className="me-auto">
                    <Navbar.Collapse className="justify-content-end">
                      <Button variant="outline-info" size="sm" block className='profile-button' as={Link} to={`/users/${user}`}>{user}`s Profile</Button>
                      <Navbar.Text>
                        <Button variant="outline-info" size="sm" block className='logout-button' onClick={() => this.onLogout()}>Logout</Button>
                      </Navbar.Text>
                    </Navbar.Collapse>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Container>
        </header>
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col md={6} >
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route exact path="/users/:username" render={() => {
            if (!user) return <Col md={6} >
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6} >
              <ProfileView />
            </Col>
          }} />


          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col md={6} >
              <RegistrationView />
            </Col>
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col md={6} >
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} genre={genres.find(genres => genres._id === match.params.genreId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:genreId" render={({ match, history }) => {
            if (!user) return <Col md={6} >
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (selectedGenre) return <GenreView genreData={selectedGenre} />

            if (movies.length === 0) return <div className="main-view" />;

            return genres.map(genre => (
              <Col md={8} key={genre._id}>
                <GenreView genreData={genre} onBackClick={() => history.goBack()} />
              </Col>
            ))
          }} />

          <Route path="/directors/:directorId" render={({ match, history }) => {
            if (!user) return <Col md={6} >
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={directors} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        </Row>
      </Router >
    );
  }

}

