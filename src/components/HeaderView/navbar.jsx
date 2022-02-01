import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
export default function NavBar() {

  return (

    <Nav className="me-auto" style={{ paddingLeft: '5rem' }} >
      <Nav.Link href="#home">home</Nav.Link>
      <Nav.Link href="#features">profileview</Nav.Link>
      <Nav.Link href="#pricing">signup</Nav.Link>
      <Nav.Link href="#pricing">signout</Nav.Link>

    </Nav>

  );

}
