const initialValue = {
  songs: [], 
  query: ""
}
const videos = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_FILTERED_SONG":
      let query = action.payload.query.toLowerCase()
      let filteredVideos = action.payload.songs.filter(function(video) {
        return video.songs.some(function(song) {
          return song.title.toLowerCase().includes(query);
        });
      });
      return {...state, 
        songs: filteredVideos, 
        query: action.payload.query
      }
    default:
      return state;
  }
}

export default videos


