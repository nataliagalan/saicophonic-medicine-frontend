import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from "react-router-dom";
import { toggleGrid } from '../actions/toggleGrid'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';
import logo from '../logo.png'
import SearchForm from './SearchForm';
import GridIcon from './GridIcon';
import { ThreeBarsIcon, TelescopeIcon, XIcon } from '@primer/octicons-react'

const MyNavbar = (props) => {
    //useSelector is similar to setStateToProps
    const auth = useSelector(state => state.auth);
    const video = useSelector(state => state.video);
    const showGrid = useSelector(state => state.toggleGrid);
    const showTabs = useSelector((state) => state.toggleTabs.showTabs);
    const filter = useSelector((state) => state.setFilter);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();

    const [ expanded, setExpanded ] = useState(true);

    const handleToggleGrid = () => {
      dispatch(toggleGrid())
    }

    const toggleMenuIcon = () => {
      setExpanded(!expanded)
    }

    const clearSearch = () => {
      console.log("clear search");
      if(filter !== 'none'){
        dispatch(setFilter('none'));
        dispatch(toggleTabs('false'));
      }
			// props.toggleTabs('false');
    }

    return (
    <Navbar 
      onToggle={toggleMenuIcon} 
      collapseOnSelect
      expand="md" className="nav-bg"
      fixed="top">
      <Navbar.Brand as={Link} to="/videos" href="/videos" onClick={clearSearch}>
        <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} alt="logo that looks like a yin yang symbol inside a pill"/> 
      </Navbar.Brand>
      <Nav.Item inline="true"> 
        <SearchForm /> 
      </Nav.Item>
      <Navbar.Toggle
        id="menu-toggle-btn" 
        aria-controls="basic-navbar-nav">
          { expanded ? <TelescopeIcon size={24} /> : <XIcon size={24} /> }
      </Navbar.Toggle>

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto" id="menu-div">
          {
            props.location.pathname.includes("/videos/") ? 
            null
            :
            (
            showGrid ? 
            (<Nav.Link id="toggle-grid-btn" onClick={handleToggleGrid} > 
              <span className="toggle-grid-btn"><ThreeBarsIcon size={16} /></span> 
            </Nav.Link>)
            :
            (<Nav.Link id="toggle-grid-btn" onClick={handleToggleGrid}><span className="toggle-grid-btn"><GridIcon /></span></Nav.Link>)
            )
          }
          <Nav.Link 
            as={Link} 
            to="/videos"
            href="/videos" 
            id="menu-toggle"
            onClick={clearSearch} 
            className="nav-font-style">
            Videos
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/random"
            href="/random" 
            id="menu-toggle"
            onClick={clearSearch} 
            className="nav-font-style">
            Random
          </Nav.Link>
          {
            auth.id && (<Nav.Link 
              as={Link} 
              to="/videos/new"
              href="/videos/new" 
              id="menu-toggle" 
              onClick={clearSearch}
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



