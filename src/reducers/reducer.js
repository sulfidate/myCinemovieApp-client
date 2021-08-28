import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  SET_FAVORITEMOVIES,
  SET_DIRECTORS,
  SET_GENRES
} from "../actions/actions";
import { combineReducers } from "redux";

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}
function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIES:
      return action.value;
    default:
      return state;
  }
}
function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.value;
    default:
      return state;
  }
}
function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.value;
    default:
      return state;
  }
}
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}
function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}



const moviesApp = combineReducers({
  movies,
  visibilityFilter,
  user,
  genres,
  directors,
  favoriteMovies
});

export default moviesApp;