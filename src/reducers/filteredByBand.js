
const initialValue = {
  bands: [], 
  query: ""
}

const videos = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_FILTERED_BAND":
      //filter here?
      // iterate over action.payload.bands and send filtered array as value for bands key
      let query = action.payload.query
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

