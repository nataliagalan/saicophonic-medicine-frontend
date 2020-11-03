
// const initialValue = []
const initialValue = {
  videos: [], 
  all: 0,
  bands: 0,
  songs: 0,
  lyrics: 0
}
const videos = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      // return [...action.videos]
      return {...state, videos: action.payload.videos, [action.payload.key]: action.payload.videos.length}
    case "ADD_VIDEO":
    case "DELETE_VIDEO":
    case "UPDATE_VIDEO":
      return action.videos;
    default:
      return state;
  }
}

export default videos