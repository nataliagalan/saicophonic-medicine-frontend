
const initialValue = []
const video = (state = initialValue, action) => {
  switch (action.type) {
    case "TOGGLE_PLAY":
      return action.payload

    default:
      return state;
  }
}

export default video