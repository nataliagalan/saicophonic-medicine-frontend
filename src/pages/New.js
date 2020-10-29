import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addVideo } from '../actions/videos'
import { currentUser } from '../actions/auth'

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import ReactPlayer from 'react-player/lazy';
import Duration from '../components/Duration';


const New = (props) => {
  const ref = React.createRef()

  //useSelector is similar to setStateToProps
  const videos = useSelector(state => state.videos);
  const auth = useSelector(state => state.auth);
  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();

  useEffect(() => {
    // code to run on component mount
    const token = localStorage.getItem('myAppToken')

    const fetchData = async () => {
      const reqObj = {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        }
      }
      const res = await fetch('http://localhost:3001/api/v1/current_user', reqObj);
      const data = await res.json();
      if(data.error) {
        props.history.push('/admin')
      } else {
        //need to store the user (data) in store state
        dispatch(currentUser(data));
      }
    }

    if(!token){
      props.history.push('/admin')
    } else {
      fetchData()
    }
  }, [])


  //SLIDER FUNCTIONS
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [inputToUpdate, setInputToUpdate] = useState(0);

  

  
  
  let secondsForSeekTo = Math.round(duration * played)
  
  //format (and pad) takes seconds, returns 00:00 to display
  function format (seconds) {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  }
  
  function pad (string) {
    return ('0' + string).slice(-2)
  }
  
  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekMouseUp = e => {
    setSeeking(false)
    //e.target.value is state.played (played)

    //temporarily player off during testing
    // ref.current.seekTo(parseFloat(e.target.value))
  }

  const handleSeekChange = (e) => {
    setPlayed(e.target.value)
    // e.target.value = played
    let timeToDisplay = format(duration * e.target.value)
    
    //inputToUpdate is the index of the item that is focused
    //inputList[inputToUpdate] is the item in the array that needs to be updated
    const updatedSongArr = inputList.map((song, i) => {
      if (i === inputToUpdate) {
        return {
          ...song,
          timestamp: timeToDisplay
        }
      } else {
        return song
      }
    })

    setInputList(updatedSongArr);
    //call setInputList use the value of inputToUpdate to find which object to update
    // update it's timestamp to e.target.value
    //iterate to only update a specific key value pair
  }

 

  const handleDuration = (d) => {
    //seems to only run once at the beginning
    // and corresponds to video length in seconds
    // takes those seconds and adds them to state
    setDuration(d)
  }

  const handleFocus = (e, i) => {
    setInputToUpdate(i)
    console.log(i, "index");
  }



  //END OF SLIDER FUNCTIONS

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
    //don't need this code because timestamps in backend accept strings now
    // const formatSongs = inputList.map(song => { 
    //   let formatTimestamp = song.timestamp.split(':')
    //   let formatSeconds = ((parseInt(formatTimestamp[0]) * 60) + parseInt(formatTimestamp[1]))
    //   song.timestamp = formatSeconds
    //   return { ...song }
    // });

    let videoToAdd = {
      songs: inputList,
      url: videoInput.url
    }
     const reqObj = {
       method: 'POST',
       headers: {
       'Content-Type': 'application/json',
       id: `${auth.id}`
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
      <div className="new-video-page">
      {
      videoInput.url ? 
        <ResponsiveEmbed aspectRatio="16by9">
          <ReactPlayer
          ref={ref}
          onDuration={handleDuration} 
          width='100%'
          height='100%'
          controls={true}
          url={videoInput.url} />
        </ResponsiveEmbed>
        :
        null
      }

      <Form>
        <Form.Group controlId="formBasicRangeCustom">
        <Form.Control 
        // <input
          custom
          type='range' min={0} max={0.999999} step='any'
          value={played}
          onMouseDown={handleSeekMouseDown}
          onChange={(e) => handleSeekChange(e)}
          onMouseUp={handleSeekMouseUp}
        // />
        />
        </Form.Group>
      </Form>

      <div className="duration-seconds">
        <Duration seconds={duration * played}/>
      </div>
     
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
                    defaultValue={input.timestamp} 
                    //handleFocus sets inputToUpdate with corresponding index
                    onFocus={(e) => handleFocus(e, i)}
                    // value={input.timestamp} 
                    // onChange={(e) => handleChange(e, i)}
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