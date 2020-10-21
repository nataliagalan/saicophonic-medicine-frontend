import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';



class LyricsCard extends Component {
  render() {
    const { lyrics } = this.props
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            02:00 - Has This Hit
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{lyrics}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="1">
            07:00 - Ceiling
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Lyrics Here</Card.Body>
          </Accordion.Collapse>
          <Row>
            <Col>
              <Card.Link href="#">✏️</Card.Link>
              <Card.Link href="#">👀</Card.Link>
              <Card.Link href="#">🗑</Card.Link>
            </Col>
          </Row>
        </Card>
      </Accordion>
    )
  }
}

export default LyricsCard 
