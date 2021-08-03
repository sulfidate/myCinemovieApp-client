import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Container, Col, Row, Card, Nav, Navbar } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: null,
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
      .then(response => {
        // Assign the result to the state
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateUser(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.put(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then((response) => {
        alert('saved changes');
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  deleteUser(e) {
    e.prevent.Default();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteFavouriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${username}/FavoritesDelete/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert('Favorite movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(() => window.location.reload());
  }


  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies, userprofile } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h1 className="section">Update Profile</h1>
          <Card.Body>
            <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.updateUser(e, this.Username, this.Password, this.Email, this.Birthday)}>

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">current Username</Form.Label>
                <Form.Control type="text" placeholder={'change ' + userprofile} onChange={(e) => this.setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="new password" onChange={(e) => this.setPassword(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="new email" onChange={(e) => this.setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control type="date" placeholder="Change Birthday" onChange={(e) => this.setBirthday(e.target.value)} />
              </Form.Group>

              <Button variant='info' style={{ color: 'white', margin: '1rem 0 1rem 0' }} type="submit" >
                update user information
              </Button>

              <Card.Body>
                <h3>delete account</h3>
                <Button variant='info' style={{ color: 'white', margin: '0 0 0 0' }} onClick={(e) => this.deleteUser(e)}>
                  delete user account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row >);
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};

  // return (
  //   <>
  //     <header>
  //       <Container>
  //         <Navbar bg="light" collapseOnSelect expand="lg" sticky="top" style={{ marginTop: '25px' }} >
  //           <Container>
  //             <Navbar.Brand href="#home"><h1 style={{ color: '#0dcaf0' }}>User Profile: {username} </h1></Navbar.Brand>
  //           </Container>
  //           <Container fluid>
  //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
  //             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
  //               <Nav className="me-auto" className="justify-content-end">
  //                 <Nav.Link href="/">
  //                   <Button variant="info" style={{ color: 'white' }} size="sm" >
  //                     you want to login ..?
  //                   </Button>
  //                 </Nav.Link>
  //               </Nav>
  //             </Navbar.Collapse>
  //           </Container>
  //         </Navbar>
  //       </Container>
  //     </header>

  //     <Form style={{ marginTop: '25px', padding: '5px' }}>
  //       <Form.Group controlId="formUsername">
  //         <Form.Label>Username:</Form.Label>
  //         <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
  //       </Form.Group>

  //       <Form.Group controlId="formPassword">
  //         <Form.Label>Password:</Form.Label>
  //         <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
  //       </Form.Group>

  //       <Form.Group controlId="formEmail">
  //         <Form.Label>Email:</Form.Label>
  //         <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
  //       </Form.Group>

  //       <Form.Group controlId="formBirthday">
  //         <Form.Label>Birthday:</Form.Label>
  //         <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
  //       </Form.Group>

  //       <Button variant="outline-info" type="button" style={{ margin: '20px 0 0 0' }} onClick={updateProfile}>update</Button>
  //     </Form>
  //   </>
  // )
  // }

//   ProfileView.propTypes = {
//     profile: PropTypes.shape({
//       Username: PropTypes.string.isRequired,
//       Password: PropTypes.string.isRequired,
//       Email: PropTypes.string.isRequired,
//       Birthday: PropTypes.string.isRequired
//     }),
//     onRegister: PropTypes.func
//   };
// }