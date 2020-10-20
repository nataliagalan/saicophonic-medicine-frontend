import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import $ from "jquery"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Sidebar from './Sidebar';
import VideoContainer from './VideoContainer';


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
      {/* <!-- Wrapper --> */}
      <div id="wrapper">
        <Sidebar />
        {/* render video container with map */}
        {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <Container fluid>
            {/* <Row> */}
              <VideoContainer />
            {/* </Row> */}
          </Container>
        </div>
        {/* <!-- /#page-content-wrapper --> */}
      </div>
      {/* <!-- /#wrapper --> */}
      </>
    )
  }
}


export default MyNavbar