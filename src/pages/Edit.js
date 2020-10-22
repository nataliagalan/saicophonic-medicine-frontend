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
    console.log(list);
    this.setState({
      songs: list,
      url: e.target.value
    })
  }

   handleSubmit = async (e) => {
    e.preventDefault();
    // let videoToUpdate = {
    //   songs: inputList, (array)
    //   url: videoInput.url, (object key)
    //   user_id: 5
    // }
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
              // onClick={handleAddInput}
              variant="primary">+</Button> }
            { songs.length !== 1 && <Button 
              value="remove"
              // onClick={() => handleRemoveInput(i)}
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
            {/* {JSON.stringify(inputList, null, 1)} */}
            {/* {JSON.stringify(videoInput, null, 1)} */}
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



 

  
  




