import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import LyricsCard from './LyricsCard'

const SongContainer = (props) => {
  // console.log(props, "songcontainer");
  return (
    <div>
      <LyricsCard {...props} />
    </div>
  )
}


export default SongContainer

// const setStateToProps = (state) => {
//   return {
//     videos: state.videos
//   }
// }

// const setDispatchToProps = {
  // deleteVideo
// }

// export default connect(setStateToProps, null)(SongContainer);