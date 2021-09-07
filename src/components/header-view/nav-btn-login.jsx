import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Navbar, Nav, NavDropdown, Dropdown, Button, ButtonGroup, Container, Form, FormControl } from 'react-bootstrap';



export class NavBtnLogIn extends Component {
  state = {}

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      signedIn: false
    });
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    return (
      <div>

        <Button variant="info" style={{ color: 'white' }} size="sm" disabled >
          no user signed in
        </Button>

      </div>
    );
  }
}

