import React from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { thunkFetchTaggedVideos } from '../actions/videos';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

const Tags = (props) => {
  const { tags } = props
  const dispatch = useDispatch();

  return (
    tags ? 
    (tags.map((tag, idx) => (
      <Button
        key={idx}
        style={{border: 'none'}} 
        className="ind-tag"
        as={Link} 
        onClick={() => dispatch(thunkFetchTaggedVideos(tag.name))}
        to={`/tagged/${tag.name}`}
        >
        {tag.name}
      </Button>
    ))) 
    : 
    null
  )
};

export default withRouter(Tags);



