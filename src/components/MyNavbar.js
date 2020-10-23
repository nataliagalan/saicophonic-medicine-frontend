import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import logo from '../logo.png'

const MyNavbar = () => {

    return (
      <>
      <Navbar collapseOnSelect expand="lg" className="nav-bg" fixed="top" >
        {/* <Link to="/videos">Logo</Link> */}
        <Navbar style={{cursor: 'pointer'}}>
        <Link to="/videos">
        <Navbar.Brand><img src={logo} style={{maxWidth: '80px'}} /></Navbar.Brand>
        </Link>
        </Navbar>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="/videos/new" id="menu-toggle">ADD VIDEO +</Nav.Link> */}
            <Link to="/videos/new" id="menu-toggle" className="nav-font-style">Add Video +</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      </>
    );
  
}

export default MyNavbar

