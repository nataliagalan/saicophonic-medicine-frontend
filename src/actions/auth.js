
export const loginSuccess = (user) => {
  return {
    type: "LOGIN_SUCCESS",
    user: user
  };
};

export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS"
  };
};