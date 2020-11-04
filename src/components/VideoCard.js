import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Line from './Line';

import ReactPlayer from 'react-player/lazy'

import LyricsCard from './LyricsCard';


const VideoCard = (props) => {

  // console.log(props, "=======VIDEO CARD PROPS==========");
    const ref = React.createRef()
    //useSelector is similar to setStateToProps
    const payload = useSelector(state => state.video);
    // console.log(payload, '11---------------');

  
    const [playerState, setPlayerState] = useState(() => ({playing: false}));


    //setPlayerState triggers a rerender
      // use the payload coming from dispatched actions
      // to set state

    const handlePlay = (timeString) => {
      //turns the timeString 00:00 into seconds
      const seconds = hmsToSeconds(timeString)
      setPlayerState(prevState => ({playing: !playerState.playing}) );
      ref.current.seekTo(seconds, "seconds")
    }

    const hmsToSeconds = (str) => {
      let p = str.split(':'),
          s = 0, m = 1;

      while (p.length > 0) {
          s += m * parseInt(p.pop(), 10);
          m *= 60;
      }
      return s;
    }
  

    const { url } = props
  
    return (
      <>
      <br></br>
        <Row>
          <Col sm={8} className="custom-spacer">
              <ResponsiveEmbed aspectRatio="16by9">
              <ReactPlayer
              ref={ref}
              url={url} 
              // *********change playing
              playing={playerState.playing}
              controls={true}
              width='100%'
              height='100%'/>
            </ResponsiveEmbed>
          </Col>
          
          <Col sm={4}>
            {/* <SongContainer
            handlePlay={handlePlay} 
              {...props} /> */}
            <LyricsCard {...props} handlePlay={handlePlay} />
            
          </Col>
        </Row>
        <br></br>
        <Line color="#EBDFF7" />
      </>
    )

}




export default VideoCard

