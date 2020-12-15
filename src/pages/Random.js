import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { deleteVideo } from "../actions/videos";
import { thunkFetchVideo } from "../actions/video";
import { thunkFetchUser } from '../actions/auth';
import Container from 'react-bootstrap/Container';
import VideoCard from '../components/VideoCard';

class Random extends Component {

  componentDidMount(){
    this.props.thunkFetchVideo()
    const token = localStorage.getItem('myAppToken') 
    // if(token){
      this.props.thunkFetchUser()
    // } 
  }
  
  render() {
    const { video } = this.props;
    return (
      <>
        {
          <div className="page-content-wrapper" id='random'>
            <br></br>
          <Container fluid >
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
  thunkFetchUser,
  thunkFetchVideo,
  deleteVideo
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Random));