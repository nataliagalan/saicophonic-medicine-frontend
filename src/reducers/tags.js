


const initialValue = []

const tags = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.newTag ]
    default:
      return state;
  }
}

export default tags

