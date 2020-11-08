
import React, { useState } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import '../Tags.css';

import { tags } from '../actions/tags'
import { removeTagsAction } from '../actions/tags'
import { getVideo } from '../actions/video'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { XIcon } from '@primer/octicons-react'

const AddTagsBox = (props) => {

  // useSelector is similar to setStateToProps
  const video = useSelector(state => state.video);
  let currentTags = useSelector(state => state.tags);

  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();
  const [currentVideo, setCurrentVideo] = useState(video);

  const handleAddTag = (e) => {
    let newTag = e.target.value.trim()
    if (newTag !== "") {
    dispatch(tags(newTag));
    video.tags = [...video.tags, {name: newTag}]
    dispatch(getVideo(video));
    e.target.value = ""
    }
  }

  const removeTag = (idxToRemove) => {

    console.log(idxToRemove, "idxtoremove");
    // optimistic tags do not have id yet
    
    let filteredTags = video.tags.filter((_, index) => index !== idxToRemove);
    console.log(filteredTags, "filteredTags");
    
    dispatch(getVideo(video));
    
    setCurrentVideo(video.tags = filteredTags)
    // video.tags = video.tags.filter((tag) => tag.id !== idToRemove);

    // dispatch(getVideo(video));
    // dispatch(removeTagsAction(tagNameToRemove));


    // let tagToRemove = video.tags.find((tag) => tag.id === idToRemove);
    // console.log(tagToRemove, "====tagtoremove===");

    // dispatch(deleteVideo(updatedVideos));

  }

  return (
    <>
    <div className="tags-input">
      <ul id="tags">
        {
          video.tags ?
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
        
      </ul>
      <Form.Group controlId="tags-input">
        <Form
        placeholder="Press enter to add tags"
        as="textarea" 
        rows={1}
        onKeyUp={(e) => (e.key === "Enter" ? handleAddTag(e) : null)} 
       />
      </Form.Group>
    </div>
    </>
  )
};


export default AddTagsBox
