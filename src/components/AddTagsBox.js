
import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import '../Tags.css';
import { getVideo } from '../actions/video'
import { deleteTag } from '../actions/tags'
import Button from 'react-bootstrap/Button';
import { XIcon } from '@primer/octicons-react'
import TagSearchForm from './TagSearchForm';
import Line from './Line';


const AddTagsBox = (props) => {
  const video = useSelector(state => state.video);
  let currentTags = useSelector(state => state.tags);

  const dispatch = useDispatch();
  const [currentVideo, setCurrentVideo] = useState(video);
  

  const removeTag = (idxToRemove) => {
    if(video.id && props.editMode === true){
      let filteredTags = video.tags.filter((_, index) => index !== idxToRemove);
      dispatch(getVideo(video));
      setCurrentVideo(video.tags = filteredTags)
    } else if(props.editMode === false){
     let filteredTags = currentTags.filter((_, index) => index !== idxToRemove);
     dispatch(deleteTag(filteredTags));
    }
  }

  return (
    <>
    <div className="tags-input">
      <TagSearchForm />
      <br></br>
      <ul id="tags">
        {
          (video.id && props.editMode === true) ?
          video.tags.map((tag, idx) => <li className="tag" key={idx}>
          <span className="tag-text">{tag.name}</span>
          <span onClick={() => removeTag(idx)} className="tag-delete-icon">
            <XIcon 
              key={idx}
              verticalAlign='middle'
              size={10} />
          </span>
          </li>)
          :
          null
        }
        {
          (props.editMode === false) ?
          currentTags.map((tag, idx) => <li className="tag" key={idx}>
          <span>{tag}</span>
          <Button onClick={() => removeTag(idx)}>
            <XIcon 
              key={idx}
              size={16} />
          </Button>
          </li>)
          :
          null
        }
      </ul>
      
    </div>
    </>
  )
};


export default AddTagsBox

