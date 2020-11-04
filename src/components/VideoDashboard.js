import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import VideoContainer from './VideoContainer';
// import $ from 'jquery';

class VideoDashboard extends Component {

  //THIS IS THE CHILD OF SEARCH RESULTS


  state = {
    filteredVideos: [],
    query: "",
  }

  componentDidMount() {
    if(this.props.resultCount){
      this.props.fetchVideos(this.props.query, "all")
    } else {
      this.fetchVideos()
    }
    
    const token = localStorage.getItem('myAppToken') 
    if(token){
      this.fetchUser()
    } 
  }


  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
    // this.props.getVideos(videos, "all");
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

  // countResults = (key) => {
  //   this.setState({
  //     [key]: this.props.videos.length
  //   })
  // }
  
  displayFilterTabs = () => {
    // console.log(this.props.query, "============query video dashboard===========");
    const { query } = this.props
    return (
      <Nav fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Nav.Link 
            eventKey="all"
            title="all"
            onClick={() => this.props.fetchVideos(query, "all")}
          >
              All({this.props.allCount})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.props.fetchVideos(query, "band")}
            title="band"
            // eventKey="link-2">Artist/Bands({this.props.bands})</Nav.Link>
            eventKey="band">Artist/Bands({this.props.bandCount})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.props.fetchVideos(query, "songTitle")}
            title="songTitle"
            eventKey="songTitle">Songs({this.props.songCount})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.props.fetchVideos(query, "songLyrics")}
            title="songLyrics"
            eventKey="songLyrics">Lyrics({this.props.lyricsCount})</Nav.Link>
        </Nav.Item>
      </Nav> )
  }

  


  render() {
    // console.log(this.props, "======VIDEO DASHBOARD=====");
    return (
      <div className="page-content-wrapper">
        <div className="dashboard-header">
          <h1 className="header-text">Saicophonic Medicine</h1>
          <h5 className="header-subtext">An expanding library of live music sessions</h5>
        </div>
        {
          this.props.resultCount ?
          (<><h3>{this.props.resultCount}</h3><br></br></>)
          :
          (null)
        }
        {/* <Container fluid> */}
        <>
        {
          this.props.resultCount ?
          (this.displayFilterTabs())
          :
          (null)
        }
          
        </>
          {
           
            this.props.videos.map((video) => {
              return <VideoContainer
                video={video}
                key={video.id}
               />
              })
          }
        {/* </Container> */}
      </div>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    // videos: state.videos.videos,
    // all: state.videos.all,
    // bands: state.videos.bands,
    // songs: state.videos.songs,
    // lyrics: state.videos.lyrics,
    auth: state.auth
  };
};

const setDispatchToProps = {
  currentUser,
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);