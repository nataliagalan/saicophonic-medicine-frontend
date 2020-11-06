import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { logoutSuccess } from '../actions/auth'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import logo from '../logo.png'
import SearchForm from './SearchForm';

const MyNavbar = (props) => {
    //useSelector is similar to setStateToProps
    const auth = useSelector(state => state.auth);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();

    const handleLogout = () => {
      localStorage.removeItem('myAppToken')
      dispatch(logoutSuccess())
    }
    // console.log(props,"==========MY NAVBAR PROPS==========");

    return (
      <>

    <Navbar fluid="true" collapseOnSelect expand="lg" className="nav-bg" fixed="top" >

      <Container fluid >
        <Navbar.Brand as={Link} to="/videos" href="/videos">
          <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} /> 
        </Navbar.Brand>
        <Nav.Item> 
          <SearchForm /> 
        </Nav.Item>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />
      </Container>
  
      <Container fluid >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="/videos/new" id="menu-toggle">ADD VIDEO +</Nav.Link> */}
            <Nav.Link 
              as={Link} 
              to="/videos/new"
              href="/videos/new" 
              id="menu-toggle" 
              className="nav-font-style">
                Add Video
              </Nav.Link>
          {
            (auth.id) ?
            (<Nav.Link 
              as={Link}
              to='/admin' 
              href='/admin'
              id="menu-toggle" className="nav-font-style"
              onClick={ handleLogout }>
              Logout
            </Nav.Link>)
            : 
            (<Nav.Link as={Link} to='/admin' href='/admin' id="menu-toggle" className="nav-font-style" >
              Login
            </Nav.Link>)
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
          
    </Navbar>
 
      </>
    );
  
}

export default MyNavbar

