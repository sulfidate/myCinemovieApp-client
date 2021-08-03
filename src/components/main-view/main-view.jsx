import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { HeaderView } from '../header-view/header-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      genres: [],
      directors: []
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
      this.getDirectors(accessToken);
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
        this.setState({
          genres: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDirectors(token) {
    axios.get('https://mycinemoviedatabase.herokuapp.com/directors', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          directors: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const {
      user,
      movies,
      genres,
      directors
    } = this.state;

    const {
      // user,
      // movies
      // genres,
      // directors
    } = this.props;

    console.log(
      'user-mv:', user,
      'movies-mv:', movies,
      'genres-mv:', genres,
      'directors-mv:', directors
    );

    return (

      <Router>
        <Row className="main-view justify-content-md-center" style={{ marginTop: '150px', padding: '15px' }}>

          <HeaderView user={user} />

          <Route exact path="/" render={() => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(movie => (
              <Col sm={7} md={6} lg={3} xl={2} key={movie._id}>
                <MovieCard movieData={movie} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to='/' />
            return <Col md={6}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/profile" render={() => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <ProfileView userprofile={user} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <ProfileView history={history} movies={movies} />
            </Col>
          }} />


          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={6}>
              <MovieView
                movieData={movies.find(movie => movie._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <GenreView genreData={movies.find(m => m.Genre[1] === match.params.name).Genre} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <DirectorView directorData={movies.find(m => m.Director[1] === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        </Row>
      </Router>
    );
  }
}