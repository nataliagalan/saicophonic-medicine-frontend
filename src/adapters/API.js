
const API_ENDPOINT = 'http://localhost:3001/api/v1';
// const API_ENDPOINT = "https://saicophonic-railsbackend.herokuapp.com";

const ADMIN_URL = `${API_ENDPOINT}/auth`;
const FETCH_USER_URL = `${API_ENDPOINT}/current_user`;

const SEARCH_URL = `${API_ENDPOINT}/videos/search/`;
const TAGGED_URL = `${API_ENDPOINT}/videos/tagged/`;
const TAGS_URL = `${API_ENDPOINT}/tags/search/`;
const RANDOM_URL = `${API_ENDPOINT}/random`;

// TO DELETE
const VALIDATE_URL = `${API_ENDPOINT}/validate`;



// HELPER METHODS
const jsonHeaders = (more = {}) => ({
	'Content-Type': 'application/json',
	Accept: 'application/json',
	...more,
});

const authHeader = () => ({
	Authorization: `Bearer ${localStorage.getItem('myAppToken')}`
});

const fetchConfig = (method = 'GET', body) => {
	return {
		method,
		headers: jsonHeaders(),
		body: JSON.stringify(body),
	};
};

const handleError = () => {
	console.error('handle error message');
};

const handleServerResponse = (res) => {
	if (res.ok) {
		return res.text().then((text) => {
			try {
				return JSON.parse(text);
			} catch (error) {
				return { staticPageContent: text };
			}
		});
	} else if (res.status === 503) {
		return { code: 503 };
	} else if (res.status === 500) {
		return { code: 500, error: 'Something went wrong' };
	} else if (res.status === 406) {
		return { code: 406, error: 'Not acceptable' };
	} else if (res.status === 404) {
		return { code: 404, error: 'Not found' };
	} else {
		return res.text().then((text) => {
			try {
				//console.log(JSON.parse(text))
				return JSON.parse(text);
			} catch (error) {
				return res;
			}
		});
	}
};

// ADMIN ************DOUBLE CHECK BELOW

const fetchUser = async () => {
  const reqObj = {
    method: 'GET',
    headers: authHeader()
  }
  const res = await fetch(FETCH_USER_URL, reqObj);
  const user = await res.json();
  if(user.error) {
    console.log(user.error, "user error");
    this.props.history.push('/admin')
  } else {
    //need to store the user in store state
    // this.props.currentUser(user);
    console.log(user, "USER FROM API.JS");
  }
}

const getUser = id => fetch(`${ADMIN_URL}/${id}`).then(handleServerResponse);

const login = userDetails => {
  console.log(userDetails)
  if (userDetails !== undefined) {
    return fetch(VALIDATE_URL, fetchConfig("POST", { user: userDetails }))
    .then(handleServerResponse)
    .then(userDetails => {
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user;
    })
    .catch(handleError);
  } else {
    this.props.history.push("/signin", {...userDetails})
  }
};

const validateUser = () => {
  return fetch(VALIDATE_URL, {
    method: "POST",
    headers: authHeader()
  })
    .then(handleServerResponse)
    .then(userDetails => {
      if (!userDetails) {
        return { errors: ["something went wrong with validating the user"] };
      }
      if (userDetails.token) {
        localStorage.setItem("token", userDetails.token);
      }
      return userDetails.user || userDetails;
    })
    .catch(handleError);
};

const logout = () => {
  localStorage.removeItem("token");
};

//



// EXPORT
export default {
  fetchUser,

  getUser,
  login,
  validateUser,
  logout
}