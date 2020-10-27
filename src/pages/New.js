import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import ReactPlayer from 'react-player/lazy';


const New = (props) => {
  //useSelector is similar to setStateToProps
  const videos = useSelector(state => state.videos);
  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();

  const [inputList, setInputList] = useState([
    { 
      timestamp: '',
      title: '',
      lyrics: '',
    }
  ]);

  const [videoInput, setVideoInput] = useState({url: ''});



  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[i][name] = value
    setInputList(list);
  }

  const handleVideoInputChange = (e) => {
    setVideoInput({[e.target.name]: e.target.value});
  }
 
  const handleAddInput = () => {
    setInputList([...inputList, { timestamp: '', title: '', lyrics: '' }]);
  }

  const handleRemoveInput = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formatSongs = inputList.map(song => { 
      let formatTimestamp = song.timestamp.split(':')
      let formatSeconds = ((parseInt(formatTimestamp[0]) * 60) + parseInt(formatTimestamp[1]))
      song.timestamp = formatSeconds
      return { ...song }
    });

    let videoToAdd = {
      songs: formatSongs,
      url: videoInput.url,
      user_id: 5
    }
     const reqObj = {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
       },
       body: JSON.stringify(videoToAdd)
     };

    const res = await fetch('http://localhost:3001/api/v1/videos', reqObj);
    const newVideo = await res.json();
    // ...videos comes from useSelector
      const updatedVideos = [...videos, newVideo];
      dispatch(addVideo(updatedVideos));
      props.history.push(`/videos`);
  };
  const ref = React.createRef()

    return (
      <div className="new-video-page">
      {
      videoInput.url ? 
        <ResponsiveEmbed aspectRatio="16by9">
          <ReactPlayer
          ref={ref}
          width='100%'
          height='100%'
          controls={true}
          url={videoInput.url} />
        </ResponsiveEmbed>
        :
        null
      }
     
      <Form
        onSubmit={handleSubmit}
        >
        <br></br>
        <Form.Row>
          <Col>
            <Form.Control 
              name="url" 
              value={videoInput.url} 
              onChange={(e) => handleVideoInputChange(e)}
              placeholder="Url" />
          </Col>
        </Form.Row>
        <br></br>
        {
          inputList.map((input, i) =>  {
            return (
              <div 
                key={i}>
                  <br/>
              <Form.Row>
                <Col>
                  <Form.Control 
                    name="timestamp"
                    label="timestamp" 
                    value={input.timestamp} 
                    onChange={(e) => handleChange(e, i)}
                    placeholder="Time in 00:00" />
                </Col>
                <Col xs={7}>
                  <Form.Control
                    name="title"
                    label="title"  
                    value={input.title} 
                    onChange={(e) => handleChange(e, i)} 
                    placeholder="Song Title" />
                </Col>
              </Form.Row>
              <br></br>
                <Form.Control 
                  as="textarea"
                  name="lyrics" 
                  label="lyrics" 
                  value={input.lyrics} 
                  onChange={(e) => handleChange(e, i)}
                  placeholder="Lyrics"
                  rows={6} />
              { inputList.length - 1 === i && <Button 
                value="add"
                data-slider-id="BC"
                onClick={handleAddInput}
                className="dynamic-input-btn"
                variant="primary">+</Button> }
              { inputList.length !== 1 && <Button 
                value="remove"
                className="dynamic-input-btn"
                onClick={() => handleRemoveInput(i)}
                variant="primary">–</Button>}
              </div>
            )
            }
          )
        } 


        <br></br>
        <Button
          variant="primary" 
          type="submit">
          Save
        </Button>
        
          {/* <pre>
            {JSON.stringify(inputList, null, 1)}
            {JSON.stringify(videoInput, null, 1)}
          </pre> */}
      </Form>
      </div>
    )
  }

  export default withRouter(New);