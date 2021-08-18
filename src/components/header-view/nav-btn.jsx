import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Navbar, Nav, NavDropdown, Dropdown, Button, ButtonGroup, Container, Form, FormControl } from 'react-bootstrap';



export class NavBtn extends Component {
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

        <Dropdown as={ButtonGroup} size="sm" >


          <Button variant="info" style={{ color: 'white' }} size="sm" >
            {`signed in as: ${user}`}
          </Button>


          <Dropdown.Toggle split variant="outline-info" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">edit user profile</Dropdown.Item>
            <Dropdown.Item href="/">go to movies</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <button onClick={() => { this.onLoggedOut() }}>logout</button></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


      </div>
    );
  }
}

