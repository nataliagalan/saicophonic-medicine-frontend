import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { logoutSuccess } from '../actions/auth'
import { toggleGrid } from '../actions/toggleGrid'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import logo from '../logo.png'
import SearchForm from './SearchForm';

const MyNavbar = (props) => {
    //useSelector is similar to setStateToProps
    const auth = useSelector(state => state.auth);
    // const showGrid = useSelector(state => state.toggleGrid);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();

   

    const handleLogout = () => {
      localStorage.removeItem('myAppToken')
      dispatch(logoutSuccess())
    }
    const handleToggleGrid = () => {
      // console.log(props,"==========CLICKED==========");
      dispatch(toggleGrid())
    }
    
    // console.log(showGrid,"==========MY NAVBAR PROPS==========");

    return (
      <>

    <Navbar fluid="true" collapseOnSelect expand="lg" className="nav-bg" fixed="top" >

      <Container fluid >
        <Navbar.Brand as={Link} to="/videos" href="/videos">
          <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} alt="logo that looks like a yin yang symbol inside a pill"/> 
        </Navbar.Brand>
        <Nav.Item> 
          <SearchForm /> 
        </Nav.Item>
        <Nav.Item style={{cursor: 'pointer'}} onClick={handleToggleGrid}> 
          <span role="img" id="toggle-grid-btn" aria-label="toggle grid">🏁</span> 
        </Nav.Item>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />
      </Container>
  
      <Container fluid >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <Nav.Link href="/videos/new" id="menu-toggle">ADD VIDEO +</Nav.Link> */}
            <Nav.Link 
              as={Link} 
              to="/random"
              href="/random" 
              id="menu-toggle" 
              className="nav-font-style">
                Random
            </Nav.Link>
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

