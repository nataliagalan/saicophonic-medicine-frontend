
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import '../Tags.css';
import { getVideo } from '../actions/video'
import { deleteTag } from '../actions/tags'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { XIcon } from '@primer/octicons-react'
import TagSearchForm from './TagSearchForm';
import { tags } from '../actions/tags'


const AddTagsBox = (props) => {
  const video = useSelector(state => state.video);
  let currentTags = useSelector(state => state.tags);

  const dispatch = useDispatch();
  const [currentVideo, setCurrentVideo] = useState(video);
  const [stateTags, setCurrentStateTags] = useState(currentTags);
  

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
      {/* <Form.Group controlId="tags-input">
        <Form
        placeholder="Press enter to add tags"
        as="textarea" 
        rows={1}
        onKeyUp={(e) => (e.key === "Enter" ? handleAddTag(e) : null)} 
       />
      </Form.Group> */}
      <ul id="tags">
        {
          (video.id && props.editMode === true) ?
          video.tags.map((tag, idx) => <li className="tag" key={idx}>
          <span>{tag.name}</span>
          <Button onClick={() => removeTag(idx)}>
            <XIcon 
              key={idx}
              size={16} />
          </Button>
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

