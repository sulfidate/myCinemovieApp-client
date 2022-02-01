import React, { Component } from 'react';
import { Container, Navbar, Row, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './header-view.scss';

export class HeaderView extends Component {
  render() {
    const { user, onLoggedOut } = this.props;
    return (


      <Navbar
        className='header-view'
        collapseOnSelect expand={'sm'}
        variant='dark'
        bg='info'
        fixed='top'
      >
        <Container>

          <Navbar.Brand
            href='#home'
          >
            myCineMovieApp
          </Navbar.Brand>


          <Nav className="me-auto" style={{ paddingLeft: '5rem' }} >
            <Nav.Link href="#home">home</Nav.Link>
            <Nav.Link href="#features">profileview</Nav.Link>
            <Nav.Link href="#pricing">signup</Nav.Link>
            <Nav.Link href="#pricing">signout</Nav.Link>

          </Nav>


          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <NavDropdown
              variant='info'
              title={
                <Button variant='light' size='sm' style={{ color: '#17A2B8', fontSize: 'small', backgroundColor: '#17a2b8' }}
                >
                  <Container className="justify-content-center" >
                    <Navbar.Text
                      style={{ padding: '0' }}
                    >signed in as: {' '}
                      <Navbar.Text
                        style={{ color: 'white' }}
                      >
                        {user}
                      </Navbar.Text>
                    </Navbar.Text>
                  </Container>
                </Button>
              }
              id="basic-nav-dropdown"
              style={{ backgroundColor: '#17a2b8', marginLeft: '5rem' }}
            >
              <NavDropdown.Item
                href="#account"
                style={{ backgroundColor: '#17a2b8' }}
              >
                {/* <Button
                  variant='light'
                  size='sm'
                  style={{ marginLeft: '1rem', color: '#17A2B8', fontSize: 'small', width: '85%' }}
                >user account
                </Button> */}
              </NavDropdown.Item>


              <NavDropdown.Item
                href="#logout"
                style={{ backgroundColor: '#17a2b8' }}
              >
                <Button
                  onClick={onLoggedOut}
                  variant='light'
                  size='sm'
                  style={{ marginLeft: '1rem', color: '#17A2B8', fontSize: 'small', width: '85%' }}
                >
                  Logout
                </Button>

              </NavDropdown.Item>
            </NavDropdown>

          </Navbar.Collapse>
        </Container>
      </Navbar >
    )
  }
}

export default HeaderView;

// PropTypes
HeaderView.propTypes = {
  user: PropTypes.string.isRequired
};
