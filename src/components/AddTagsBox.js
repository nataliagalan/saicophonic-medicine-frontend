
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import '../Tags.css';
import { getVideo } from '../actions/video'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { XIcon } from '@primer/octicons-react'
import TagSearchForm from './TagSearchForm';
import { tags } from '../actions/tags'


const AddTagsBox = (props) => {

  console.log(props.editMode, "==propseditmode==");
  //when adding a new video, there is no video in state
  
  // useSelector is similar to setStateToProps
  const video = useSelector(state => state.video);
  let currentTags = useSelector(state => state.tags);

  //current Tags is a tag array that gets filled after you hit enter
  
  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();
  const [currentVideo, setCurrentVideo] = useState(video);
  
  // useEffect(() => {
  //   // code to run on component mount
  //   dispatch(editMode({editMode: "true"}));
  // }, [])

  //possibly delete this, moved functionality to TagSearchForm
  // const handleAddTag = (e) => {
  //   let newTag = e.target.value.trim()
  //   if (newTag !== "") {
  //     //if new do below
  //   dispatch(tags(newTag));

  //   //if edit do below , if video.tags
  //   // video.tags = [...video.tags, {name: newTag}]
  //   // dispatch(getVideo(video));
  //   e.target.value = ""
  //   }
  // }

  const removeTag = (idxToRemove) => {
    let filteredTags = video.tags.filter((_, index) => index !== idxToRemove);
    dispatch(getVideo(video));
    setCurrentVideo(video.tags = filteredTags)
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


//if video.id, video.tags.map
//if !video.id && 

// (
//   currentTags.map((tag, idx) => <li className="tag" key={idx}>
//   <span>{tag}</span>
//   <Button onClick={() => removeTag(idx)}>
//     <XIcon 
//       key={idx}
//       size={16} />
//   </Button>
//   </li>)
//   )