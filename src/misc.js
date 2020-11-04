import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from './actions/videos';
import { BrowserRouter, Route, Switch } from "react-router-dom";

//potentially delete this files
import logo from './logo.svg';
import './App.css';

// added after watching this video but didn't have it before and styles where still working
// TODO look into this https://www.youtube.com/watch?v=8pKjULHzs0s&feature=youtu.be
import 'bootstrap/dist/css/bootstrap.min.css'

import MyNavbar from './components/MyNavbar';
import New from './pages/New';
import VideoDashboard from './pages/VideoDashboard';
import Edit from './pages/Edit';
import Show from './pages/Show';
import Login from './pages/Login';
import SearchResults from './pages/SearchResults';


class App extends Component {

  state = {
    allCount: 0,
    bandCount: 0,
    songCount: 0,
    lyricsCount: 0
  }

  // define fetchvideos in app js
  //info needed: query / path  and tab name 
  // pass in the tab and the path as arguments when invoked
  //pass fetchVideos as props to both 
    // 1.search results -> viddashboard
    // 2.mynavbar -> searchform
  // how will the video dashboard know the pathname or query

  //invoke it from both the video dashboard and the searchform

  //hardcoded path, query temporarily

  fetchVideos = async (query, tab) => {

      const res = await fetch(`http://localhost:3001/api/v1/videos/search/${query}`);
      const videos = await res.json();
  
  
      this.filterResults(tab, query, videos)
      this.setLocalStateCount(query, videos )
      // this.props.getVideos(videos);
    };
  
    setLocalStateCount = (query, videos) => {
      // let query = this.props.location.pathname.split('/')[3].toLowerCase()
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

    filterResults = (tab, query, videos) => {
      // let query = this.props.location.pathname.split('/')[3].toLowerCase()
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


  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MyNavbar 
            fetchVideos={this.fetchVideos} 
            allCount={this.state.allCount}
            bandCount={this.state.bandCount}
            songCount={this.state.songCount}
            lyricsCount={this.state.lyricsCount} />
          <Switch>
            <Route exact path="/admin" component={Login} />
            {/* <Route exact path="/videos/search/:query" component={SearchResults} /> */}
            <Route 
              exact path="/videos/search/:query" 
              render={(props) => ( <SearchResults {...props} 
                fetchVideos={this.fetchVideos} 
                allCount={this.state.allCount}
                bandCount={this.state.bandCount}
                songCount={this.state.songCount}
                lyricsCount={this.state.lyricsCount} /> )} />
            <Route exact path="/videos" component={VideoDashboard} />
            <Route exact path="/videos/new" component={New} />
            <Route exact path="/videos/:id" component={Show} />
            <Route exact path="/videos/edit/:id" component={Edit} />
          </Switch>
        </div>
        {/* <!-- /.App --> */}
      </BrowserRouter>
    );
  }
}

// export default App;

const setStateToProps = (state) => {
  return {
    videos: state.videos,
  };
};

const setDispatchToProps = {
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(App);



