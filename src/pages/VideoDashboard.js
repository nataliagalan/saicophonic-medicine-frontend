import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import VideoContainer from './VideoContainer';


class VideoDashboard extends Component {

  componentDidMount() {
    const token = localStorage.getItem('myAppToken') 
    if(!token){
      this.fetchVideos()
    } else {
      this.fetchUser()
    }
    this.fetchVideos()
  }

  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
    this.props.getVideos(videos);
  };

  fetchUser = async () => {
    const token = localStorage.getItem('myAppToken') 
    const reqObj = {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    const res = await fetch('http://localhost:3001/api/v1/current_user', reqObj);
    const data = await res.json();
    if(data.error) {
      this.props.history.push('/admin')
    } else {
      //need to store the user (data) in store state
      this.props.currentUser(data)
    }
  }

  displayFilterTabs = () => {
    return (
      <Nav fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Nav.Link 
            eventKey="all"
            title="all"
            onClick={() => this.handleTabClick("all") }
          >
              All({this.props.filteredByAll.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            // onClick={() => this.findVideos("bands")}
            onClick={() => this.handleTabClick("bands") }
            title="bands"
            // eventKey="link-2">Artist/Bands({this.props.bands})</Nav.Link>
            eventKey="band">Artist/Bands({this.props.filteredByBand.bands.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.handleTabClick("songs")}
            title="songs"
            eventKey="songs">Songs({this.props.filteredBySong.songs.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.handleTabClick("lyrics")}
            title="lyrics"
            eventKey="lyrics">Lyrics({this.props.filteredBySong.songs.length})</Nav.Link>
        </Nav.Item>
      </Nav> )
  }

  findVideos = () => {
    switch (this.props.filter) {
      case "none":
        return this.props.videos
      case "all":
        return this.props.filteredByAll
      case "bands":
        return this.props.filteredByBand.bands 
      case "songs":
        return this.props.filteredBySong.songs
      case "lyrics":
        return this.props.filteredByLyrics.lyrics
      default:
        return this.props.videos
    }
  }

  handleTabClick = (tab) => {
 
    this.props.setFilter(tab)

  }


  render() {
    const videosToDisplay = this.findVideos()
    // console.log(this.props, "======VIDEO DASHBOARD=====");
    return (
      <Container fluid>
      <div className="page-content-wrapper">
        <div className="dashboard-header">
          <h1 className="header-text">Saicophonic Medicine</h1>
          <h5 className="header-subtext">An expanding library of live music sessions</h5>
        </div>
        {/* {this.displayFilterTabs()} */}
        {this.props.showTabs === "true" ? this.displayFilterTabs() : null}
        <VideoContainer videos={videosToDisplay} />
      </div>
      </Container>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    filteredByAll: state.filteredByAll,
    filteredByBand: state.filteredByBand,
    filteredBySong: state.filteredBySong,
    filteredByLyrics: state.filteredByLyrics,
    filter: state.setFilter,
    showTabs: state.toggleTabs.showTabs,
    //note to self: naming the key setFilter here will not work because the props already have a key called setFilter pointing to the reducer
    //setFilter: state.setFilter,
    auth: state.auth
  };
};

const setDispatchToProps = {
  currentUser,
  getVideos,
  setFilter,
  toggleTabs
  
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);