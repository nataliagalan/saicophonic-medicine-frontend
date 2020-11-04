

export const filteredByLyrics = (videos, query) => {
  return {
    type: "GET_FILTERED_LYRICS",
    // bands: videos
    payload: {lyrics: videos, query: query} 
  };
};