import React, { Component } from 'react'
import { connect } from 'react-redux';
import VideoContainer from '../components/VideoContainer';
import Container from 'react-bootstrap/Container';


class TaggedResults extends Component {
  render() {
    let tag = this.props.location.pathname.split('/')[3]
    return (
      <>
        <Container fluid>
          <div className="page-content-wrapper">
            <div className="dashboard-header">
            <h5 className="header-subtext">All videos tagged with "{tag}"</h5>
            </div>

            {this.props.videos ?
            (<VideoContainer videos={this.props.videos} />)
            :
            <h5 className="header-subtext">no videos tagged with "{tag}"</h5>
            }
          </div>
        </Container>
      </>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    auth: state.auth
  };
};


export default connect(setStateToProps, null)(TaggedResults);


