

export const filteredBySong = (videos, query) => {
  return {
    type: "GET_FILTERED_SONG",
    // bands: videos
    payload: {songs: videos, query: query} 
  };
};
