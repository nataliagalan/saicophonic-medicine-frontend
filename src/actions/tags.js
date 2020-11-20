export const tags = (newTag) => {
  return {
    type: "ADD_TAG",
    newTag: newTag
  };
};

export const clearTags = () => {
  return {
    type: "CLEAR_TAGS"
  };
};

export const deleteTag = (tags) => {
  return {
    type: "DELETE_TAG",
    tags: tags
  };
};

