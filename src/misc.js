
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateVideo } from '../actions/videos'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Edit = (props) => {
    //useSelector is similar to setStateToProps
    const videos = useSelector(state => state.videos);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();
  // console.log(props);

  // first, videos is undefined, then useEffect loads them
  // console.log(videos, "ttt");
 
      useEffect(() => {
        // code to run on component mount
        const path = props.location.pathname.split("/");
        const id = parseInt(path[path.length - 1]);
        fetch(`http://localhost:3001/api/v1/videos/${id}`)
          .then(res => res.json())
          .then(data => test(data));

      }, []); // [] if effect doesn't need props or state

      const test = (video) => {
       let videoObj = {url: video.url}
      }

      // export const getVideos = (videos) => {
      //   return {
      //     type: "GET_VIDEOS",
      //     videos: videos,
      //   };
      // };

    const [inputList, setInputList] = useState([
      { 
        timestamp: '',
        title: '',
        lyrics: '',
      }
    ]);
    
    const [videoInput, setVideoInput] = useState({url: ''});

    const handleVideoInputChange = (e) => {
      setVideoInput({[e.target.name]: e.target.value});
    }


  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // let videoToUpdate = {
  //   //   songs: inputList, (array)
  //   //   url: videoInput.url, (object key)
  //   //   user_id: 5
  //   // }
  //   const reqObj = {
  //     method: 'PATCH',
  //     headers: {
  //     'Content-Type': 'application/json',
  //     'Accept': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       url: this.state.url,
  //       lyrics: this.state.lyrics
  //     })
  //   };
  //   const res = await fetch(`http://localhost:3001/api/v1/videos/${this.state.id}` ,reqObj);
  //   const updatedVideo = await res.json();

  //   if (res.status === 200) {
  //     const prevVideos = this.props.videos.filter(
  //       (video) => video.id !== this.state.id
  //     );
  //     const allVideos = [...prevVideos, updatedVideo];
  //     this.props.updateVideo(allVideos);
  //     this.props.history.push(`/videos`);
  //   }

  
  

 
    return (
      <Form
      // onSubmit={handleSubmit}
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

        <Button 
          variant="primary" 
          type="submit">
          Save
        </Button>
         <pre>
            {/* {JSON.stringify(inputList, null, 1)} */}
            {JSON.stringify(videoInput, null, 1)}
          </pre>
      </Form>        
    )
}



export default withRouter(Edit);