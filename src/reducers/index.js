import { combineReducers } from "redux";
import videos from "./videos";
import video from "./video";

export default combineReducers({
  videos: videos,
  video: video

  //paintings: paintingsReducer
});