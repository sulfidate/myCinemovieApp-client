import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import HeaderView from '../HeaderView/header-view';
import LoginView from '../LoginView/login-view';
import RegistrationView from '../RegistrationView/registration-view';
import ProfileView from '../ProfileView/profile-view';
import MovieCard from '../MovieCard/movie-card';
import MovieView from '../MovieView/movie-view';
import GenreView from '../GenreView/genre-view';
import DirectorView from '../DirectorView/director-view';
import FooterView from '../FooterView/footer-view';


export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      FavoriteMovies: [],
      user: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,

    };
  }

  // Functions for all Components

  getMovies(token) {
    axios.get('https://mycinemoviedatabase.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUser = (token) => {
    const username = localStorage.getItem("user");
    axios
      .get(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUser(accessToken);

    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open("/", "_self");

  }

  onRemoveFavorite = (movie) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${user}/FavoritesDelete/${movie._id}`,
      { headers: { Authorization: `Bearer ${token}` } }


    )
      .then((response) => {
        // this.componentDidMount();
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });

  }


  render() {
    const {
      movies,
      user,
      FavoriteMovies,
      Username,
      Password,
      Email,
      Birthday,
    } = this.state;

    return (
      <Router>
        <Row className='playground'>
          <Col className='center'>
            <Row className="header-view">
              <Col
                sm={6}
                md={4}
                lg={3}
                xl={3}
                xxl={3}
              >
                <HeaderView
                  user={user}
                  onLoggedOut={(user) => { this.onLoggedOut(user) }}

                />
              </Col>
            </Row>

            <Row className="main-view justify-content-md-center">
              <Route
                exact path="/"
                render={() => {

                  if (!user) return <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return movies.map(movie => (
                    <Col
                      sm={6}
                      md={4}
                      lg={3}
                      xl={3}
                      xxl={3}
                      key={movie._id}
                    >
                      <MovieCard
                        movie={movie}
                      />
                    </Col>
                  ))
                }}
              />

              <Route
                path="/register"
                render={() => {

                  if (user) return <Redirect to={'/'} />

                  return <Col>

                    <RegistrationView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />

                  </Col>
                }}
              />

              <Route

                path="/movies/:movieId"
                render={({ match, history }) => {

                  if (!user) return <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return (
                    <>
                      <Col />
                      <Col
                        xs={10}
                        sm={12}
                        md={8}>
                        <MovieView
                          movie={movies.find(movie => movie._id === match.params.movieId)}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                      <Col />
                    </>
                  )
                }} />

              <Route

                path="/directors/:name"
                render={({ match, history }) => {

                  if (!user) return <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return (
                    <>
                      <Col />
                      <Col
                        sm={6}
                        md={8}
                      >
                        <DirectorView
                          director={movies.find(movie => movie.Director[1] === match.params.name).Director}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                      <Col />
                    </>
                  )
                }} />

              <Route

                path="/genres/:name"
                render={({ match, history }) => {

                  if (!user) return <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  </Col>

                  if (movies.length === 0) return <div className="main-view" />;

                  return (
                    <>
                      <Col />
                      <Col
                        sm={6}
                        md={8}
                      >
                        <GenreView
                          genre={movies.find(movie => movie.Genre[1] === match.params.name).Genre}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                      <Col />
                    </>
                  )
                }} />

              <Route
                path={`/users/${user}`}
                render={({ match, history }) => {

                  if (!user) return <Redirect to={'/'} />

                  return (
                    <>
                      <Col
                        key={'rofile-view'}
                      >
                        <ProfileView
                          movies={movies}
                          user={user}
                          FavoriteMovies={FavoriteMovies}
                          Username={Username}
                          Password={Password}
                          Email={Email}
                          Birthday={Birthday}
                          onRemoveFavorite={(movie) => { this.onRemoveFavorite(movie) }}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    </>
                  )
                }}
              />

            </Row>
            <FooterView
              className="footer-view"
            />
          </Col>
        </Row>
      </Router >
    );
  }
}

