import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import VideoDashboard from '../components/VideoDashboard'

class SearchResults extends Component {


  componentDidMount() {
    // console.log(this.props.location.pathname, "=====SEARCH RESULTS PAGE====");
    let path = this.props.location.pathname
    this.fetchVideos(path)
    // const token = localStorage.getItem('myAppToken') 
    // if(token){
    //   this.fetchUser()
    // } 
  }

  fetchVideos = async (path) => {
    const res = await fetch(`http://localhost:3001/api/v1/${path}`);
    const videos = await res.json();
    this.props.getVideos(videos);
  };

  // "/videos/search/:query"
  render() {
    // console.log(this.props,"======search results page========");
    let query = this.props.location.pathname.split('/')[3]
    return (
      <div>

        <VideoDashboard {...this.props.videos} resultCount={`2 results for “${query}”`}/>

      </div>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    // auth: state.auth
  };
};

const setDispatchToProps = {
  // currentUser,
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(SearchResults);
