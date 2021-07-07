import React from "react";
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';


export function RegistrationView() {

  const username = '';
  const password = '';
  const email = '';
  const DOB = '';

  function sendForm() {
    alert('Thank you for Registration');
    let reg = true
    props.regData(reg);
  }


  return (
    // <>
    //   <form>
    //     <h1>Registration Form</h1>
    //     <label>
    //       Username:
    //       <input type="text" />
    //     </label>
    //     <label>
    //       Password:
    //       <input type="password" />
    //     </label>
    //     <br />
    //     <label>
    //       Email:
    //       <input type="email" />
    //     </label>
    //     <label>
    //       Date of Birth:
    //       <input type="date" />
    //     </label>
    //     <button type="submit" onClick={sendForm}>Submit</button>
    //   </form>
    // </>

    <Row className="registration-view justify-content-md-center">
      <Col md={5}>
        <Jumbotron fluid>
          <Container>
            <h1>Registration Form</h1>
            <p>
              To register please fill out this form...
            </p>
          </Container>
        </Jumbotron>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Form.Row>

          <Button variant="info" size="sm" block type="submit" onClick={sendForm}>Submit</Button>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  regData: PropTypes.func.isRequired
};
