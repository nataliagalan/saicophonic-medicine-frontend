import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import $ from 'jquery';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Sidebar from './Sidebar';
import VideoContainer from './VideoContainer';
import { getVideos } from '../actions/videos';


class MyNavbar extends Component {

  componentDidMount() {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.fetchVideos()
  }

  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
    this.props.getVideos(videos);
  };

  render() {
console.log(this.props.videos, "inside myNavbar");


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
        {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <Container fluid>
            {
            this.props.videos.map((video) => {
              return <VideoContainer
                video={video}
                key={video.id}
               />
              }
            )
            }
          </Container>
        </div>
        {/* <!-- /#page-content-wrapper --> */}
      </div>
      {/* <!-- /#wrapper --> */}
      </>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos
  };
};

const setDispatchToProps = {
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(MyNavbar);