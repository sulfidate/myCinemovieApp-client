import React from 'react';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

export class ProfileUpdate extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      PasswordError: "",
      EmailError: "",
      BirthdayError: "",
    }
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
        });
      });
  }

  /* Handle form update */
  handleUpdate(e) {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const validated = this.formValidation();
    if (validated) {
      axios.put(`https://mycinemoviedatabase.herokuapp.com/users/${user}`,
        {
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert(user + " has been updated.");
          console.log(response);
          window.location.reload();
          // window.open('/profile', '_self');
        })
        .catch(function (error) {
          alert(error.response.data);
        });
    }
  }

  /* Form Validation Start */

  formValidation() {
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValid = true;
    if (this.state.Password.trim().length < 5 || this.state.Password === '') {
      PasswordError.passwordMissing = "You must enter a password at least 6 characters long.";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "Your email doesn't look quite right.";
      isValid = false;
    }
    if (this.state.Birthday === '' || !this.state.Birthday) {
      BirthdayError.BirthdayEmpty = "Please enter your date of birth.";
      isValid = false;
    }
    this.setState({
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  };

  setField(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }



  render() {
    // const { user } = this.props;
    const user = localStorage.getItem('user');
    const { PasswordError, EmailError, BirthdayError } = this.state;
    return (
      <>
        <div>
          <h4 style={{ color: '#0dcaf0', margin: '0.8rem 0 .1rem 0', border: 'solid #0dcaf0 .1rem', borderRadius: '5px', padding: '.5rem' }}>...update your Information</h4>
          <p style={{ margin: '.4rem 0 .4rem 0', border: 'solid #0dcaf0 .1rem', padding: '.25rem', borderRadius: '5px' }}>Username cannot be updated</p>
        </div>
        <Form style={{ margin: '0 0 1.5rem 0' }}>
          <Form.Group controlId="updateEmail" style={{ margin: '0 0 .4rem 0' }}>
            <Form.Control type="email" name="Email" placeholder="...new Email" onChange={(e) => this.setField(e)} style={{ border: 'solid #0dcaf0 .1rem' }} ></Form.Control>
            {Object.keys(EmailError).map((key) => {
              return (
                <div className="updateform-validation-error" key={key}>
                  {EmailError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="updateBirthday" style={{ margin: '0 0 .5rem 0' }}>
            <Form.Control type="date" name="Birthday" onChange={(e) => this.setField(e)} style={{ border: 'solid #0dcaf0 .1rem' }}></Form.Control>
            {Object.keys(BirthdayError).map((key) => {
              return (
                <div className="updateform-validation-error" key={key}>
                  {BirthdayError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="updatePassword" style={{ margin: '0 0 .5rem 0' }}>
            <Form.Control type="password" name="Password" placeholder="...change Password " onChange={(e) => this.setField(e)} style={{ border: 'solid #0dcaf0 .1rem' }} ></Form.Control>
            {Object.keys(PasswordError).map((key) => {
              return (
                <div className="updateform-validation-error" key={key}>
                  {PasswordError[key]}
                </div>
              );
            })}
          </Form.Group>
        </Form>
        <Row>
          <Col className="reg-btns mt-1">
            <Link to={`/profile`}><Button variant="info" style={{ color: 'white' }}>Cancel</Button></Link>
          </Col>
          <Col className="reg-btns mt-1">
            <Button size="md" variant="info" style={{ color: 'white' }} type="submit" ml="4" onClick={() => this.handleUpdate()} >Update</Button>
          </Col>
        </Row>
      </>
    );
  }
}

ProfileUpdate.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string,
    Email: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  })
};
