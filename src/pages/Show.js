import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteVideo } from "../actions/videos";
import { getVideo } from "../actions/video";
import { currentUser } from '../actions/auth';

import VideoContainer from '../components/VideoContainer';
import Container from 'react-bootstrap/Container';
import VideoCard from '../components/VideoCard';

class Show extends Component {

  componentDidMount(){
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[2]);
    const { videos } = this.props;
    const video = videos.find((video) => video.id === id);
    if(!video){
      this.fetchVideo(id)
    }

    const token = localStorage.getItem('myAppToken') 
    if(token){
      this.fetchUser()
    } 
  }

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

  fetchVideo = async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`);
    const videoToShow = await res.json();
    this.props.getVideo(videoToShow);
  }
  
  render() {
    const { video } = this.props;
    return (
      <>
        {
          <div className="page-content-wrapper">
            <br></br>
          <Container fluid>
            {
            (video === []) ?
              null
              :
              <VideoCard {...video} />
            }
          </Container>
          </div>
        }
      </>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    video: state.video,
    auth: state.auth
  };
};

const setDispatchToProps = {
  deleteVideo,
  getVideo,
  currentUser
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Show));