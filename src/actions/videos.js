export const getVideos = (videos) => {
  return {
    type: "GET_VIDEOS",
    videos: videos
  };
};

export const addVideo = (videos) => {
  return {
    type: "ADD_VIDEO",
    videos: videos
  };
};

export const updateVideo = (videos) => {
  return {
    type: "UPDATE_VIDEO",
    videos: videos
  };
};

export const deleteVideo = (videos) => {
  return {
    type: "DELETE_VIDEO",
    videos: videos
  };
};

export const getTaggedVideos = (videos) => {
  return {
    type: "GET_TAGGED_VIDEOS",
    videos: videos
  };
};