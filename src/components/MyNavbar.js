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
<Container fluid >

      <Navbar collapseOnSelect expand="lg" className="nav-bg" fixed="top" >

          <Link to="/videos">
            <Navbar.Brand><img src={logo} className="imgFluid" style={{maxWidth: '50px'}} /> </Navbar.Brand>
          </Link>
   
          <SearchForm  />
        
          <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />
  
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="/videos/new" id="menu-toggle">ADD VIDEO +</Nav.Link> */}
            <Link to="/videos/new" id="menu-toggle" className="nav-font-style">Add Video</Link>
          {
            (auth.id) ?
            (<Link 
              to='/admin' 
              id="menu-toggle" className="nav-font-style"
              onClick={ handleLogout }>
              Logout
            </Link>)
            : 
            (<Link to='/admin' id="menu-toggle" className="nav-font-style" >
              Login
            </Link>)
          }
          </Nav>
        </Navbar.Collapse>

          
      </Navbar>
 
</Container>
      </>
    );
  
}

export default MyNavbar

