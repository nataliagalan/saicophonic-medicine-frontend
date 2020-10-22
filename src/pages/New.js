import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
    //change this.state to hooks state using inputList (array)
    //and videoInput (object)
    // construct a new object
    let videoToAdd = {
      songs: inputList,
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


    return (
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
                    placeholder="Time" />
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
                onClick={handleAddInput}
                variant="primary">+</Button> }
              { inputList.length !== 1 && <Button 
                value="remove"
                onClick={() => handleRemoveInput(i)}
                variant="primary">-</Button>}
              </div>
            )
            }
          )
        } 


        <br></br>
        <Button
          // onClick={() => dispatch(addVideo())} 
          variant="primary" 
          type="submit">
          Save
        </Button>
        
          {/* <pre>
            {JSON.stringify(inputList, null, 1)}
            {JSON.stringify(videoInput, null, 1)}
          </pre> */}
      </Form>
    )
  }

  export default withRouter(New);