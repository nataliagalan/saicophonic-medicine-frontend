const initialValue = {
  bands: [], 
  query: ""
}
const videos = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_FILTERED_BAND":
      let query = action.payload.query.toLowerCase()
      let filteredVideos = action.payload.bands.filter( video => video.band.toLowerCase().includes(query) )
      return {...state, 
        bands: filteredVideos, 
        query: action.payload.query
      }
    default:
      return state;
  }
}

export default videos

