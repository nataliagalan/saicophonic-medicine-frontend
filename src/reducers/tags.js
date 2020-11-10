


const initialValue = []

const tags = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.newTag ]
    case "CLEAR_TAGS":
      return []
    default:
      return state;
  }
}

export default tags

