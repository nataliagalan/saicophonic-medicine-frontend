
import React, {useState} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import { deleteVideo } from "../actions/videos";

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tags from './Tags';
import { TrashIcon, PencilIcon, ShareIcon, RocketIcon } from '@primer/octicons-react'


const LyricsCard = (props) => {

    //useSelector is similar to setStateToProps
    const videos = useSelector(state => state.videos);
    const auth = useSelector(state => state.auth);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

  const delVideo =  async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    const updatedVideos = videos.filter((video) => video.id !== id);
    dispatch(deleteVideo(updatedVideos));
    props.history.push('/videos');
    // if (data.status === 200) {
    //   const updatedVideos = videos.filter((video) => video.id !== id);
    //   dispatch(deleteVideo(updatedVideos));
    //   props.history.push('/videos');
    // }
    
  };

  const copyUrlToClipboard = (id) => {
    let base = window.location.origin.toString()
    navigator.clipboard.writeText(`${base}/videos/${id}`)
    setShow(true);
  }


  
    const { id, songs, tags } = props
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
            <Card.Body 
              className="overflow-auto"
              scrollable="true"
              style={{whiteSpace: "pre-line"}}>
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

  <Card className="plus-accordion-card"> 
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
        {/* <Col> */}
        
          <Tags tags={tags}/>
        {/* </Col> */}
      </Row>

      <Row>
        <Col>
          {
          (auth.id) ?
            (<><Button
              className="lyrics-card-icons"
              as={Link} 
              to={`/videos/edit/${id}`}>
                <span role="img" aria-label="edit">
                  <PencilIcon size={24} />
                </span>
              </Button>
            <Button 
            className="lyrics-card-icons"
              // as={Link} 
              onClick={() => delVideo(id)}>
                <span role="img" aria-label="delete">
                  <TrashIcon size={24} />
                </span>
            </Button></>)
            : 
            null
          }
          <Button 
          className="lyrics-card-icons"
          onClick={() => copyUrlToClipboard (id)}>
            <span role="img" aria-label="share">
              <ShareIcon size={24} />
            </span>
          </Button>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="copy-success"
            >
            <Modal.Header >
              <Container fluid>
              <Modal.Title id="copy-success" >
              <div className="justify-content-md-center text-center"><RocketIcon size={24} /><span>&nbsp;&nbsp;</span>Url copied to clipboard!</div>
              </Modal.Title>
              </Container>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
          </Modal>

        </Col>
      </Row>


        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Accordion>
  )
}


export default withRouter(LyricsCard)
