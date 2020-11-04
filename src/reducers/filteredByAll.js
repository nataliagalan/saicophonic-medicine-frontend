const initialValue = []

const videos = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_FILTERED_ALL":
      return [...action.all]
    default:
      return state;
  }
}

export default videos