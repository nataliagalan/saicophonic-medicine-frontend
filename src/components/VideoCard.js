import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

import ReactPlayer from 'react-player/lazy'


const VideoCard = (props) => {

    //useSelector is similar to setStateToProps
    const payload = useSelector(state => state.video);

    console.log(payload);

    // use the payload coming from dispatched actions
    // te set state
    const [playerState, setPlayerState] = useState(() => ({playing: false}));

    console.log(playerState, "sadasdasdasdasdas");
  
  

    const ref = React.createRef()
    //set triggers a rerender
        // use the payload coming from dispatched actions
    // te set state
    const handlePlayerToggle = () => {
      setPlayerState(prevState => ({playing: !playerState.playing}) );
      ref.current.seekTo(24, "seconds")
    }

      

  // state = {
    // url: null,
    // pip: false,
    // playing: false,
    // controls: true,
    // light: false,
    // volume: 0.8,
    // muted: false,
    // played: 0,
    // loaded: 0,
    // duration: 0,
    // playbackRate: 1.0,
    // loop: false
  // }

 // need a way to take 
    // 1.seconds
    // 2. boolean
    // on click, with handleplaypause
    // this.setState({ playing: !this.state.playing })
    // this.player.seekTo(24, "seconds")


  

  
    // console.log(props, "videoCard");
   
    const { url } = props
  
    return (
      <>
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
        <button onClick={handlePlayerToggle}>
          handlePlayerToggle</button>
      </>
    )

}




export default VideoCard

