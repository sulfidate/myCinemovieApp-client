import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// #0
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { setUser } from '../../actions/actions';


// #1
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { HeaderView } from '../header-view/header-view';
import { ProfileView } from '../profile-view/profile-view';

import { Row, Col, Button } from 'react-bootstrap';

import './main-view.scss';

//#2 export keyword removed from here
export class MainView extends React.Component {

  constructor() {
    super();
    // #3 user, movies state removed from here
    this.state = {
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getUser(accessToken);
      this.getMovies(accessToken);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        // #4 
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  getMovies(token) {
    axios.get('https://mycinemoviedatabase.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // #4 
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    this.props.setUser({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser({
      user: null,
    });
  }

  render() {
    // #5 user, movies are extracted from this.props rather than from the this.state
    let {
      user,
      movies,
      FavoriteMovies,
    } = this.props;

    return (

      <Router>
        <Row className="main-view justify-content-md-center" style={{ marginTop: '150px', padding: '15px' }}>

          <HeaderView user={user} />

          <Route exact path="/" render={() => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            // #6
            return <MoviesList movies={movies} user={user} />;
          }} />

          < Route path="/register" render={() => {
            if (user) return <Redirect to='/' />
            return <Col md={6}>
              <RegistrationView user={user} />
            </Col>
          }} />

          <Route path="/profile" render={(history) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={7}>
              <HeaderView user={user} />

              <Row>
                <Button
                  variant='info'
                  style={{ color: 'white' }}
                  className="profile-title"
                  disabled
                >
                  User Profile
                </Button>
              </Row>
              <Row>
                <ProfileView
                  style={{ float: 'right' }}
                  movies={movies}
                  user={user}
                  onBackClick={() => history.goBack()}
                />
              </Row>
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={6}>
              <HeaderView user={user} />

              <MovieView
                movieData={movies.find(movie => movie._id === match.params.movieId)}
                userData={user}
                movie={movies}
                FavoriteMovies={FavoriteMovies}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={6}>
              <HeaderView user={user} />

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
              <HeaderView user={user} />

              <DirectorView directorData={movies.find(m => m.Director[1] === match.params.name).Director} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        </Row>
      </Router>
    );
  }
}
// #7
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}
// #8 
export default connect(mapStateToProps, { setMovies, setUser })
  (MainView);
