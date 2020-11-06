import React from 'react'
import VideoCard from './VideoCard'


const VideoContainer = (props) => {
  // console.log(props, "====VIDEO CARD===");
  return <>
    {
      props.videos.map(video => {
        
        return <VideoCard {...video} key={video.id} />
 

      })
    }
  </>
}

export default VideoContainer