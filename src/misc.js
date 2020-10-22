import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


class New extends Component {

  state = {
    url: '',
    lyrics: '',
    title: '',
    timestamp: '',
    user_id: 5,
    error: null,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
     const reqObj = {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
       },
       body: JSON.stringify(this.state)
     };

    const res = await fetch('http://localhost:3001/api/v1/videos', reqObj);
    const newVideo = await res.json();
    if (newVideo.error) {
      this.setState({ error: newVideo.error });
    } else {
      const updatedVideos = [...this.props.videos, newVideo];
      this.props.addVideo(updatedVideos);
      // this.props.history.push(`/videos/${newVideo.id}`);
      // this.props.history.push(`/videos`);
    }
  };




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
        <Form.Row>
          <Col>
            <Form.Control 
              name="timestamp" 
              value={this.state.timestamp} 
              onChange={this.handleChange}
              placeholder="Time" />
          </Col>
          <Col xs={7}>
            <Form.Control
              name="title" 
              value={this.state.title} 
              onChange={this.handleChange} 
              placeholder="Song Title" />
          </Col>
        </Form.Row>
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


        <br></br>
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
  }
};

const setDispatchToProps = { addVideo };

export default connect(setStateToProps, setDispatchToProps)(New);





<Form.Row>
<Col>
  <Form.Control 
    name="timestamp" 
    value={this.state.timestamp} 
    onChange={this.handleChange}
    placeholder="Time" />
</Col>
<Col xs={7}>
  <Form.Control
    name="title" 
    value={this.state.title} 
    onChange={this.handleChange} 
    placeholder="Song Title" />
</Col>
</Form.Row>
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