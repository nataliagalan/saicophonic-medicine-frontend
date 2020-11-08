
import React from 'react';
import '../Tags.css';
import Form from 'react-bootstrap/Form';
import { XIcon } from '@primer/octicons-react'

const AddTagsBox = () => {

  return (
    <>
    <div className="tags-input">
      <ul id="tags">
        <li className="tag">
          <span>Tag</span>
          <XIcon size={16} />
        </li>
      </ul>
      <Form.Group controlId="tags-input">
        <Form.Control 
        placeholder="Press enter to add tags"
        as="textarea" 
        rows={3} />
      </Form.Group>
    </div>
    </>
  )
};


export default AddTagsBox
