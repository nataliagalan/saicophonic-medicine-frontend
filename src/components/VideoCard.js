import React, { useState } from 'react';
import { useSelector  } from 'react-redux';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import Col from 'react-bootstrap/Col';
import Line from './Line';
import ReactPlayer from 'react-player/lazy'
import LyricsCard from './LyricsCard';


const VideoCard = (props) => {
  //useSelector is similar to setStateToProps
  const showGrid = useSelector(state => state.toggleGrid);
  
  const handleToggleGrid = () => {
    if(showGrid){
        return (
        <>
          <ResponsiveEmbed aspectRatio="16by9">
            <ReactPlayer
            ref={ref}
            light={true}
            url={url} 
            playing={playerState.playing}
            controls={true}
            width='100%'
            height='100%'/>
          </ResponsiveEmbed>
          <br></br>
          <LyricsCard {...props} handlePlay={handlePlay} playing={playerState.playing}  />
          <br></br>
        </>
      )
    } else {
          return (
        <>
          <Col sm={7} className="custom-spacer">
            <ResponsiveEmbed aspectRatio="16by9">
              <ReactPlayer
              ref={ref}
              light={true}
              // playIcon={}
              url={url} 
              playing={playerState.playing}
              controls={true}
              width='100%'
              height='100%'/>
            </ResponsiveEmbed>
          </Col >
            
          <Col sm={5}>
          <LyricsCard {...props} handlePlay={handlePlay} playing={playerState.playing} />
          </Col>
          <br></br>
          <Line color="#EBDFF7" height={1} />
        </>
      )
    }
  }

    const ref = React.createRef()

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
  
    return handleToggleGrid();

}


export default VideoCard
