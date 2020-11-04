export const filteredByBand = (videos, query) => {
  return {
    type: "GET_FILTERED_BAND",
    // bands: videos
    payload: {bands: videos, query: query} 
  };
};
