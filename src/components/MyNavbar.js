import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

const MyNavbar = () => {

    return (
      <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Link to="/videos">Logo</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="/videos/new" id="menu-toggle">ADD VIDEO +</Nav.Link> */}
            <Link to="/videos/new" id="menu-toggle">ADD VIDEO +</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    );
  
}

export default MyNavbar

