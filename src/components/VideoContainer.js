import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import VideoCard from './VideoCard';
import Line from './Line';
import SongContainer from './SongContainer';


const VideoContainer = (props) => {
  //keep local state here for selected video
  //props.video.songs[0].timestamp - value of first stamp by default
 
 
    // console.log(props.video, "inside video container");
    return (
      <>
        <Row>
          <Col sm={8}>
            <VideoCard 
              {...props.video}/>
          </Col>
          <Col sm={4}>
            <SongContainer {...props.video}/>
          </Col>
        </Row>
        <Line color="black" />
      </>
    )

}


export default VideoContainer