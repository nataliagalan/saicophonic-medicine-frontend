import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Edit extends Component {
  state = {
    id: '',
    url: '',
    lyrics: '',
    user_id: 5,
  };

  componentDidMount() {
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[path.length - 1]);
    this.setInitialState(id)
  }

  setInitialState = async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`);
    const video = await res.json();
  
    this.setState({
      id: id,
      url: video.url,
      lyrics: video.lyrics,
      user_id: 5,
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const reqObj = {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify({
        url: this.state.url,
        lyrics: this.state.lyrics
      })
    };
    const res = await fetch(`http://localhost:3001/api/v1/videos/${this.state.id}` ,reqObj);
    const updatedVideo = await res.json();

    if (res.status === 200) {
      const prevVideos = this.props.videos.filter(
        (video) => video.id !== this.state.id
      );
      const allVideos = [...prevVideos, updatedVideo];
      this.props.updateVideo(allVideos);
      this.props.history.push(`/videos/${this.state.id}`);
    }

  }

  render() {
    return (
    <Form
      onSubmit={this.handleSubmit}
      >
        <br></br>
        <Form.Row>
          <Col>
            <Form.Control 
              name="url" 
              value={this.state.url} 
              onChange={this.handleChange}
              placeholder="Url" />
          </Col>
        </Form.Row>
        <br></br>
        {/* <Form.Row>
          <Col>
            <Form.Control placeholder="Time" />
          </Col>
          <Col xs={7}>
            <Form.Control placeholder="Song Title" />
          </Col>
        </Form.Row> */}
        <br></br>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control 
            as="textarea"
            name="lyrics" 
            value={this.state.lyrics} 
            onChange={this.handleChange}
            placeholder="Lyrics"
            rows={11} />
        </Form.Group>
        <Button 
          variant="primary" 
          type="submit">
          Save
        </Button>

      </Form>        
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos
  };
};

const setDispatchToProps = {
  updateVideo
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Edit));