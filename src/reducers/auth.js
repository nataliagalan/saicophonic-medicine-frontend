const initialValue = {}

const auth = (state = initialValue, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return action.user
    case "LOGOUT_SUCCESS":
      return {}
    case "CURRENT_USER":
      return action.user
    default:
      return state;
  }
}

export default auth