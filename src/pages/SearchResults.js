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
    // const token = localStorage.getItem('myAppToken') 
    // if(token){
    //   this.fetchUser()
    // } 
  }

  fetchVideos = async (path) => {
    const res = await fetch(`http://localhost:3001/api/v1/${path}`);
    const videos = await res.json();
    this.setState({ filteredVideos: videos })
    //CHANGE THE VIDEOS THAT GET DISPATCHED BASED ON FILTER BY
    //FILTER VIDEOS, THEN DISPATCH ACTION

     let updatedVideos = videos.filter( v => v.band.toLowerCase().includes(this.state.query.toLowerCase()) )

    this.props.getVideos(updatedVideos);
  };

  filterResults = (query) => {
    console.log("filterResults");
    let filteredVideos = this.props.videos.filter( video => video.band.toLowerCase().includes(query) )

    this.setState({ filteredVideos })

    this.videosToShow(query)

  //on artist/band tab click
  //trigger a function that
  //check to see if band name includes the query
  // only render those videos whose band name includes the query
  // only send those videos whose band name includes the query
  //as props to videodashboard
  }

  videosToShow = () => {
    console.log("what");
    // let updatedVideos = this.state.filteredVideos.filter( v => v.band.toLowerCase().includes(this.state.query.toLowerCase()) )

   
    // return updatedVideos 
    // switch (this.state.sortBy) {
    //   case "Category":
    //     return updatedTrans = updatedTrans.sort((a, b) => a.category.toLowerCase() > b.category.toLowerCase() ? 1 : -1 )
    //     case "Description":  
    //     return updatedTrans = updatedTrans.sort((a, b) => a.description.toLowerCase() > b.description.toLowerCase() ? 1 : -1 )
    //     default: 
    //     return updatedTrans 
    //   }

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
          fetchVideos={this.fetchVideos}
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


