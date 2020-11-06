import React from 'react'
import { useSelector  } from 'react-redux';
import VideoCard from './VideoCard'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import GridGenerator from './GridGenerator';
import LyricsCard from './LyricsCard';

const VideoContainer = (props) => {
  //useSelector is similar to setStateToProps
  const showGrid = useSelector(state => state.toggleGrid);


  const handleToggleGrid = () => {
    if(showGrid){
       return (<GridGenerator cols={4}>
    {
      props.videos.map(video => {
        return <VideoCard {...video} key={video.id} />
      })
    }
    </GridGenerator>)
    } else {
       return (<Row>
    {
      props.videos.map(video => {
        return <VideoCard {...video} key={video.id} />
      })
    }
    </Row>)
    }
  }

  // VIDEO CONTAINER
// =====GRID=====
  // return (<GridGenerator cols={4}>
  //   {
  //     props.videos.map(video => {
  //       return <VideoCard {...video} key={video.id} />
  //     })
  //   }
  //   </GridGenerator>)

// ====NO GRID====
  // return (<Row>
  //   {
  //     props.videos.map(video => {
  //       return <VideoCard {...video} key={video.id} />
  //     })
  //   }
  //   </Row>)


  // <GridGenerator cols={1}>
  return handleToggleGrid();
    // </GridGenerator>
    
}

export default VideoContainer

// VIDEO CONTAINER
// =====GRID=====
  // return (<GridGenerator cols={4}>
  //   {
  //     props.videos.map(video => {
  //       return <VideoCard {...video} key={video.id} />
  //     })
  //   }
  //   </GridGenerator>)

// ====NO GRID====
  // return (<Row>
  //   {
  //     props.videos.map(video => {
  //       return <VideoCard {...video} key={video.id} />
  //     })
  //   }
  //   </Row>)


// VIDEO CARD
// =====GRID=====
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


 
