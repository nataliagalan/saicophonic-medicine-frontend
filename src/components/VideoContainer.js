import React, { Component } from 'react'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import Card from 'react-bootstrap/Card';
// import CardGroup from 'react-bootstrap/CardGroup';

import VideoCard from './VideoCard';
import LyricsCard from './LyricsCard';
import Line from './Line';


class VideoContainer extends Component {

  render() {
    return (
      <>
        <Row>
          <Col sm={8}>
            <VideoCard />
          </Col>
          <Col sm={4}>
            <LyricsCard />
          </Col>
        </Row>
        <Line color="black" />
      </>
    )
  }
}


export default VideoContainer 