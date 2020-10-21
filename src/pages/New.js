import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { addVideo } from '../actions/videos'


class New extends Component {
  render() {
    return (
      <Form>
        <Form.Row>
          <Col xs={7}>
            <Form.Control placeholder="City" />
          </Col>
          <Col>
            <Form.Control placeholder="State" />
          </Col>
          <Col>
            <Form.Control placeholder="Zip" />
          </Col>
        </Form.Row>
      </Form>
    )
  }
}


export default New