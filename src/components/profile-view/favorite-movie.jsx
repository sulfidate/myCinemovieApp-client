import React, { Component } from 'react';
import FavoriteItem from './favorite-item';
import PropTypes from 'prop-types';

class FavoriteMovie extends Component {
  render() {
    const { movies } = this.props;
    return this.props.FavoriteMovies.map((favmov) => (

      <FavoriteItem
        key={favmov.id}
        favmov={favmov}
        movies={movies}
      // markComplete={this.props.markComplete}
      // deleteFavMovie={this.props.deleteFavMovie}
      />
    ));
  }
}

// PropTypes
FavoriteMovie.propTypes = {
  // FavoriteMovies: PropTypes.array.isRequired,
  // movies: PropTypes.shape({
  //   _id: PropTypes.string.isRequired,
  //   Title: PropTypes.string.isRequired,
  //   ImagePath: PropTypes.string.isRequired,
  //   Genre: PropTypes.array,
  //   Director: PropTypes.array,
  //   Description: PropTypes.string,
  //   Actors: PropTypes.array
  // })
}

export default FavoriteMovie;