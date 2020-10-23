import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Line from './Line';

import ReactPlayer from 'react-player/lazy'
import SongContainer from './SongContainer';


const VideoCard = (props) => {

    const ref = React.createRef()
    //useSelector is similar to setStateToProps
    const payload = useSelector(state => state.video);
    // console.log(payload, '11---------------');

  
    const [playerState, setPlayerState] = useState(() => ({playing: false}));


    //setPlayerState triggers a rerender
      // use the payload coming from dispatched actions
      // to set state

    const please = (seconds) => {
      // console.log(seconds);
      setPlayerState(prevState => ({playing: !playerState.playing}) );
      ref.current.seekTo(seconds, "seconds")
      
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
            <SongContainer
            please={please} 
              {...props} />
          </Col>
        </Row>
        <br></br>
        <Line color="#EBDFF7" />
      </>
    )

}




export default VideoCard

