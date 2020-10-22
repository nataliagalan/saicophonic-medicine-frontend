import React, { Component } from 'react'
import { connect } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import VideoCard from './VideoCard';
import LyricsCard from './LyricsCard';
import Line from './Line';
import SongContainer from './SongContainer';


class VideoContainer extends Component {
  //keep local state here for selected video
  //this.props.video.songs[0].timestamp - value of first stamp by default

  render() {
    
    // console.log(this.props.video, "inside video container");
    return (
      <>
        <Row>
          <Col sm={8}>
            <VideoCard {...this.props.video}/>
          </Col>
          <Col sm={4}>
            <SongContainer {...this.props.video} />
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