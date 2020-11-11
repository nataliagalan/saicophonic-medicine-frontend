
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Line from '../components/Line';

import React, { Component } from 'react'

export default class MyFooter extends Component {
  render() {
    return (
      <div className="sticky-bottom">  
      <Line color="white" />
          <Navbar color="dark" dark>
              <Container>
                  <Navbar.Brand>Footer</Navbar.Brand>
              </Container>
          </Navbar>
      </div>
    )
  }
}