import React from 'react';
import axios from 'axios';

import { Row, Col, Navbar, Nav, NavDropdown, Dropdown, Button, ButtonGroup, Container, Form, FormControl } from 'react-bootstrap';

export class HeaderView extends React.Component {

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }


  render() {
    const { user } = this.props;

    return (
      <>
        <header>
          <Container>
            <Navbar bg="light" collapseOnSelect expand="lg" fixed="top" style={{ marginTop: '35px' }} >
              <Container>
                <Navbar.Brand href="https://github.com/sulfidate">
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
              <Container>
                <Form className="d-flex">
                  <FormControl size="sm" as="textarea" rows={1} style={{ borderColor: '#0dcaf0' }}
                    type="search"
                    placeholder="search..."
                    className="mr-2"
                    aria-label="Search"
                  />
                  <Button size="sm" variant="info" style={{ color: 'white', marginLeft: '-.5rem' }}>pushTbtn</Button>
                </Form>
              </Container>
              <Container fluid>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                  <Nav className="me-auto" className="justify-content-end">
                    <Dropdown as={ButtonGroup} size="sm" >
                      <Button variant="info" style={{ color: 'white' }} size="sm" >
                        {`signed in as: ${user}`}
                      </Button>
                      <Dropdown.Toggle split variant="outline-info" id="dropdown-split-basic" />
                      <Dropdown.Menu>
                        <Dropdown.Item href="/profile">edit user profile</Dropdown.Item>
                        <Dropdown.Item href="#/link">another link</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item>
                          <button onClick={() => { this.onLoggedOut() }}>logout</button></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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


/* If there is no registered user, the RegistrationView is rendered.
If there is a user regitered, the register details are *passed as a prop to the RegistrationView*/
    // if (!register) return (
    //   <>
    //     <header>
    //       <Container>
    //         <Navbar bg="light" collapseOnSelect expand="lg" sticky="top" style={{ marginTop: '25px' }} >
    //           <Container>
    //             <Navbar.Brand href="#home">
    //               <img
    //                 src="https://avatars.githubusercontent.com/u/78739948?v=4"
    //                 width="30"
    //                 height="30"
    //                 className="d-inline-block align-top"
    //                 alt="logo sulfidate"
    //               />
    //             </Navbar.Brand>
    //             <Navbar.Brand href="#home"><h1 style={{ color: '#0dcaf0' }}>myCineMovieDatabase</h1></Navbar.Brand>
    //           </Container>
    //           <Container fluid>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    //               <Nav className="me-auto" className="justify-content-end">
    //                 <Nav.Link href="#">
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

    //     <Row className="main-view justify-content-center">
    //       <Col xs={10} sm={9} md={8} lg={7} xl={6} xxl={5}>
    //         <RegistrationView onRegister={register => this.onRegister(register)} />
    //       </Col>
    //     </Row >
    //   </>
    // );

/* If there is no user, the LoginView is rendered.
If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!user) return (
    //   <>
    //     <header>
    //       <Container>
    //         <Navbar bg="light" collapseOnSelect expand="lg" sticky="top" style={{ marginTop: '25px' }} >
    //           <Container>
    //             <Navbar.Brand href="#home">
    //               <img
    //                 src="https://avatars.githubusercontent.com/u/78739948?v=4"
    //                 width="30"
    //                 height="30"
    //                 className="d-inline-block align-top"
    //                 alt="logo sulfidate"
    //               />
    //             </Navbar.Brand>
    //             <Navbar.Brand href="#home"><h1 style={{ color: '#0dcaf0' }}>myCineMovieDatabase</h1></Navbar.Brand>
    //           </Container>
    //           <Container fluid>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //             <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    //               <Nav className="me-auto" className="justify-content-end">
    //                 <Nav.Link href="#">
    //                   <Button variant="info" style={{ color: 'white' }} size="sm" >
    //                     Not registered yet...
    //                   </Button>
    //                 </Nav.Link>
    //               </Nav>
    //             </Navbar.Collapse>
    //           </Container>
    //         </Navbar>
    //       </Container>
    //     </header>

    //     <Row className="main-view justify-content-center" >
    //       <Col xs={10} sm={9} md={8} lg={7} xl={6} xxl={5}>
    //         <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
    //       </Col>
    //     </Row>
    //   </>
    // );
    // Before the movies have been loaded
