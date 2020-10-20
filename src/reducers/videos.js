export default function videos(state = [], action) {
  switch (action.type) {
    case "GET_VIDEOS":
    case "ADD_VIDEO":
    case "DELETE_VIDEO":
    case "UPDATE_VIDEO":
      return action.videos;
    default:
      return state;
  }
}