import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteVideo } from "../actions/videos";
import VideoContainer from '../components/VideoContainer';
import Container from 'react-bootstrap/Container';

class Show extends Component {
  
  render() {
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[2]);
    const { videos } = this.props;
    const video = videos.find((video) => video.id === id);

    return (
      <>
        {
        video === undefined ? (
          <h2>Video not found</h2>
        ) : (
          <div className="page-content-wrapper">
            <br></br>
          <Container fluid>
            <VideoContainer
                video={video}
                key={video.id}
               />
          </Container>
          </div>
        )}
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
  deleteVideo
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Show));