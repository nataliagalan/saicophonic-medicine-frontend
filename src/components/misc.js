
import React, {useState} from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

import { deleteVideo } from "../actions/videos";
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Container from 'react-bootstrap/Container'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tags from './Tags';
import { TrashIcon, PencilIcon, ShareIcon, RocketIcon, MuteIcon, UnmuteIcon, DashIcon, ChevronDownIcon } from '@primer/octicons-react'


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
    if (data.status === 200) {
    const updatedVideos = videos.filter((video) => video.id !== id);
    dispatch(deleteVideo(updatedVideos));
    props.history.push('/videos');
    }
  };

  const copyUrlToClipboard = (id) => {
    let base = window.location.origin.toString()
    navigator.clipboard.writeText(`${base}/videos/${id}`)
    setShow(true);
  }

  // const handleShowLyrics = (e) => {
  //   e.stopPropagation();
  // }
  const [open, setOpen] = useState(false);
  const handleShowLyrics = useAccordionToggle(2, (e, eKey) =>{
  // console.log('totally custom!')
  e.stopPropagation();
  setOpen(!open);
  }

);

  const { id, songs, tags } = props

  return (
    <>
  <Accordion >
    <Card className="song-accordion"
          key="999">
    <Accordion.Toggle
      className="song-accordion"
      style={{cursor: 'pointer'}} 
      as={Card.Header} 
      eventKey="999">
      <span style={{color: "#EBDFF7"}}>+</span>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="999">
    <Card.Body >
    
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
              className="text-left"
              style={{cursor: 'pointer'}} 
              as={Card.Header} 
              eventKey={i + 1}>
                <Row>
                <Col>
                {props.playing ? 
                (<span className="toggle-grid-btn"><MuteIcon size={16} /></span>) 
                : 
                (<span className="toggle-grid-btn"><UnmuteIcon size={16} /></span>)}
                <Button 
                  onClick={ (e) => props.handlePlay(e) } 
                  className="accordion-time-title">
                     {song.timestamp} </Button><span className="toggle-grid-btn"><DashIcon size={12} /></span>
                <Button 
                  onClick={ (e) => handleShowLyrics(e, i + 1) } 
                  aria-expanded={open}
                  className="accordion-time-title song-title">{song.title}</Button>
                </Col>
                </Row>
            </Accordion.Toggle>
            <Accordion.Collapse in={open} eventKey={i + 1}>
            {/* <Collapse in={open} eventKey={i + 1}> */}
            <Card.Body 
              className="overflow-auto accordion-lyrics"
              scrollable="true"
              style={{whiteSpace: "pre-line"}}>
              {/* <div
                className="overflow-auto accordion-lyrics"
                scrollable="true"
                style={{whiteSpace: "pre-line"}}
              > */}
              {song.lyrics} 
              {/* </div> */}
              </Card.Body>
            {/* </Collapse> */}
            </Accordion.Collapse>
          </Card>
          )
        })
      }
      </Card.Body>          
    </Accordion.Collapse>
  </Card>
  </Accordion >

  <Accordion >
  {/* Edit and Delete buttons */}
  <Card className="plus-accordion-card"> 
    <Accordion.Toggle
      className="plus-accordion"
      style={{cursor: 'pointer'}} 
      as={Card.Header} 
      eventKey="1">
      <span style={{color: "#EBDFF7"}}><ChevronDownIcon size={16} /></span>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
    <Card.Body className="plus-accordion">
                        
      <Row>
        <div className="tags-wrapper" id="tags-wrapper">
          <Tags tags={tags}/>
        </div>
      </Row>

      <Row>
        <Col>
          {
          (auth.id) ?
            (<>
            <Button
              className="lyrics-card-icons"
              as={Link} 
              to={`/videos/edit/${id}`}>
              <span role="img" aria-label="edit">
                <PencilIcon size={24} />
              </span>
            </Button>
            <Button 
            className="lyrics-card-icons"
              onClick={() => delVideo(id)}>
              <span role="img" aria-label="delete">
                <TrashIcon size={24} />
              </span>
            </Button>
            </>)
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
            aria-labelledby="copy-success">
            <Modal.Header >
              <Container fluid>
              <Modal.Title id="copy-success" >
              <div className="justify-content-md-center text-center">
                <RocketIcon size={24} />
                <span>&nbsp;&nbsp;</span>Link copied to clipboard!
              </div>
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
  </>
  )
}


export default withRouter(LyricsCard)








<div class="container">

    <div id="accordion">
        <div class="card">

            <div class="card-header" id="headingOne">
                <h5 class="mb-0 d-inline">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Collapsible #1
                    </button>
                 </h5>
                 <a href="#" data-target="[data-parent='#child1']" data-toggle="collapse" class="my-2 float-right">toggle all</a>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body" id="child1">
                    <div class="card">
                        <div class="card-header">
                            <a href="#" data-toggle="collapse" data-target="#collapseOneA">Child A</a>
                        </div>
                        <div class="card-body collapse" data-parent="#child1" id="collapseOneA">
                            Crunch wolf moon tempor, sunt aliqua put a bird.
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <a href="#" data-toggle="collapse" data-target="#collapseOneB">Child B</a>
                        </div>
                        <div class="card-body collapse" data-parent="#child1" id="collapseOneB">
                            Another flipp runch wolf moon tempor, sunt aliqua put a bird.
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
    </div>
</div>