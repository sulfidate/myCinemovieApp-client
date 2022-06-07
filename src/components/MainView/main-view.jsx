import React from 'react'
import axios from 'axios'
import './main-view.scss'

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import HeaderView from '../HeaderView/header-view'
import LoginView from '../LoginView/login-view'
import RegistrationView from '../RegistrationView/registration-view'
import ProfileView from '../ProfileView/profile-view'
import MovieCard from '../MovieCard/movie-card'
import MovieView from '../MovieView/movie-view'
import GenreView from '../GenreView/genre-view'
import DirectorView from '../DirectorView/director-view'
import FooterView from '../FooterView/footer-view'

export default class MainView extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      FavoriteMovies: [],
      user: null,
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      isSelected: false,
      isActive: false,
    }
  }

  /**
   * initialize variables for the main view
   * @state {movies}
   * @state {FavoriteMovies}
   * @state {user}
   * @state {Username}
   * @state {Password}
   * @state {Email}
   * @state {Birthday}
   * @state {isSelected}
   * @state {isActive}
     
   */

  /**
   * function to get movies from database and set them to state
   * @param {*} token  - token from localStorage
   * @returns {movies} - movies from database
   * @state {movies}
   * @function {getMovies}
   */

  getMovies(token) {
    axios
      .get('https://mycinemoviedatabase.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   * fuction to get user from database and set it to state
   * @param {*} token
   * @param {*} username
   * @state {Username, Password, Email, Birthday} - user data
   * @state {FavoriteMovies} - user favorite movies data
   * @function {getUser}
   * @returns {user} - user from database
   */

  getUser = (token) => {
    const username = localStorage.getItem('user')
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
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   * function to componentDidMount and set user to state
   * @function {componentDidMount}
   * @returns {user} - user from localStorage
   * @state {user}
   */
  componentDidMount() {
    let accessToken = localStorage.getItem('token')
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      })
      this.getMovies(accessToken)
      this.getUser(accessToken)
    }
  }

  /**
   * function to login user and set user to localStorage and set user to state and get movies from database
   * @param {*} username
   * @param {*} password
   * @function {login}
   */
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username,
    })

    localStorage.setItem('token', authData.token)
    localStorage.setItem('user', authData.user.Username)
    this.getMovies(authData.token)
  }

  /**
   * function to logout user and remove user from localStorage and set user to null
   * @function {logout}
   * @returns {user} - null
   * @state {user}
   */
  onLoggedOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setState({
      user: null,
    })
    window.open('/', '_self')
  }

  /**
   *  function to remove movie from favorites
   *  @param {*} movie
   * @function {removeFavMovie}
   * @returns {FavoriteMovies} - user favorite movies data
   * @state {FavoriteMovies}
   *
   */
  onRemoveFavorite = (movie) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    axios
      .delete(
        `https://mycinemoviedatabase.herokuapp.com/users/${user}/FavoritesDelete/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.componentDidMount()
        // window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   *  function to add movie to favorites
   * @param {*} movie
   * @function {addFavMovie}
   * @returns {FavoriteMovies} - user favorite movies data
   * @state {FavoriteMovies}
   *
   */
  addFavMovie(movie) {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    axios
      .patch(
        `https://mycinemoviedatabase.herokuapp.com/users/${username}/Favorites/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'PATCH',
        }
      )
      .then((response) => {
        localStorage.setItem(
          'favMovies',
          JSON.stringify(response.data.FavoriteMovies)
        )
        this.setState({ isActive: true })
        this.setState({ isSelected: true })
        this.checkIfMovieIsInFavorites(movie)
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   *  function to remove movie from favorites
   *  @param {*} movie
   * @function {removeFavMovie}
   * @returns {FavoriteMovies} - user favorite movies data
   * @state {FavoriteMovies}
   *
   */
  removeFavMovie = (movie) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    axios
      .delete(
        `https://mycinemoviedatabase.herokuapp.com/users/${user}/FavoritesDelete/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        localStorage.setItem(
          'favMovies',
          JSON.stringify(response.data.FavoriteMovies)
        )
        this.setState({ isActive: false })
        this.setState({ isSelected: false })
        this.checkIfMovieIsInFavorites(movie)
        window.location.reload()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /** check if movie is in favorites
   *  @param {*} movie
   * @function {checkIfMovieIsInFavorites}
   * @returns {FavoriteMovies} - user favorite movies data
   * @state {FavoriteMovies}
   * @state {isActive}
   * @state {isSelected}
   * @state {isInFavorites}
   */
  checkIfMovieIsInFavorites(movie) {
    let movieID = movie._id
    let username = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    let favouriteMovies = localStorage.getItem('favMovies')
    // if favouriteMvies is null
    if (favouriteMovies == null) {
      axios
        .get(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          favouriteMovies = JSON.stringify(response.data.FavoriteMovies)
          localStorage.setItem('favMovies', favouriteMovies)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    return favouriteMovies.includes(movieID)
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
    } = this.state

    return (
      <Router>
        <Row className='playground'>
          <Col className='center'>
            <Row className='header-view'>
              <Col sm={6} md={4} lg={3} xl={3} xxl={3}>
                <HeaderView
                  user={user}
                  onLoggedOut={(user) => {
                    this.onLoggedOut(user)
                  }}
                />
              </Col>
            </Row>

            <Row className='main-view justify-content-md-center'>
              <Route
                exact
                path='/'
                render={() => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          movies={movies}
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    )

                  if (movies.length === 0) return <div className='main-view' />

                  return movies.map((movie) => (
                    <Col sm={6} md={4} lg={3} xl={3} xxl={3} key={movie._id}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))
                }}
              />

              <Route
                path='/register'
                render={() => {
                  if (user) return <Redirect to={'/'} />

                  return (
                    <Col>
                      <RegistrationView
                        movies={movies}
                        onLoggedIn={(user) => this.onLoggedIn(user)}
                      />
                    </Col>
                  )
                }}
              />

              <Route
                path='/movies/:movieId'
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          movies={movies}
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    )

                  if (movies.length === 0) return <div className='main-view' />

                  return (
                    <>
                      <Col />
                      <Col xs={10} sm={12} md={8}>
                        <MovieView
                          movie={movies.find(
                            (movie) => movie._id === match.params.movieId
                          )}
                          onBackClick={() => history.goBack()}
                          removeFavMovie={this.removeFavMovie}
                          checkIfMovieIsInFavorites={
                            this.checkIfMovieIsInFavorites
                          }
                          addFavMovie={this.addFavMovie.bind(this)}
                        />
                      </Col>
                      <Col />
                    </>
                  )
                }}
              />

              <Route
                path='/directors/:name'
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          movies={movies}
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    )

                  if (movies.length === 0) return <div className='main-view' />

                  return (
                    <>
                      <Col />
                      <Col sm={6} md={8}>
                        <DirectorView
                          director={
                            movies.find(
                              (movie) => movie.Director[1] === match.params.name
                            ).Director
                          }
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                      <Col />
                    </>
                  )
                }}
              />

              <Route
                path='/genres/:name'
                render={({ match, history }) => {
                  if (!user)
                    return (
                      <Col>
                        <LoginView
                          movies={movies}
                          onLoggedIn={(user) => this.onLoggedIn(user)}
                        />
                      </Col>
                    )

                  if (movies.length === 0) return <div className='main-view' />

                  return (
                    <>
                      <Col />
                      <Col sm={6} md={8}>
                        <GenreView
                          genre={
                            movies.find(
                              (movie) => movie.Genre[1] === match.params.name
                            ).Genre
                          }
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                      <Col />
                    </>
                  )
                }}
              />

              <Route
                path={`/users/${user}`}
                render={({ match, history }) => {
                  if (!user) return <Redirect to={'/'} />

                  return (
                    <>
                      <Col key={'rofile-view'}>
                        <ProfileView
                          movies={movies}
                          user={user}
                          FavoriteMovies={FavoriteMovies}
                          Username={Username}
                          Password={Password}
                          Email={Email}
                          Birthday={Birthday}
                          onRemoveFavorite={(movie) => {
                            this.onRemoveFavorite(movie)
                          }}
                          onBackClick={() => history.goBack()}
                        />
                      </Col>
                    </>
                  )
                }}
              />
            </Row>
            <FooterView className='footer-view' />
          </Col>
        </Row>
      </Router>
    )
  }
}
