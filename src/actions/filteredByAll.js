export const filteredByAll = (videos) => {
  return {
    type: "GET_FILTERED_ALL",
    all: videos
  };
};