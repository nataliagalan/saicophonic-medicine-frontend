import { combineReducers } from "redux";
import videos from "./videos";
import video from "./video";
import auth from "./auth";
import filteredByAll from "./filteredByAll";
import filteredByBand from "./filteredByBand";
import filteredBySong from "./filteredBySong";
import filteredByLyrics from "./filteredByLyrics";
import setFilter from "./setFilter";
import toggleTabs from "./toggleTabs";
import toggleGrid from "./toggleGrid";
import tags from "./tags";


//keys below correspond to state keys
//and the value corresponds to the reducer in charge of updating that particular key
//those reducers are switch statements defined in a separate file and imported here
export default combineReducers({
  setFilter,
  videos,
  video,
  auth,

  filteredByAll,
  filteredByBand,
  filteredBySong,
  filteredByLyrics,

  toggleTabs,
  toggleGrid, 
  tags
 
});