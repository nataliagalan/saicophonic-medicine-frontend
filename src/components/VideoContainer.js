import React, { Component } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VideoCard from './VideoCard';
import LyricsCard from './LyricsCard';

class VideoContainer extends Component {

  render() {
    return (
      <>
      {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <Container fluid>
            <Row>
              {/* render video cards with map */}
              <div class="col-lg-12">
                <VideoCard />
              </div>
              <div class="col-lg-12">
                <LyricsCard />
              </div>
            </Row>
          </Container>
        </div>
      {/* <!-- /#page-content-wrapper --> */}
      </>
    )
  }
}


export default VideoContainer 