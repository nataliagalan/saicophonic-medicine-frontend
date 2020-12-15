import React from 'react'
import { useSelector  } from 'react-redux';
import VideoCard from './VideoCard'
import Row from 'react-bootstrap/Row';
// import GridGenerator from './GridGenerator';


const VideoContainer = (props) => {
  //useSelector is similar to setStateToProps
  const showGrid = useSelector(state => state.toggleGrid);

  const handleToggleGrid = () => {

       return (<Row>
    {
      props.videos.map(video => {
        return <VideoCard {...video} key={video.id} />
      })
    }
    </Row>)
  
  }
  
  return handleToggleGrid();  
}

export default VideoContainer;

 


// import React from 'react'
// import { useSelector  } from 'react-redux';
// import VideoCard from './VideoCard'
// import Row from 'react-bootstrap/Row';
// import GridGenerator from './GridGenerator';


// const VideoContainer = (props) => {
//   //useSelector is similar to setStateToProps
//   const showGrid = useSelector(state => state.toggleGrid);

//   const handleToggleGrid = () => {
//     if(showGrid){
//        return (
//        <GridGenerator cols={4}>
//     {
//       props.videos.map(video => {
//         return <VideoCard {...video} key={video.id} />
//       })
//     }
//     </GridGenerator>
//     )
//     } else {
//        return (<Row>
//     {
//       props.videos.map(video => {
//         return <VideoCard {...video} key={video.id} />
//       })
//     }
//     </Row>)
//     }
//   }
  
//   return handleToggleGrid();  
// }

// export default VideoContainer;

 
