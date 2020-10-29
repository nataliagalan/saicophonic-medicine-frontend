
import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import { deleteVideo } from "../actions/videos";
import { togglePlayVideo } from "../actions/videos";

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const LyricsCard = (props) => {

    //useSelector is similar to setStateToProps
    const videos = useSelector(state => state.videos);
    const auth = useSelector(state => state.auth);
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
    // const payload = "uuuuh lala"
    // console.log(props, "lyricscarddddddddddddd");

    return (
      <Accordion >
          {/* {on click event that setStates the selected song} */}

          {
            //first time around songs are undefined. if that's the case, don't do anything. else, iterate over songs
            !songs ?
            null
            :
            songs.map((song, i) => {
              return (
              <Card 
              className="song-accordion"
              key={i}> 
                <Accordion.Toggle
                
                  style={{cursor: 'pointer'}} 
                  // onClick={ (e) => props.please(e.target.innerText.split(' - ')[0]) } 
                  // onClick={ (e) => dispatch(togglePlayVideo(e.target.innerText.split(' - ')[0])) } 
                  as={Card.Header} 
                  eventKey={i + 1}>
                    <Row>
                    <Col>
                    <Button 
                      onClick={ (e) => props.handlePlay(e.target.innerText) } 
                      className="accordion-time-title"> {song.timestamp} </Button>
                    <Button className="accordion-time-title">{song.title}</Button>
                    </Col>
                    </Row>
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

          <Card> 

            <Accordion.Toggle
             className="plus-accordion"
              style={{cursor: 'pointer'}} 
              as={Card.Header} 
              eventKey="1">
              +
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
            <Card.Body className="plus-accordion">
            <Row>
            <Col>
          {
          (auth.id) ?
            (<><Button
              style={{border: 'none'}} 
              as={Link} 
              to={`/videos/edit/${id}`}>✏️</Button>
            <Button 
              style={{border: 'none'}}
              // as={Link} 
              onClick={() => delVideo(id)}
              >🗑</Button></>)
            : 
            null
          }
          {/* display share button and tags here  */}
            </Col>
          </Row>
              </Card.Body>
            </Accordion.Collapse>

          </Card>



          
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