import React, { Component } from 'react';
import { Row, Col, Container, Card, Tabs, Tab, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ProfileUpdate } from './profile-update';


export class ProfileView extends React.Component {
  constructor() {
    super();
    (this.Username = null),
      (this.Password = null),
      (this.Email = null),
      (this.Birthday = null);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleRemoveFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://mycinemoviedatabase.herokuapp.com/users/${username}/FavoritesDelete/${movie}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      // .then(() => {
      //   alert('Movie was removed from your Favorites List.');
      //   this.componentDidMount();
      // })
      .catch(function (error) {
        console.log(error);
      }).then(() => window.location.reload());
  }

  handleDelete() {

    const answer = window.confirm("This cannot be undone, are you sure?");
    if (answer) {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + "'s user-data has been deleted. Register again if you wan't to come back :)");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          window.location.pathname = "/register";
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Good bye!");
    }
  }



  render() {
    const { FavoriteMovies, validated } = this.state;
    const user = localStorage.getItem('user');
    const { movies } = this.props;

    return (
      <>
        <Container className="user-information" style={{ marginTop: '2rem' }} >
          <Row>
            <Col>
              <div>
                <h4
                  style={{
                    color: '#0dcaf0',
                    margin: '0.8rem 0 .1rem 0',
                    border: 'solid #0dcaf0 .1rem',
                    borderRadius: '5px',
                    padding: '.5rem'
                  }}>
                  User Information
                </h4>
                <p
                  style={{
                    margin: '.4rem 0 0 0',
                    border: 'solid #0dcaf0 .1rem',
                    padding: '.3rem 0 .4rem .3rem',
                    borderRadius: '5px'
                  }}>
                  Username: {`${this.state.Username}`}
                </p>
                <p
                  style={{
                    margin: '.4rem 0 0 0',
                    border: 'solid #0dcaf0 .1rem',
                    padding: '.3rem 0 .4rem .3rem',
                    borderRadius: '5px'
                  }}>
                  Email: {`${this.state.Email}`}
                </p>
                <p
                  style={{
                    margin: '.4rem 0 0 0',
                    border: 'solid #0dcaf0 .1rem',
                    padding: '.3rem 0 .4rem .3rem',
                    borderRadius: '5px'
                  }}>
                  Birthday: {`${this.state.Birthday}`}
                </p>
                <p
                  style={{
                    margin: '.4rem 0 1.8rem 0',
                    border: 'solid #0dcaf0 .1rem',
                    padding: '.3rem 0 .4rem .2rem',
                    borderRadius: '5px',
                    maxWidth: '330px',
                    overflow: 'hidden'
                  }}>
                  Password: *****
                </p>

              </div>
              <Row>
                <Col className="">
                  <Button
                    style={{
                      color: 'red',
                    }}
                    variant="outline-info"
                    type="submit"
                    size='md'
                    onClick={() => this.handleDelete()}
                  >
                    Delete Account
                  </Button>
                  <p
                    style={{
                      fontSize: '12px'
                    }}>
                    ...will remove all your user data!
                  </p>
                </Col>
              </Row>
            </Col>
            <Col>
              <ProfileUpdate />
            </Col>
          </Row>


        </Container>

        <div>
          <h4
            style={{
              color: '#0dcaf0',
              margin: '4rem 0 2rem 0',
              border: 'solid #0dcaf0 .1rem',
              padding: '.6rem',
              borderRadius: '5px'
            }}>
            Favorite Movies List
          </h4>
        </div>

        {
          FavoriteMovies.length === 0 &&
          <div
            className='card-content'
          >
            No Favorite Movies in Your List!
          </div>
        }

        {
          FavoriteMovies.length > 0 &&
          movies.map((movie) => {
            if (
              movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)
            ) {
              return (

                <Col md={3} key={movie._id}>
                  <Card
                    className='favorites-item card-content'
                  // style={{ width: '10rem', margin: '.3rem' }}
                  >
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Img
                        className='movie-card'
                        variant="top"
                        src={movie.ImagePath}
                      />
                    </Link>
                    <Card.Title
                      className='movie-card-title'
                      style={{
                        minHeight: '4.5rem',
                        fontSize: '1.3rem'
                      }}>
                      {movie.Title}
                    </Card.Title>
                    <Card.Body className='movie-card-body'>
                      <Button
                        size='sm'
                        className='profile-button remove-favorite'
                        variant='info'
                        style={{ color: 'white' }}
                        onClick={(e) => this.handleRemoveFavorite(e, movie._id)}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>

              );
            }
          })
        }


      </>
    );
  }
}

// Style
const cardStyle = {
  marginTop: '25px',
  padding: '2rem',
}
const btnStyle = {
  padding: '.3rem 1rem',
  color: 'white',
  borderRadius: '10%'
}

// PropTypes
ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    Favorites: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,
};

