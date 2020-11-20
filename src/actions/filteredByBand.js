export const filteredByBand = (videos, query) => {
  return {
    type: "GET_FILTERED_BAND",
    payload: {bands: videos, query: query} 
  };
};
