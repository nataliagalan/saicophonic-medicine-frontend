export const filteredByLyrics = (videos, query) => {
  return {
    type: "GET_FILTERED_LYRICS",
    payload: {lyrics: videos, query: query} 
  };
};