import history from '../history'

// const API_ENDPOINT = 'http://localhost:3001/api/v1';
const API_ENDPOINT = "https://saicophonic-api.herokuapp.com/api/v1";

const RANDOM_URL = `${API_ENDPOINT}/random`;
const VIDEOS_URL = `${API_ENDPOINT}/videos`;

export const getVideo = (video) => {
  return {
    type: "GET_VIDEO",
    video: video
  };
};

export const thunkFetchVideo = (id) => async (dispatch, getState) => {
  let FETCH_VIDEO_URL
  if(id){
    FETCH_VIDEO_URL = `${VIDEOS_URL}/${id}`
  } else {
    FETCH_VIDEO_URL = RANDOM_URL
  }
  const res = await fetch(FETCH_VIDEO_URL);
  const videoToShow = await res.json();
  dispatch(getVideo(videoToShow));
  history.push(`/videos/${videoToShow.id}`)
};

            


