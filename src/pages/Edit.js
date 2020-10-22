import React, { Component } from 'react';
import { connect  } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Edit extends Component {
  state = {
    id: '',
    url: '',
    songs: [
      {
        title: '',
        lyrics: '',
        timestamp: '',
      }
    ]
  }

  componentDidMount() {
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[path.length - 1]);
    this.setInitialState(id);
  }

  setInitialState = async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`);
    const video = await res.json();
    this.setState({ id: id, songs: video.songs, url: video.url });
  };

  handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...this.state.songs];
    list[i][name] = value
    this.setState((prevState) => 
      ({songs: list, 
        url: prevState.url
      })
    )
  }

   handleSubmit = async (e) => {
    e.preventDefault();
    const reqObj = {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    const res = await fetch(`http://localhost:3001/api/v1/videos/${this.state.id}` ,reqObj);
    const updatedVideo = await res.json();

    if (res.status === 200) {
      const prevVideos = this.props.videos.filter(
        (video) => video.id !== this.state.id
      );
      const allVideos = [...prevVideos, updatedVideo];
      this.props.updateVideo(allVideos);
      this.props.history.push(`/videos`);
    }
  }

 handleAddInput = () => {
    this.setState((prevState) => 
      ({songs: [...prevState.songs,  { title: '', lyrics: '', timestamp: '' }]})
    )
  }

  handleRemoveInput = (i) => {
    let songs = [...this.state.songs];
    songs.splice(i, 1);
    this.setState({
      songs: songs
    })
  }


  render() {
    const { songs } = this.state
    // console.log(songs[0].timestamp);
    return (
      <Form
      onSubmit={this.handleSubmit}
      >
        <br></br>
        <Form.Row>
          <Col>
            <Form.Control 
              name="url" 
              defaultValue={this.state.url} 
              onChange={(e) => this.handleChange(e, 0)}
              placeholder="Url" />
          </Col>
        </Form.Row>
        <br></br>
        {
          songs.map((song, i) => {
            return (
              <div 
              key={i}>
                <br/>
            <Form.Row>
              <Col>
                <Form.Control 
                  name="timestamp"
                  label="timestamp" 
                  defaultValue={song.timestamp} 
                  onChange={(e) => this.handleChange(e, i)}
                  placeholder="Time" />
              </Col>
              <Col xs={7}>
                <Form.Control
                  name="title"
                  label="title"  
                  defaultValue={song.title} 
                  onChange={(e) => this.handleChange(e, i)} 
                  placeholder="Song Title" />
              </Col>
            </Form.Row>
            <br></br>
              <Form.Control 
                as="textarea"
                name="lyrics" 
                label="lyrics" 
                defaultValue={song.lyrics} 
                onChange={(e) => this.handleChange(e, i)}
                placeholder="Lyrics"
                rows={6} />
            { songs.length - 1 === i && <Button 
              value="add"
              onClick={this.handleAddInput}
              variant="primary">+</Button> }
            { songs.length !== 1 && <Button 
              value="remove"
              onClick={() => this.handleRemoveInput(i)}
              variant="primary">-</Button>}
            </div>
            )
          })
        }

        <Button 
          variant="primary" 
          type="submit">
          Save
        </Button>
         <pre>
            {/* {JSON.stringify(this.state.url, null, 1)} */}
            {/* {JSON.stringify(this.state.songs, null, 1)} */}
            {/* {JSON.stringify(this.state.id, null, 1)} */}
            {JSON.stringify(this.state, null, 1)}
          </pre>
      </Form>        
    )
  }


}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
  };
};

const setDispatchToProps = {
  updateVideo
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Edit));



 

  
  




