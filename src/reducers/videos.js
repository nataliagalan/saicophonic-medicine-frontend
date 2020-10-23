
const initialValue = []
const videos = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_VIDEOS":
      return [...action.videos]
    case "ADD_VIDEO":
    case "DELETE_VIDEO":
    case "UPDATE_VIDEO":
      return action.videos;
    default:
      return state;
  }
}

export default videos