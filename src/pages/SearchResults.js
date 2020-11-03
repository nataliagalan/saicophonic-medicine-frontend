import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import VideoDashboard from '../components/VideoDashboard'

class SearchResults extends Component {

  state = {
    filteredVideos: [],
    query: ""
  }

  //THIS IS THE PARENT OF VIDEO DASHBOARD

  componentDidMount() {
    // console.log(this.props.location.pathname, "=====SEARCH RESULTS PAGE====");
    let query = this.props.location.pathname.split('/')[3]
    this.setState({ query })
    let path = this.props.location.pathname
    this.fetchVideos(path)
  }

  fetchVideos = async (path) => {
    const res = await fetch(`http://localhost:3001/api/v1/${path}`);
    const videos = await res.json();
    this.props.getVideos(videos);
  };

  filterResults = (query) => {
    console.log("filterResults");
    // let filteredVideos = this.props.videos.filter( video => video.band.toLowerCase().includes(query) )

    // this.setState({ filteredVideos })

    // this.videosToShow(query)

  //on artist/band tab click
  //trigger a function that
  //check to see if band name includes the query
  // only render those videos whose band name includes the query
  // only send those videos whose band name includes the query
  //as props to videodashboard
  }




  // "/videos/search/:query"
  render() {
    console.log(this.props,"======search results page========");
    //TODO make a function accounts for 1 video
    let query = this.props.location.pathname.split('/')[3]
    
    return (
      <>
      {/* <VideoDashboard  
      fetchVideos={this.fetchVideos}
      /> */}
        <VideoDashboard 
          // {...this.props.videos} 
          // {...this.videosToShow} 
          resultCount={ 
            this.props.videos.length === 1 ?
            (`${this.props.videos.length} result for “${query}”`)
            :
            (`${this.props.videos.length} results for “${query}”`)
          }
          filterResults={this.filterResults}
          />
      </>
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


