import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { getTaggedVideos } from '../actions/videos';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const Tags = (props) => {

  const { tags } = props

   // useSelector is similar to setStateToProps
   const videos = useSelector(state => state.videos);

     //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();

  const fetchTaggedVideos = async (tag) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/tagged/${tag}`);
    const filteredVideosByTag = await res.json();
    if(filteredVideosByTag.error) {
    } else {
      dispatch(getTaggedVideos(filteredVideosByTag));
      // props.history.push(`/videos/tagged/${tag}`)
    }

  }

  return (
    tags ? 
    (tags.map(tag => (
      <Button
        style={{border: 'none'}} 
        as={Link} 
        onClick={() => fetchTaggedVideos(tag.name)}
        to={`/videos/tagged/${tag.name}`}
        >
        {tag.name}
      </Button>
    ))) 
    : 
    null
  )

};

export default withRouter(Tags);



