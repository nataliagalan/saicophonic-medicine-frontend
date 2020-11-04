

const initialValue = {showTabs: "false"}
const toggleTabs = (state=initialValue, action) => {
  switch(action.type){
      case 'TOGGLE_TABS':
          return {showTabs: action.showTabs}
      default:
          return state
  }
}

export default toggleTabs