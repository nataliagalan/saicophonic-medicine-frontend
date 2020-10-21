import React, { Component } from 'react'
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import VideoCard from './VideoCard';
import LyricsCard from './LyricsCard';
import Line from './Line';


class VideoContainer extends Component {

  render() {
    // console.log(this.props.video, "inside video container");
    return (
      <>
        <Row>
          <Col sm={8}>
            <VideoCard {...this.props.video}/>
          </Col>
          <Col sm={4}>
            <LyricsCard {...this.props.video}/>
          </Col>
        </Row>
        <Line color="black" />
      </>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos
  }
}

// const setDispatchToProps = {
  // deleteVideo
// }

export default connect(setStateToProps, null)(VideoContainer);