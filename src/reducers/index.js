import { combineReducers } from "redux";
import videos from "./videos";
import video from "./video";
import auth from "./auth";
import filteredByAll from "./filteredByAll";
import filteredByBand from "./filteredByBand";
import setFilter from "./setFilter";

//keys below correspond to state keys
//and the value corresponds to the reducer in charge of updating that particular key
//those reducers are switch statements defined in a separate file and imported here
export default combineReducers({
  videos,
  video,
  auth,

  filteredByAll,
  filteredByBand,
  setFilter

  //filteredBySongs: 
  //filteredByLyrics: 
 
  //songs: songReducer
});