const initialValue = "none"

const setFilter = (state = initialValue, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter
    default:
      return state;
  }
}

export default setFilter