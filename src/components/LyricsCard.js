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
  delVideo =  async (id) => {
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
    const { id } = this.props
    const { lyrics, title, timestamp } = this.props.songs[0]
    
    return (
      <Accordion defaultActiveKey="0">
          {/* {on click event that setStates the selected song} */}

        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            {timestamp} - {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
            {lyrics} 
            </Card.Body>
          </Accordion.Collapse>
          </Card>

          {/* Edit and Delete buttons */}
          <Row>
            <Col>
              <Button 
                as={Link} 
                to={`/videos/edit/${id}`}>✏️</Button>
              <Button 
                onClick={() => this.delVideo(id)}
                >🗑</Button>
            </Col>
          </Row>
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
  deleteVideo
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(LyricsCard));