

// export const addTag = (video, newTag) => {
//   return {
//     type: "ADD_TAG",
//     payload: {video: video, newTag: newTag}
//   };
// };
export const tags = (newTag) => {
  return {
    type: "ADD_TAG",
    newTag: newTag
  };
};

export const removeTagsAction = (tagNameToRemove) => {
  return {
    type: "REMOVE_TAG",
    tagNameToRemove: tagNameToRemove
  };
};