import React, { Component } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Row, Col, Navbar, Nav, NavDropdown, Dropdown, Button, ButtonGroup, Container, Form, FormControl } from 'react-bootstrap';

import { NavBtn } from './nav-btn';

export class HeaderView extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    const { user, signedIn } = this.props;

    return (
      <>
        <header>
          <Container>
            <Navbar bg="light" collapseOnSelect expand="lg" fixed="top" style={{ marginTop: '35px' }} >
              <Container>
                <Navbar.Brand href="https://github.com/sulfidate" target='_blank' >
                  <img
                    src="https://avatars.githubusercontent.com/u/78739948?v=4"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="logo sulfidate"
                  />
                </Navbar.Brand>
                <Navbar.Brand href="/"><h1 style={{ color: '#0dcaf0' }}>myCineMovieDatabase</h1></Navbar.Brand>
              </Container>
              <Container fluid id='signed-nav-btn'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                  <Nav className="me-auto" className="justify-content-end">

                    <NavBtn user={user} />

                  </Nav>
                </Navbar.Collapse>
              </Container>


            </Navbar>
          </Container>
        </header>


      </>
    );
  }
}

