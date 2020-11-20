export const filteredBySong = (videos, query) => {
  return {
    type: "GET_FILTERED_SONG",
    payload: {songs: videos, query: query} 
  };
};
