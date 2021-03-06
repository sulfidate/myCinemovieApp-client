import React, { useState } from 'react'
import axios from 'axios'
import { Col, Card, Button, ButtonGroup, Row, Container } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './movie-view.scss'

export default class MovieView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSelected: false,
      isActive: false,
    }
  }

  /**
   * function to componentDidMount and set user to state
   * @type {componentDidMount}
   * @param {movie} - movie to be added to favorites
   * @returns {movie} - movie to be displayed
   */
  componentDidMount() {
    const isInFavorites = this.props.checkIfMovieIsInFavorites(this.props.movie)
    this.setState({ isSelected: isInFavorites })
    this.setState({ isActive: isInFavorites })
  }

  /**
   * function to add movie to favorites
   * @type {addFavMovie}
   * @param {movie} - movie to be added to favorites
   * @returns {movie} - movie to be added to favorites
   */
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
        this.setState({ isActive: true })
        this.setState({ isSelected: true })
        localStorage.setItem('isActive', true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   *  function to remove movie from favorites
   * @type {removeFavMovie}
   * @param {object} movie - movie to be removed from favorites
   * @returns {object} movie - movie to be removed from favorites
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
        this.setState({ isActive: false })
        this.setState({ isSelected: false })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    const { movie, onBackClick } = this.props
    const { isActive, isSelected } = this.state
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
                      onClick={() => this.props.addFavMovie(movie)}
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
                      onClick={() => this.props.removeFavMovie(movie)}
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

/**
 * PropTypes
 * @PropTypes {object} movie
 */
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
