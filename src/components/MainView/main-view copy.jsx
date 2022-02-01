import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import HeaderView from '../HeaderView/header-view';
import LoginView from '../LoginView/login-view';
import RegistrationView from '../RegistrationView/registration-view';
import MovieCard from '../MovieCard/movie-card';
import MovieView from '../MovieView/movie-view';
import FooterView from '../FooterView/footer-view';


class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
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

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegister(registered, user) {
    this.setState({
      registered,
      user
    });
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  render() {
    const { movies, selectedMovie, newSelectedMovie, user, registered, onLoggedOut } = this.state;

    if (!registered) return <RegistrationView isRegistered={registered} onRegister={(registered, username) => this.onRegister(registered, username)} />;

    if (!user) return <LoginView isRegistered={registered} onLoggedIn={user => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <>
        <HeaderView user={user} onLoggedOut={(user) => { this.onLoggedOut(user) }} />
        <Row className="main-view" style={{ margin: '7rem 0 5rem 0' }}>
          {selectedMovie
            ? (
              <><Col />
                <Col md={8}>
                  <MovieView movie={selectedMovie} newMovie={newSelectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
                <Col />
              </>
            )
            : movies.map(movie => (
              <Col key={movie._id} xxl={3} xl={3} lg={3} md={4} sm={6} xs={12}>
                <MovieCard movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
              </Col>
            )
            )
          }
        </Row>
        <FooterView />
      </>
    );
  }
}

export default MainView;


