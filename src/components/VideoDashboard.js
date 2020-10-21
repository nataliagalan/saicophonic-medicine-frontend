import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import Container from 'react-bootstrap/Container';
import VideoContainer from './VideoContainer';
// import $ from 'jquery';

class VideoDashboard extends Component {

  componentDidMount() {
    // $("#menu-toggle").click(function(e) {
    //   e.preventDefault();
    //   $("#wrapper").toggleClass("toggled");
    // });
    this.fetchVideos()
  }

  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
    this.props.getVideos(videos);
  };


  render() {
    console.log(this.props.videos);
    return (
      <div className="page-content-wrapper">
        <Container fluid>
          {
            this.props.videos.map((video) => {
              return <VideoContainer
                video={video}
                key={video.id}
               />
              })
          }
        </Container>
      </div>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos
  };
};

const setDispatchToProps = {
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);