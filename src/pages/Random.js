import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteVideo } from "../actions/videos";
import { getVideo } from "../actions/video";
import { currentUser } from '../actions/auth';


import Container from 'react-bootstrap/Container';
import VideoCard from '../components/VideoCard';

class Random extends Component {

  componentDidMount(){
    this.fetchVideo()

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

  fetchVideo = async () => {
    const res = await fetch(`http://localhost:3001/api/v1/random`);
    const videoToShow = await res.json();
    this.props.getVideo(videoToShow);
    this.props.history.push(`/videos/${videoToShow.id}`)
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
    video: state.video,
    auth: state.auth
  };
};

const setDispatchToProps = {
  deleteVideo,
  getVideo,
  currentUser
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Random));