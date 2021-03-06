import React from 'react'
import PropTypes from 'prop-types'
import { Card, Button } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import './movie-card.scss'

/**
 * MovieCard component
 * @Component MovieCard component
 */
export default class MovieCard extends React.Component {
  render() {
    const { movie } = this.props

    return (
      <Card
        className='mb-5 mt-3 movie-card justify-content-center'
        bg='light'
        key={movie._id}
        text='light'
        style={{ border: 'solid #17A2B8 0.1rem', padding: '0.05rem' }}
      >
        <Card.Img src={movie.ImagePath} variant='top' />

        <Card.Body>
          <Card.Title
            className='mt-1 mb-5'
            style={{ color: '#17A2B8', height: '5rem' }}
          >
            {movie.Title}
            <br />
            <Link
              to={`/genres/${movie.Genre[1]}`}
              style={{ color: '#17A2B8', fontSize: 'small' }}
            >
              {movie.Genre[1]}
            </Link>
            <br />
            <Link
              to={`/directors/${movie.Director[1]}`}
              style={{
                color: '#17A2B8',
                fontSize: 'small',
              }}
            >
              {movie.Director[1]}
            </Link>
          </Card.Title>

          <Link to={`/movies/${movie._id}`}>
            <Button variant='outline-info'>more...</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}

/**
 * PropTypes
 *  @PropTypes {object} props
 */
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.arrayOf(PropTypes.string),
    Director: PropTypes.arrayOf(PropTypes.string),
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool,
  }).isRequired,
}
