import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { HeaderView } from '../header-view/header-view';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { user, movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    <Col md={12} style={{ margin: '1rem' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {
      filteredMovies.map(m => (
        <Col xs={12} md={6} lg={3} xl={2} key={m._id}>
          <HeaderView user={user} />
          <MovieCard movieData={m} />
        </Col>
      ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);