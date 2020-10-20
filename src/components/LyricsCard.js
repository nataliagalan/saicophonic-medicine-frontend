import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'


class LyricsCard extends Component {
  render() {
    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            02:00 - Has This Hit
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Another disappointed soul
            Well I try
            I try to keep it in control
            Well I
            I will end up on the dole
            It's my life
            And now fall into it I go
            Well Blue, you've got me on the go
            So don't worry
            You'll never know
            Your eyes
            Are never cold
            To me
            Well at least that's what I was told
            Girl
            You made
            My dreams come true
            It's all a clue
            It's all for you
            Myself is still eighteen
            In cue
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
        </Card>
      </Accordion>
    )
  }
}

export default LyricsCard 
