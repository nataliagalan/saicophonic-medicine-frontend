import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteVideo } from "../actions/videos";
import { getVideo } from "../actions/video";
import { currentUser } from '../actions/auth';
import { toggleGrid } from '../actions/toggleGrid'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import VideoCard from '../components/VideoCard';

class Show extends Component {

  componentDidMount(){
    if(this.props.showGrid){
      this.props.toggleGrid()
    }
    const id = parseInt(this.props.match.params.id);

    this.fetchVideo(id)
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
          <Container fluid>
          <div className="new-and-edit-video-page">
            <br></br>
            {
            (video === []) ?
              null
              :
              <Row><VideoCard {...video} /></Row>
            }
          </div>
          </Container>
        }
      </>
    )
  }
}

const setStateToProps = (state) => {
  return {
    video: state.video,
    auth: state.auth,
    showGrid: state.toggleGrid
  };
};

const setDispatchToProps = {
  deleteVideo,
  getVideo,
  currentUser,
  toggleGrid
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Show));