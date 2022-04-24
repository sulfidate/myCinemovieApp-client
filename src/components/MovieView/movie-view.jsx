import React from 'react'
import axios from 'axios'
import { Col, Card, Button, ButtonGroup, Row, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './movie-view.scss'

export default class MovieView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
      isActive: false,
      favouriteMovies: [],
    }
  }

  // check if movie is in favorites
  checkIfMovieIsInFavorites() {
    let movieID = this.props.movie._id
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
        console.log(error);
      });
    }
    return favouriteMovies.includes(movieID)
  }

  componentDidMount() {
    const isInFavorites = this.checkIfMovieIsInFavorites()
    this.setState({ isSelected: isInFavorites })
    this.setState({ isActive: isInFavorites })
  }

  addFavMovie() {
    const username = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    axios
      .patch(
        `https://mycinemoviedatabase.herokuapp.com/users/${username}/Favorites/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: 'PATCH',
        }
      )
      .then((response) => {
        localStorage.setItem('favMovies', JSON.stringify(response.data.FavoriteMovies))
        this.setState({ isSelected: true })
        this.setState({ isActive: true })
        this.checkIfMovieIsInFavorites()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  removeFavMovie = (movie) => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    axios
      .delete(
        `https://mycinemoviedatabase.herokuapp.com/users/${user}/FavoritesDelete/${movie._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        localStorage.setItem('favMovies', JSON.stringify(response.data.FavoriteMovies))
        this.setState({ isActive: false })
        this.setState({ isSelected: false })
        this.checkIfMovieIsInFavorites()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    const { movie, onBackClick, FavoriteMovies } = this.props
    const { isActive, isSelected, movieId } = this.state
    return (
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          xl={12}
          xxl={12}
          key={this.props.movie._id}
        >
          <Card className='movie-view justify-content-center' bg='light'>
            <Container>
              <Row className='justify-content-center'>
                <Card.Title className='card-title'>
                  <span>{movie.Title}</span>
                  <span
                    className={`btn-star-fav ${isActive ? 'toggle' : null} `}
                  >
                    &#x2605;
                  </span>
                </Card.Title>
              </Row>
              <Row className='justify-content-center'></Row>
            </Container>
            <Container>
              <Col className='image-container d-flex justify-content-center mt-5 mb-5'>
                <Card.Img variant='top' src={movie.ImagePath} className='img' />

                <div className='overlay d-flex align-items-center justify-content-center'>
                  <>
                    <Button
                      key='addFavMov'
                      type='submit'
                      className='mr-2'
                      value={movie._id}
                      onClick={() => this.addFavMovie(movie)}
                      variant='info'
                      size='sm'
                      style={{
                        color: 'white',
                      }}
                      disabled={isSelected ? true : false}
                    >
                      Add to Favorites
                    </Button>
                  </>
                  <>
                    <Button
                      key='remFavMov'
                      type='submit'
                      className='mr-2'
                      value={movie._id}
                      onClick={() => this.removeFavMovie(movie)}
                      variant='warning'
                      size='sm'
                      style={{
                        color: 'white',
                      }}
                      disabled={isSelected ? false : true}
                    >
                      Remove from Favorites
                    </Button>
                  </>
                </div>
              </Col>
            </Container>
            <Row className='justify-content-center'>
              <ButtonGroup style={{ margin: '0 20% 0 20%' }}>
                <Button
                  type='button'
                  href={`/directors/${movie.Director[1]}`}
                  variant='outline-info'
                >
                  Director:
                  <br /> {movie.Director[1]}
                </Button>
                <Button
                  variant='outline-info'
                  disabled
                  style={{
                    borderTop: '1px solid white',
                    borderBottom: '1px solid white',
                  }}
                ></Button>
                <Button
                  href={`/genres/${movie.Genre[1]}`}
                  variant='outline-info'
                >
                  Genre:
                  <br /> {movie.Genre[1]}
                </Button>
              </ButtonGroup>
            </Row>
            <Card.Body>
              <Card.Text style={{ color: '#17A2B8' }}>
                {movie.Description}
              </Card.Text>
            </Card.Body>
            <Button
              className='movie-button'
              bg='dark'
              variant='info'
              onClick={() => {
                onBackClick(null)
              }}
              value={this.setState.movieId}
            >
              Back
            </Button>
          </Card>
        </Col>
      </Row>
    )
  }
}
// PropTypes
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.string),
    Director: PropTypes.arrayOf(PropTypes.string),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
}