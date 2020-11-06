import React, { Component } from 'react';
import { connect  } from 'react-redux';
// import { withRouter } from 'react-router-dom';

// import { loginSuccess } from '../actions/auth'
import { currentUser } from '../actions/auth'
import { updateVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import ReactPlayer from 'react-player/lazy';
import Duration from '../components/Duration';



class Edit extends Component {

  state = {
    id: '',
    url: '',
    band: '',
    songs: [
      {
        title: '',
        lyrics: '',
        timestamp: '',
      }
    ],
    played: 0,
    seeking: false,
    duration: 0,
    inputToUpdate: 0
  }

  componentDidMount() {
    const path = this.props.location.pathname.split("/");
    const id = parseInt(path[path.length - 1]);
    this.setInitialState(id);

    const token = localStorage.getItem('myAppToken') 
    if(!token){
      this.props.history.push('/admin')
    } else {
      this.fetchData()
    }

  }

  fetchData = async () => {
    const token = localStorage.getItem('myAppToken') 
    const reqObj = {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    const res = await fetch('http://localhost:3001/api/v1/current_user', reqObj);
    const data = await res.json();
    if(data.error) {
      this.props.history.push('/admin')
    } else {
      //need to store the user (data) in store state
      this.props.currentUser(data)
    }
  }

  setInitialState = async (id) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`);
    const video = await res.json();
    this.setState({ id: id, songs: video.songs, url: video.url, band: video.band });
  };

  handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...this.state.songs];
    list[i][name] = value

    this.setState((prevState) => 
      ({songs: list, 
        // url: prevState.url
      })
    )
  }

  handleVideoInputChange = (e) => {
    this.setState({ url: e.target.value })
  }

  handleBandInputChange = (e) => {
    this.setState({ band: e.target.value })
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

  //SLIDER METHODS

  //format (and pad) takes seconds, returns 00:00 to display
  format = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = this.pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${this.pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  }
  
  pad = (string) => {
    return ('0' + string).slice(-2)
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
    // e.target.value = played
    let timeToDisplay = this.format( this.state.duration * e.target.value )

    const updatedSongArr = this.state.songs.map((song, i) => {
      if (i === this.state.inputToUpdate) {
        return {
          ...song,
          timestamp: timeToDisplay
        }
      } else {
        return song
      }
    })

    this.setState({songs: updatedSongArr})

  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    const { duration, played } = this.state
    //e.target.value is this.state.played
    let secondsForSeekTo = Math.round(duration * played)
    this.player.seekTo( secondsForSeekTo )
    // this.player.seekTo(parseFloat(e.target.value))
  }

  handleDuration = (d) => {
    // d corresponds to video length in seconds
    this.setState({ duration: d })
  }
  
  handleFocus = (e, i) => {
    this.setState({inputToUpdate: i})
    // setInputToUpdate(i)
  }

  // END OF SLIDER METHODS

  ref = player => {
    this.player = player
  }


  render() {
    const { songs } = this.state
    // console.log(songs[0].timestamp);
    return (
    <Container fluid>
      <div className="new-and-edit-video-page">
      <Row>
          
        <Col md={6} sm={6}>
          <div className="video-wrapper" >

            <ResponsiveEmbed aspectRatio="16by9">
              <ReactPlayer
              className="react-player"
              placement="top"
              ref={this.ref}
              onDuration={this.handleDuration} 
              width='100%'
              height='100%'
              controls={true}
              url={this.state.url} />
            </ResponsiveEmbed>
        
            <Form>
            <Form.Group controlId="formBasicRangeCustom">
            <Form.Control 
            // <input
            custom
            type='range' min={0} max={0.999999} step='any'
            value={this.state.played}
            onMouseDown={this.handleSeekMouseDown}
            onChange={this.handleSeekChange}
            onMouseUp={this.handleSeekMouseUp}
            // />
            />
            </Form.Group>
            </Form>

            {/* what gets displayed is the length of video times played (float)
            those seconds get passed as input to duration and it converts them
            to 00:00 format, then they get displayed
            */}
            <div className="duration-seconds">
            <Duration seconds={this.state.duration * this.state.played}/>
            </div>

      {/* !VIDEO WRAPPER DIV */}
          </div>
        </Col>


        <Col md={6} sm={6}>

          <Form
          onSubmit={this.handleSubmit}
          className="edit-and-new-form"
          >
            <Form.Row>
              <Col>
                <Form.Control 
                  name="url"
                  // ref={input => { this.urlInput = input }} 
                  defaultValue={this.state.url} 
                  onChange={(e) => this.handleVideoInputChange(e)}
                  placeholder="Url" />
              </Col>
            </Form.Row>
            <br></br>
            <Form.Row>
              <Col>
                <Form.Control 
                  name="band"
                  defaultValue={this.state.band} 
                  onChange={(e) => this.handleBandInputChange(e)}
                  placeholder="Artist/Band" />
              </Col>
              </Form.Row>
              <br></br>
              {
                songs.map((song, i) => {
                  return (
                <div key={i}>
                  <br/>
                  <Form.Row>
                    <Col>
                      <Form.Control 
                        name="timestamp"
                        autoComplete="off"
                        label="timestamp" 
                        defaultValue={song.timestamp}
                        //handleFocus sets inputToUpdate with corresponding index
                        onFocus={(e) => this.handleFocus(e, i)} 
                        // defaultValue={this.state.played}
                        // onChange={(e) => this.handleChange(e, i)}
                        // placeholder="Time" 
                        />
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
                    className="dynamic-input-btn"
                    onClick={this.handleAddInput}
                    variant="primary">+</Button>  }
                  { songs.length !== 1 && <Button 
                    value="remove"
                    className="dynamic-input-btn"
                    onClick={() => this.handleRemoveInput(i)}
                    variant="primary">-</Button> }

                  </div>
                  )
                })
              }
              <Button 
                variant="primary" 
                type="submit">
                Save
              </Button>
          </Form>

      </Col>

    </Row>
      {/* !new-and-edit-video-page DIV */}
    </div>    
  </Container>    
    )
  }


}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    auth: state.auth
  };
};

const setDispatchToProps = {
  //possibly delete this updateVideo
  updateVideo,
  currentUser,
};

export default connect(setStateToProps, setDispatchToProps)(Edit);
// export default withRouter(connect(setStateToProps, setDispatchToProps)(Edit));



 

  
  




