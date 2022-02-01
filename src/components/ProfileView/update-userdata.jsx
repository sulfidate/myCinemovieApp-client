import axios from 'axios'
import React, { useState } from 'react'

import { Card, Form, Button, Container } from 'react-bootstrap'


export default function UpdateUserdata(username) {

  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [messagePassword, setMessagePassword] = useState('')
  const [messageEmail, setMessageEmail] = useState('')

  const handlePasswordChange = (e) => {
    if (password === '') {
      setBtnDisabled(true)
      setMessagePassword(null)
    } else if (password !== '' && password.trim().length < (5)) {
      setMessagePassword('Password must be at least 6 characters')
      setBtnDisabled(true)
    } else {
      setMessagePassword(null)
      setBtnDisabled(false)
    }
    setPassword(e.target.value)
  }

  const handleEmailChange = (e) => {
    if (email === '') {
      setBtnDisabled(true)
      setMessageEmail(null)
    } else if ((email.length <= 5) || (email.indexOf('@') === -1)) {
      setMessageEmail(`Email seems not to be in valid format - at least 5 characters or missing @-character`)
      setBtnDisabled(true)
    } else {
      setMessageEmail(null)
      setBtnDisabled(false)
    }
    setEmail(e.target.value)
  }

  const handleBirthdayChange = (e) => {
    setBirthday(e.target.value)
  }

  const setUsername = (value) => {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  // const setPassword = (value) => {
  //   this.setState({
  //     Password: value,
  //   });
  //   this.Password = value;
  // }

  // const setEmail = (value) => {
  //   this.setState({
  //     Email: value,
  //   });
  //   this.Email = value;
  // }

  // const setBirthday = (value) => {
  //   this.setState({
  //     Birthday: value,
  //   });
  //   this.Birthday = value;
  // }
  const componentDidMount = () => {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser = (token) => {
    const username = localStorage.getItem("user");
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
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://mycinemoviedatabase.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        alert("Profile is updated!");
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteUser = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      axios.delete(`https://mycinemoviedatabase.herokuapp.com/users/${user}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => {
          alert(user + "has been deleted");
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        })
    };
  }


  return (
    <>
      <Card.Body
        className="user-update"
      >
        <Form.Label
          as="h5"
          style={{ margin: '0.5% 0 1% 0' }}
        >
          Update your profile
        </Form.Label>

        <Form
          className="update-form"
          variant='info'
          style={{ border: '0.1rem solid #17a2b8', padding: '1.5rem' }}

        // onSubmit={(e) =>
        //   this.editUser(
        //     e,
        //     this.Username,
        //     this.Password,
        //     this.Email,
        //     this.Birthday
        //   )
        // }
        >

          <Form.Group
            className="form-group-username mb-3"
          >
            <Form.Label
              className="form-label colorInfo"
            >Username:
              <span className="ml-3"
              >{this.username}
              </span>
            </Form.Label>
            <Form.Control
              style={{ fontSize: 'small' }}
              type="text"
              placeholder="Username cannot be updated. (To get a new username delete profile and register with new username!)"
              disabled
              value={this.username}
            />
          </Form.Group>

          <Form.Group
            className="form-group-password"
          >
            <Form.Label
              className="form-label colorInfo"
            >
              Update Password:
            </Form.Label>

            <Form.Control
              type="password"
              placeholder="Choose new password - at least 6 Chars"
              onChange={handlePasswordChange}
              value={password}
              minLength={6}
            />
            <Form.Text
              className="text-muted mt-3"
            >
              {messagePassword && <p className='message'>{messagePassword}</p>}

            </Form.Text>
          </Form.Group>

          <Form.Group
            className="form-group-email"
          >
            <Form.Label
              className="form-label colorInfo"
            >
              Update email:
            </Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter new email - valid format: xxx@xxx.xxx"
              onChange={handleEmailChange}
              value={email}
            />
            <Form.Text
              className="text-muted mt-3"
            >
              {messageEmail && <p className='message'>{messageEmail}</p>}

            </Form.Text>
          </Form.Group>

          <Form.Group
            className="form-group-birthday"
          >
            <Form.Label
              className="form-label colorInfo"
            >Birthday</Form.Label>
            <Form.Control
              type="date"
              onChange={handleBirthdayChange}
            />
          </Form.Group>

          <Container className="form-btn">

            <Button
              className='form-btn-sbm mt-3'
              variant='outline-info'
              type='submit'
              disabled={btnDisabled}
              onClick={editUser}
            >
              Update User
            </Button>
          </Container>
          <Container>
            <Button
              className="form-btn-del"
              variant="outline-danger"
              style={{ border: '1px solid #17a2b8', color: '#17a2b8' }}
              onClick={() => this.deleteUser()}
            > <span>Delete User</span> </Button>

          </Container>

        </Form>
      </Card.Body>

    </>
  )
}


