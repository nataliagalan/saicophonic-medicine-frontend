import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteVideo } from "../actions/videos";

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


class LyricsCard extends Component {
  delVideo = async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.status === 200) {
      const updatedVideos = this.props.videos.filter((video) => video.id !== id);
      this.props.deleteVideo(updatedVideos);
    }
  };

  render() {
    const { lyrics, id } = this.props
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            02:00 - Has This Hit
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{lyrics}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            07:00 - Ceiling
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Lyrics Here</Card.Body>
          </Accordion.Collapse>
          <Row>
            <Col>
              <Button 
                as={Link} 
                to={`/videos/edit/${id}`}>              ✏️</Button>
              <Button 
                as={Link} 
                to={`/videos/${id}`}>
                👀</Button>
              <Button 
                onClick={() => this.delVideo(id)}
                >🗑</Button>
            </Col>
          </Row>
        </Card>
      </Accordion>
    )
  }
}


const setStateToProps = (state) => {
  return {
    videos: state.videos
  };
};

const setDispatchToProps = {
  deleteVideo,
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(LyricsCard));