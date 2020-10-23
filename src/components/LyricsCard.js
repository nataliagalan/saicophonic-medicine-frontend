
import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import { deleteVideo } from "../actions/videos";
import { togglePlayVideo } from "../actions/videos";

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const LyricsCard = (props) => {

    //useSelector is similar to setStateToProps
    const videos = useSelector(state => state.videos);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();

  const delVideo =  async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === 200) {
      const updatedVideos = videos.filter((video) => video.id !== id);
      dispatch(deleteVideo(updatedVideos));
    }
  };

  
    const { id, songs } = props
    const payload = "uuuuh lala"

    return (
      <Accordion >
          {/* {on click event that setStates the selected song} */}

          {
            songs.map((song, i) => {
              return (
              <Card key={i}> 
                <Accordion.Toggle
                  onClick={ () => dispatch(togglePlayVideo(payload)) } 
                  as={Card.Header} 
                  eventKey={i + 1}>
                  {song.timestamp} - {song.title}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={i + 1}>
                <Card.Body style={{textAlign: "left"}} style={{whiteSpace: "pre-line"}}>
                  {song.lyrics} 
                  </Card.Body>
                </Accordion.Collapse>
        {/* <button onClick={(e) => this.props.handlePlayPause(e, songs)} > */}
          {/* 24 */}
          {/* {playing ? 'Pause' : 'Play'} */}
        {/* </button> */}
              </Card>
              )
            })
          }

          {/* Edit and Delete buttons */}
          <Row>
            <Col>
              <Button 
                as={Link} 
                to={`/videos/edit/${id}`}>✏️</Button>
              <Button 
                as={Link} 
                onClick={() => delVideo(id)}
                >🗑</Button>
            </Col>
          </Row>
      </Accordion>
    )
  
}


export default LyricsCard

// const setStateToProps = (state) => {
//   return {
//     videos: state.videos
//   };
// };

// const setDispatchToProps = {
//   deleteVideo
// };

// export default withRouter(connect(setStateToProps, setDispatchToProps)(LyricsCard));