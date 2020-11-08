


const initialValue = []

const tags = (state = initialValue, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.newTag ]
    case "REMOVE_TAG":
      //filter through tag array and remove action.tagNameToRemove
      let filteredTags = state.filter(tag => tag !== action.tagNameToRemove)
      
      return filteredTags

      
    default:
      return state;
  }
}

export default tags




// const initialValue = []

// const tags = (state = initialValue, action) => {
//   switch (action.type) {
//     case "ADD_TAG":
//       return [...state, action.newTag ]
//     default:
//       return state;
//   }
// }

// export default tags