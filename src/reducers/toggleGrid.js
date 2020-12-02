const toggleGrid = (state=false, action) => {
  switch(action.type){
      case 'TOGGLE_GRID':
          return !state
      default:
          return state
  }
}

export default toggleGrid