

export const getVideos = (videos) => {
  return {
    type: "GET_VIDEOS",
    videos: videos,
  };
};