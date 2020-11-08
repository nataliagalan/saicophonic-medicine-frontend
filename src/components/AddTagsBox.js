
import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import '../Tags.css';

import { tags } from '../actions/tags'
import { getVideo } from '../actions/video'
import Form from 'react-bootstrap/Form';
import { XIcon } from '@primer/octicons-react'

const AddTagsBox = (props) => {

  // useSelector is similar to setStateToProps
  const video = useSelector(state => state.video);
  const updatedTags = useSelector(state => state.tags);

  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();


  const handleAddTag = (e) => {
    let newTag = e.target.value.trim()
    if (e.key === "Enter" && newTag !== "") {
    dispatch(tags(newTag));
    video.tags = [...video.tags, {name: newTag}]
    dispatch(getVideo(video));
    e.target.value = ""
    }
  }

  return (
    <>
    <div className="tags-input">
      <ul id="tags">
        {
          video.tags ?
          video.tags.map((tag, idx) => <li className="tag" key={idx}>
          <span>{tag.name}</span>
          <XIcon size={16} />
          </li>)
          :
          null
        }
        
      </ul>
      <Form.Group controlId="tags-input">
        <Form.Control 
        placeholder="Press enter to add tags"
        as="textarea" 
        rows={1}
        // onKeyUp={(e) => (e.key === "Enter" ? handleAddTag(e) : null)} 
        onKeyUp={handleAddTag} 
       />
      </Form.Group>
    </div>
    </>
  )
};


export default AddTagsBox
