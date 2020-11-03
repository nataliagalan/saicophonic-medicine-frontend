import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import VideoDashboard from '../components/VideoDashboard'

class SearchResults extends Component {

  state = {
    filteredVideos: [],
    query: "",
    allCount: 0,
    bandCount: 0,
    songCount: 0,
    lyricsCount: 0
  }

  //THIS IS THE PARENT OF VIDEO DASHBOARD

  componentDidMount() {
    // console.log(this.props.location.pathname, "=====SEARCH RESULTS PAGE====");
    let query = this.props.location.pathname.split('/')[3]
    this.setState({ query })
    let path = this.props.location.pathname
    // this.fetchVideos(path)
  }

  fetchVideos = async (tab) => {
  // fetchVideos = (tab) => {
    // console.log(tab, "=====EVENT IN FETCH VIDEOS=====");

    let path = this.props.location.pathname
    const res = await fetch(`http://localhost:3001/api/v1/${path}`);
    const videos = await res.json();


    this.filterResults(videos, tab)
    this.setLocalStateCount(videos)
    // this.props.getVideos(videos);
  };

  setLocalStateCount = (videos) => {
    let query = this.props.location.pathname.split('/')[3].toLowerCase()
    let filteredBySong = videos.filter(function(video) {
      return video.songs.some(function(song) {
        return song.lyrics.toLowerCase().includes(query);
      });
    });

    let filteredByLyrics = videos.filter(function(video) {
      return video.songs.some(function(song) {
        return song.lyrics.toLowerCase().includes(query);
      });
    });

    this.setState({
      allCount: videos.length,
      bandCount: videos.filter( video => video.band.toLowerCase().includes(query) ).length,
      songCount: filteredBySong.length,
      lyricsCount: filteredByLyrics.length
    })
  }

  filterResults = (videos, tab) => {
    let query = this.props.location.pathname.split('/')[3].toLowerCase()
    let filteredVideos = videos
    
    switch (tab) {
      case "all":
        this.props.getVideos(videos);
        break;
      case "band":
        filteredVideos = videos.filter( video => video.band.toLowerCase().includes(query) )
          this.props.getVideos(filteredVideos);
          break;
      case "songTitle":
        filteredVideos = videos.filter(function(video) {
          return video.songs.some(function(song) {
            return song.title.toLowerCase().includes(query);
          });
        });
        this.props.getVideos(filteredVideos);
        break;
      case "songLyrics":
        filteredVideos = videos.filter(function(video) {
          return video.songs.some(function(song) {
            return song.lyrics.toLowerCase().includes(query);
          });
        });
        this.props.getVideos(filteredVideos);
        break;
      default:
        this.props.getVideos(filteredVideos);
      }
  
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
          fetchVideos={this.fetchVideos}
          allCount={this.state.allCount}
          bandCount={this.state.bandCount}
          songCount={this.state.songCount}
          lyricsCount={this.state.lyricsCount}
          />
      </>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    // videos: state.videos.videos,
    // auth: state.auth
  };
};

const setDispatchToProps = {
  // currentUser,
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(SearchResults);


