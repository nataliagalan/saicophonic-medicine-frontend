import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logoutSuccess } from '../actions/auth'
import { toggleGrid } from '../actions/toggleGrid'

import '../MyNavbar.css'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import logo from '../logo.png'
import SearchForm from './SearchForm';
import GridIcon from './GridIcon';
import { OrganizationIcon, ThreeBarsIcon } from '@primer/octicons-react'

const MyNavbar = (props) => {
    //useSelector is similar to setStateToProps
    const auth = useSelector(state => state.auth);
    const video = useSelector(state => state.video);
    const showGrid = useSelector(state => state.toggleGrid);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();

   

    const handleLogout = () => {
      localStorage.removeItem('myAppToken')
      dispatch(logoutSuccess())
    }
    const handleToggleGrid = () => {
      dispatch(toggleGrid())
    }
    


    return (
    <Navbar bg="light" expand="md" fixed="top">
      <Navbar.Brand as={Link} to="/videos" href="/videos">
        <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} alt="logo that looks like a yin yang symbol inside a pill"/> 
      </Navbar.Brand>
      <Nav.Item inline="true"> 
        <SearchForm /> 
      </Nav.Item>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {
            video.id && props.location.pathname !== "/videos" ? 
            null
            :
            (
            showGrid ? 
            (<Nav.Link id="toggle-grid-btn" style={{cursor: 'pointer'}} onClick={handleToggleGrid}> 
              <span style={{color: "black"}}><ThreeBarsIcon size={16} /></span> 
            </Nav.Link>)
            :
            (<Nav.Link id="toggle-grid-btn" style={{cursor: 'pointer'}} onClick={handleToggleGrid}><GridIcon color={"black"}/></Nav.Link>)
            )
          }
          <Nav.Link 
            as={Link} 
            to="/videos"
            href="/videos" 
            id="menu-toggle" 
            className="nav-font-style">
            Videos
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/random"
            href="/random" 
            id="menu-toggle" 
            className="nav-font-style">
            Random
          </Nav.Link>
          {
            auth.id && (<Nav.Link 
              as={Link} 
              to="/videos/new"
              href="/videos/new" 
              id="menu-toggle" 
              className="nav-font-style">
                Add
            </Nav.Link>)
          }

        </Nav>

      </Navbar.Collapse>
    </Navbar>
    );
  
}

export default withRouter(MyNavbar);



