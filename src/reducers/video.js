const initialValue = []
const video = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_VIDEO":
      return action.video;
    default:
      return state;
  }
}

export default video
