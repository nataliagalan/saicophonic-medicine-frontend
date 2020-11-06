import React from 'react'
import VideoCard from './VideoCard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import GridGenerator from './GridGenerator';
import LyricsCard from './LyricsCard';

const VideoContainer = (props) => {

  //NO GRID:
    //HIDE GRID GENERATOR FROM VIDEOCONTAINER
  //GRID
    //USE GRID GENERATOR FROM VIDEOCONTAINER, COLS 4

  // <GridGenerator cols={1}>
  return (<GridGenerator cols={4}>
    {
      props.videos.map(video => {
        return <VideoCard {...video} key={video.id} />
      })
    }
    </GridGenerator>)
    // </GridGenerator>
    
}

export default VideoContainer


// =====GRID=====

// VIDEO CONTAINER
  // return (<GridGenerator cols={4}>
  //   {
  //     props.videos.map(video => {
  //       return <VideoCard {...video} key={video.id} />
  //     })
  //   }
  //   </GridGenerator>)

// VIDEO CARD
  // return (
  //       <>
  //         <ResponsiveEmbed aspectRatio="16by9">
  //           <ReactPlayer
  //           ref={ref}
  //           url={url} 
  //           playing={playerState.playing}
  //           controls={true}
  //           width='100%'
  //           height='100%'/>
  //         </ResponsiveEmbed>
  //         <br></br>
  //         <LyricsCard {...props} handlePlay={handlePlay} />
  //         <br></br>
  //       </>
  //     )

  
// ====NO GRID====

// VIDEO CONTAINER
  // return (<Row>
  //   {
  //     props.videos.map(video => {
  //       return <VideoCard {...video} key={video.id} />
  //     })
  //   }
  //   </Row>)

// VIDEO CARD
  // return (
  //   <>
  //       <Col sm={8} className="custom-spacer">
  //         <ResponsiveEmbed aspectRatio="16by9">
  //           <ReactPlayer
  //           ref={ref}
  //           url={url} 
  //           playing={playerState.playing}
  //           controls={true}
  //           width='100%'
  //           height='100%'/>
  //         </ResponsiveEmbed>
  //       </Col >

        
  //       <Col sm={4}>
  //       <LyricsCard {...props} handlePlay={handlePlay} />
  //       </Col>

  //     <br></br>
  //     <Line color="#EBDFF7" />
  //   </>
  // )

