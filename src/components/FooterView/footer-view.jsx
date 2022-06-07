import React, { Component } from 'react';
import { Row, Container, Navbar } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import './footer-view.scss';

export class FooterView extends Component {
  render() {
    return (


      <Navbar
        className='footer-view justify-content-center'
        variant='dark'
        bg='info'
        expand={"sm" | "md" | "lg" | "xl"}
        fixed='bottom'
      >

        <Navbar.Text
          className='footer-text'
          style={{ padding: '0' }}
        >
          Copyright ©  {new Date().getFullYear()} <br />
          <em
            style={{ fontSize: 'small' }}
          >
            <a
              style={{ color: 'rgba(255,255,255,.5)' }}
              href='https://sulfidate.solutions'
            >
              by sulfidate.solution
            </a>
          </em>
        </Navbar.Text>

      </Navbar>
    )
  }
}

export default FooterView;
