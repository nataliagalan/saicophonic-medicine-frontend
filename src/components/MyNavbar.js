import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import $ from "jquery"
import Sidebar from './Sidebar';

class MyNavbar extends Component {

  componentDidMount() {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  render() {
    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#menu-toggle" id="menu-toggle">Toggle Menu</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Sidebar />
      </>
    )
  }
}


export default MyNavbar