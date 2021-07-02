import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Godfather', Description: 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.', ImagePath: 'https://www.themoviedb.org/t/p/w220_and_h330_face/sbbrefut8TeFMYYtFK1YfkdYbMn.jpg' },
        { _id: 2, Title: 'Alien', Description: 'During its return to the earth, commercial spaceship Nostromo intercepts a distress signal from a distant planet. When a three-member team of the crew discovers a chamber containing thousands of eggs on the planet, a creature inside one of the eggs attacks an explorer. The entire crew is unaware of the impending nightmare set to descend upon them when the alien parasite planted inside its unfortunate host is birthed.', ImagePath: 'https://www.themoviedb.org/t/p/w220_and_h330_face/7JqXmi6fUrUjOHxmu30CAc8SnXn.jpg' },
        { _id: 3, Title: 'Jaws', Description: 'A man eating shark is terrorising the holiday island of Amity. Police chief Martin Brody, shark hunter Quint and marine biologist Matt Hooper set sail in the hope of killing the great white monster.', ImagePath: 'https://www.themoviedb.org/t/p/w220_and_h330_face/tjbLSFwi0I3phZwh8zoHWNfbsEp.jpg' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>

    );
  }
}