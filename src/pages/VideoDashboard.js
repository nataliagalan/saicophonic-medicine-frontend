import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';
import { setFilter } from '../actions/setFilter';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

// import VideoCard from '../components/VideoCard';
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
            eventKey="songs">Songs({this.props.songCount})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.handleTabClick("lyrics")}
            title="lyrics"
            eventKey="lyrics">Lyrics({this.props.lyricsCount})</Nav.Link>
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
      default:
        return this.props.videos
    }
  }

  handleTabClick = (tab) => {
 
    this.props.setFilter(tab)

  }

  render() {
    const videosToDisplay = this.findVideos()
    // const videosToDisplay = this.props.videos
    // console.log(this.props, "======VIDEO DASHBOARD=====");
    return (
    
      <div className="page-content-wrapper">
        <div className="dashboard-header">
          <h1 className="header-text">Saicophonic Medicine</h1>
          <h5 className="header-subtext">An expanding library of live music sessions</h5>
        </div>
        {this.displayFilterTabs()}
        <VideoContainer videos={videosToDisplay} />
      </div>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    filteredByAll: state.filteredByAll,
    filteredByBand: state.filteredByBand,
    filter: state.setFilter,
    auth: state.auth
  };
};

const setDispatchToProps = {
  currentUser,
  getVideos,
  setFilter
  
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);