import React from 'react';

const Tags = ({tags}) => {
  console.log(tags, " props in tags");
  return (
    tags ? 
    (tags.map(tag => (
      <div className="ind-tag">{tag.name}</div>
    ))) 
    : 
    null
  )

};

export default Tags

