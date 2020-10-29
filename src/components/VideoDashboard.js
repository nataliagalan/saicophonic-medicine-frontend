import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';

import Container from 'react-bootstrap/Container';
import VideoContainer from './VideoContainer';
// import $ from 'jquery';

class VideoDashboard extends Component {

  componentDidMount() {
    this.fetchVideos()
    const token = localStorage.getItem('myAppToken') 
    if(token){
      this.fetchUser()
    } 
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

  render() {
    // console.log(this.props.videos);
    return (
      <div className="page-content-wrapper">
        <div className="dashboard-header">
          <h1 className="header-text">Saicophonic Medicine</h1>
          <h5 className="header-subtext">An expanding library of live music sessions</h5>
        </div>
        <Container fluid>
          {
            // [...this.props.videos].reverse().map((video) => {
            this.props.videos.map((video) => {
              return <VideoContainer
                video={video}
                key={video.id}
               />
              })
          }
        </Container>
      </div>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    auth: state.auth
  };
};

const setDispatchToProps = {
  currentUser,
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);