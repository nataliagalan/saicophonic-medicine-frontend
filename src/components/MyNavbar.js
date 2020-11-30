import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toggleGrid } from '../actions/toggleGrid';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from 'react-router-dom';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';
import logo from '../logo.png';
import SearchForm from './SearchForm';
import GridIcon from './GridIcon';
import { ThreeBarsIcon, ListUnorderedIcon, XIcon } from '@primer/octicons-react';

const MyNavbar = (props) => {
	//useSelector is similar to setStateToProps
	const auth = useSelector((state) => state.auth);
	const video = useSelector((state) => state.video);
	const showGrid = useSelector((state) => state.toggleGrid);
	const showTabs = useSelector((state) => state.toggleTabs.showTabs);
	const filter = useSelector((state) => state.setFilter);
	//useDispatch is similar to setDispatchToProps
	const dispatch = useDispatch();

	const [expanded, setExpanded] = useState(true);

	const handleToggleGrid = () => {
		dispatch(toggleGrid());
	};

	const toggleMenuIcon = () => {
		setExpanded(!expanded);
	};

	const clearSearch = () => {
		if (filter !== 'none') {
			dispatch(setFilter('none'));
			dispatch(toggleTabs('false'));
		}
	};

	const handleRandom = () => {
		props.history.push(`/random`);
		if (filter !== 'none') {
			dispatch(setFilter('none'));
			dispatch(toggleTabs('false'));
		}
	};

	return (
		<Navbar onToggle={toggleMenuIcon} collapseOnSelect expand='md' className={!expanded ? 'expanded-nav-bg' : 'nav-bg'} fixed='top'>
			<Navbar.Brand as={Link} to='/' href='/' onClick={clearSearch}>
				<img src={logo} className='imgFluid saicophonic-logo' style={{ maxWidth: '50px' }} alt='logo that looks like a yin yang symbol inside a pill' />
			</Navbar.Brand>
			<Nav.Item inline='true'>
				<SearchForm />
			</Nav.Item>
			<Navbar.Toggle id='menu-toggle-btn' aria-controls='basic-navbar-nav'>
				{expanded ? <ThreeBarsIcon size={24} /> : <XIcon size={24} />}
			</Navbar.Toggle>

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto' id='menu-div'>
					{props.location.pathname.includes('/videos/') ? null : showGrid ? (
						<OverlayTrigger key='left' placement='left' overlay={<Tooltip id={`tooltip-left`}>Switch to list view</Tooltip>}>
							<Nav.Link id='toggle-grid-btn' onClick={handleToggleGrid} href='#video-dashboard'>
								<span className='toggle-grid-btn'>
									<ListUnorderedIcon size={16} />
								</span>
							</Nav.Link>
						</OverlayTrigger>
					) : (
						<OverlayTrigger key='left' placement='left' overlay={<Tooltip id={`tooltip-left`}>Switch to grid view</Tooltip>}>
							<Nav.Link id='toggle-grid-btn' onClick={handleToggleGrid} href='#video-dashboard'>
								<span className='toggle-grid-btn'>
									<GridIcon />
								</span>
							</Nav.Link>
						</OverlayTrigger>
					)}
					<Nav.Link as={Link} to='/' href='/' id='menu-toggle' onClick={clearSearch} className='nav-font-style'>
						Videos
					</Nav.Link>
					<Nav.Link href='#random' id='menu-toggle' onClick={handleRandom} className='nav-font-style'>
						Random
					</Nav.Link>
					{auth.id && (
						<Nav.Link as={Link} to='/new' href='/new' id='menu-toggle' onClick={clearSearch} className='nav-font-style'>
							Add
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default withRouter(MyNavbar);
