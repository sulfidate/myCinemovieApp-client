import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Navbar, NavDropdown, Nav, Form, Button, Container, Col, Row } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      selectedMovie: "",
      user: null
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onGenreClick(genre) {
    this.setState({
      selectedGenre: genre
    });
  }

  onDirectorClick(director) {
    this.setState({
      selectedDirector: director
    });
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
    const { movies, user, register } = this.state;


    if (!movies) return <div className="main-view" />;


    return (
      <Router>
        <header>
          <Container>
            <Navbar bg="light" expand="lg" fixed="top" variant='light'>
              <Navbar.Brand className='home' as={Link} to={`/`} target='_self' style={{ color: '#17a2b8' }}>myCineMovieDatabase</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <NavDropdown title={user + "`s account"} id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    {user &&
                      <Nav.Link className='profile' as={Link} to={`/users/${user}`} target='_self'>
                        <Button variant="info" size="sm" block className='add-favorites-button' >Edit Profile</Button>
                      </Nav.Link>
                    }
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#logout-user">
                    <Form inline>
                      {user &&
                        <Link to={`/`}>
                          <Button variant="info" size="sm" block className='logout-button' onClick={() => this.onLogout()}>Logout</Button>
                        </Link>
                      }
                    </Form>
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Navbar>
          </Container>
        </header>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col md={4} >
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route exact path="/login" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return <Col md={10} >
              <LoginView />
            </Col>
          }} />


          <Route path="/register" render={() => {
            if (!register) return <Col md={10} >
              <RegisterView onRegister={(register) => this.onRegister(register)} />
            </Col>
          }} />

          {/* you keep the rest routes here */}

          <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />

          <Route path="/director/:name" render={({ match }) => {
            if (!movies.length) return <div className='main-view' />;
            return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
          }
          } />

          <Route path="/genres/:name" render={({ match }) => {
            if (!movies.length) return <div className='main-view' />;
            return <GenreView genre={genres.find((m) => m.genre.Name === match.params.name)} movies={movies} />
          }
          } />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />
        </Row>
      </Router>
    );
  }

}

