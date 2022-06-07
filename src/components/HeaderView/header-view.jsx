import React, { Component } from 'react';
import { Container, Navbar, Row, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './header-view.scss';

export class HeaderView extends Component {
  render() {
    const { user, onLoggedOut } = this.props;
    return (
      <Row className=''
        style={{}}
      >
        <Navbar
          className='header-view'
          collapseOnSelect
          expand='md'
          variant='dark'
          bg='info'
          fixed='top'
        >
          <Navbar.Brand
            href='/'
          >
            myCineMovieApp
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
          />

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="me-auto justify-content-end"
          >
            <Nav
              className="me-auto"
            >
              <Nav.Link
                href="/"
              >
                movies
              </Nav.Link>

              <Nav.Link
                href={`/users/${user}`}
              >
                profile
              </Nav.Link>

            </Nav>
          </Navbar.Collapse>

          <Nav
            className="justify-content-end"
          >
            <NavDropdown
              variant='info'
              title={<Button
                variant='none'
                size='md'
                style={{
                  color: '#17A2B8',
                  fontSize: 'small',
                  backgroundColor: '#17a2b8'
                }}
              >
                <Container
                  className="justify-content-center"
                >
                  <Navbar.Text
                    style={{ padding: '0' }}
                  >
                    signed in as: {' '}
                    <Navbar.Text
                      style={{ color: 'white' }}
                    >
                      {user}
                    </Navbar.Text>
                  </Navbar.Text>
                </Container>
              </Button>}
              id="basic-nav-dropdown"
              style={{
                backgroundColor: '#17a2b8',
                marginLeft: '5rem'
              }}
            >


              <NavDropdown.Item
                href="#logout"
                style={{
                  backgroundColor: '#17a2b8'
                }}
              >

                <Button
                  onClick={onLoggedOut}
                  variant='light'
                  size='sm'
                  style={{
                    marginLeft: '1rem',
                    color: '#17A2B8',
                    fontSize: 'small',
                    width: '85%'
                  }}
                >Logout
                </Button>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar>
      </Row>
    )
  }
}

export default HeaderView;

// PropTypes
HeaderView.propTypes = {
  user: PropTypes.string
};
