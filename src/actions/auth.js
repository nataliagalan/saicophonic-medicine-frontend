import history from '../history'

// const API_ENDPOINT = 'http://localhost:3001/api/v1';
const API_ENDPOINT = "https://saicophonic-api.herokuapp.com/api/v1";

// /auth is a custom route on rails backend that triggers auth#create
const ADMIN_URL = `${API_ENDPOINT}/auth`;
const FETCH_USER_URL = `${API_ENDPOINT}/current_user`;

export const loginSuccess = (user) => {
	return {
		type: 'LOGIN_SUCCESS',
		user: user,
	};
};

export const logoutSuccess = () => {
	return {
		type: 'LOGOUT_SUCCESS',
	};
};

export const currentUser = (user) => {
	return {
		type: 'CURRENT_USER',
		user: user,
	};
};

export const thunkFetchUser = () => async (dispatch, getState) => {
		const token = localStorage.getItem('myAppToken');
		if (!token) {
			history.push('/admin');
		} else {
			const reqObj = {
				method: 'GET',
				headers: {
					// Authorization: `Bearer ${token}`,
					Authorization: token,
				},
      };
      const res = await fetch(FETCH_USER_URL, reqObj);
      const user = await res.json();
      if(user.error) {
        history.push('/admin')
        console.log(user.error, "error from thunkfetchuser");
      } else {
        //need to store the user (data) in store state
        dispatch(currentUser(user));
      }
		}
	};


export const thunkLogin = (e, body) => async (dispatch, getState) => {
  e.preventDefault();
		const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    };

    const res = await fetch(ADMIN_URL, reqObj);
    const user = await res.json();
    if(user.error){
      console.log(user.error, "error from thunkLogin");
      // TODO this.setState({ error: user.error });
    } else {
      console.log(user, 'user from thunk');
      localStorage.setItem('myAppToken', user.token)
      dispatch(loginSuccess(user))
      history.push('/')
    }
	};


