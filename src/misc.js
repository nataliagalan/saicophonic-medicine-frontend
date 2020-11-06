


body {
  margin: 0;
  font-family: "Futura-Pt", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}


.dashboard-header {
  padding-top: 8rem;
  padding-bottom: 5rem;
}

.header-text {
  font-family: pragmatapro-fraktur, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 600;
  font-size: 4.5rem;
  color: #EBDFF7;
  margin-left: 1rem;
  margin-right: 1rem;
}

.nav-bg {
  /* background-color: rgb(15, 15, 15); */
  background: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.738) 19%, rgba(0, 0, 0, 0.541) 34%, rgba(0, 0, 0, 0.382) 47%, rgba(0, 0, 0, 0.278) 56.5%, rgba(0, 0, 0, 0.194) 65%, rgba(0, 0, 0, 0.126) 73%, rgba(0, 0, 0, 0.075) 80.2%, rgba(0, 0, 0, 0.042) 86.1%, rgba(0, 0, 0, 0.021) 91%, rgba(0, 0, 0, 0.008) 95.2%, rgba(0, 0, 0, 0.002) 98.2%, transparent 100%);
  /* padding-right: 8rem;
  padding-left: 8rem; */
  
}

.nav-toggle {
  border: none;
}


.nav-toggle,
.btn:active,
.btn:focus,
.btn.active {
  /* background-image: none; */
  outline: 0;
  -webkit-box-shadow: none;
          box-shadow: none;
   outline: none !important;
}

.nav-font-style {
  font-family: pragmatapro-fraktur, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, "Noto Sans", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 400;
  font-size: 1.5rem;
  color: #EBDFF7;
  padding-left: 1.5rem;

}

@media screen and (max-width: 766px) {
  .header-text { 
    font-size: 3em; 
 }
  .header-subttext { 
    font-size: 1rem; 
 }

 /* .nav-bg {
  padding-right: 1rem;
  padding-left: 1.2rem;
} */
 
}

/* @media screen and (max-width: 320px) {
  .nav-bg {
    padding-right: 0rem;
    padding-left: 0.2rem;
   
  }

} */


/* FIXES THE VIDEO IN PLACE */
.video-wrapper {
  position: -webkit-sticky;
  position: sticky;
  top: 8rem;
}

@media screen and (max-width: 766px) {

  .video-wrapper {
    position: fixed !important;
    /* top: 3rem; */
    top: 1vw;
    width: 100vw;
    padding-right: 11px;
    padding-left: 11px;
    margin-left: -50vw;
    margin-top: 100px;
    left: 50%;
    z-index: 2;
    
  }

  .edit-and-new-form {
    margin-top: 70vw;;
    z-index: 1;
  }

  .duration-seconds {
    display: none;
  }

  /* ! adjusts form width */

  .new-and-edit-video-page {
    margin-left: 2rem !important;
    margin-right: 2rem !important;
  }

}

/* FIXES THE VIDEO IN PLACE */

.header-subtext {
  font-weight: 400;
  font-size: 1.5rem;
  color: #EBDFF7;
  padding-top: 1.7rem;
  letter-spacing: .09em;
  margin-left: 1rem;
  margin-right: 1rem;
}

.btn-primary {
  background: none;
  border: 1;
  border-color: #ebdff7de;
  font-size: 1.2rem;
}

.btn-primary:hover {
  background: #ebdff7;
  border-color: #ebdff7de;
  color: #000;
}

.dynamic-input-btn {
  font-size: 2rem;
  border: none;
}
.dynamic-input-btn:hover {
  color: rgb(250, 192, 0);
  background: none;
}

.new-and-edit-video-page {
  padding-top: 8rem;
  margin-left: 4rem;
  margin-right: 4rem;
  text-align: center;
}

.duration-seconds, h3 {
  color: #EBDFF7;
  letter-spacing: .09em;
}

#formBasicRangeCustom::-webkit-slider-thumb {
  background: rgb(250, 192, 0);
  
}

.page-content-wrapper {
  /* TODO ADJUST THIS SOLUTION LATER */
  padding-top: 3.8rem;
  margin-left: 2rem;
  margin-right: 2rem;
  text-align: center;
}
.song-accordion {
  background: #fdfbff;
  border-radius: 0;
}

.plus-accordion {
  background: #fffced;
  /* border-radius: 0; */
}

.custom-spacer {
  padding-bottom: 1.8rem;
}

.login-page-content-wrapper {
  padding-top: 13rem;
  margin-left: 2rem;
  margin-right: 2rem;
}

.accordion-time-title {
  color: #000;
}

/* this adds scrolling ability to lyrics accordion */
.overflow-auto {
  max-height: 380px;
  text-align: left;
  padding-left: 3rem;
}
















// CSSS







return (
  <>
  <Navbar collapseOnSelect expand="lg" className="nav-bg" fixed="top" >


    <Navbar >
      <Link to="/videos">
        <Navbar.Brand><img src={logo} className="imgFluid" style={{maxWidth: '50px'}} /> </Navbar.Brand>
      </Link>
    </Navbar>
    <Navbar >
      <SearchForm  />
    </Navbar>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />

    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        {/* <Nav.Link href="/videos/new" id="menu-toggle">ADD VIDEO +</Nav.Link> */}
        <Link to="/videos/new" id="menu-toggle" className="nav-font-style">Add Video</Link>
      {
        (auth.id) ?
        (<Link 
          to='/admin' 
          id="menu-toggle" className="nav-font-style"
          onClick={ handleLogout }>
          Logout
        </Link>)
        : 
        (<Link to='/admin' id="menu-toggle" className="nav-font-style" >
          Login
        </Link>)
      }
      </Nav>
    </Navbar.Collapse>

      
  </Navbar>
  </>
);






import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import VideoCard from '../components/VideoCard';
import VideoDashboard from './VideoDashboard'

class SearchResults extends Component {

  // state = {
  //   filteredVideos: [],
  //   query: "",
  //   allCount: 0,
  //   bandCount: 0,
  //   songCount: 0,
  //   lyricsCount: 0
  // }

  //THIS IS THE PARENT OF VIDEO DASHBOARD

  componentDidMount() {
    // console.log(this.props.location.pathname, "=====SEARCH RESULTS PAGE====");
    let query = this.props.location.pathname.split('/')[3]
    this.setState({ query })
    let path = this.props.location.pathname
    // this.fetchVideos(path)
  }

  // define fetchvideos in app js
  //info needed: query / path  and tab name 
  // pass in the tab and the path as arguments when invoked
  // how will the video dashboard know the pathname or query

  //invoke it from both the video dashboard and the searchform

  // fetchVideos = async (tab) => {
  // // fetchVideos = (tab) => {
  //   // console.log(tab, "=====EVENT IN FETCH VIDEOS=====");

  //   let path = this.props.location.pathname
  //   const res = await fetch(`http://localhost:3001/api/v1/${path}`);
  //   const videos = await res.json();


  //   this.filterResults(videos, tab)
  //   this.setLocalStateCount(videos)
  //   // this.props.getVideos(videos);
  // };

  // setLocalStateCount = (videos) => {
  //   let query = this.props.location.pathname.split('/')[3].toLowerCase()
  //   let filteredBySong = videos.filter(function(video) {
  //     return video.songs.some(function(song) {
  //       return song.lyrics.toLowerCase().includes(query);
  //     });
  //   });

  //   let filteredByLyrics = videos.filter(function(video) {
  //     return video.songs.some(function(song) {
  //       return song.lyrics.toLowerCase().includes(query);
  //     });
  //   });

  //   this.setState({
  //     allCount: videos.length,
  //     bandCount: videos.filter( video => video.band.toLowerCase().includes(query) ).length,
  //     songCount: filteredBySong.length,
  //     lyricsCount: filteredByLyrics.length
  //   })
  // }

  // filterResults = (videos, tab) => {
  //   let query = this.props.location.pathname.split('/')[3].toLowerCase()
  //   let filteredVideos = videos
    
  //   switch (tab) {
  //     case "all":
  //       this.props.getVideos(videos);
  //       break;
  //     case "band":
  //       filteredVideos = videos.filter( video => video.band.toLowerCase().includes(query) )
  //         this.props.getVideos(filteredVideos);
  //         break;
  //     case "songTitle":
  //       filteredVideos = videos.filter(function(video) {
  //         return video.songs.some(function(song) {
  //           return song.title.toLowerCase().includes(query);
  //         });
  //       });
  //       this.props.getVideos(filteredVideos);
  //       break;
  //     case "songLyrics":
  //       filteredVideos = videos.filter(function(video) {
  //         return video.songs.some(function(song) {
  //           return song.lyrics.toLowerCase().includes(query);
  //         });
  //       });
  //       this.props.getVideos(filteredVideos);
  //       break;
  //     default:
  //       this.props.getVideos(filteredVideos);
  //     }
  
  // }




  // "/videos/search/:query"
  render() {
    // console.log(this.props,"======search results page========");
    //TODO make a function accounts for 1 video
    let query = this.props.location.pathname.split('/')[3]
    
    return (
      <>
    <VideoDashboard /> 
   
    
      </>

    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    filteredByAll: state.filteredByAll,
    // videos: state.videos.videos,
    // auth: state.auth
  };
};

const setDispatchToProps = {
  // currentUser,
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(SearchResults);






//======================!SEARCH RESULTS=======================









// else if (tab === "bands"){
    //   let videos = this.props.filteredByBand.bands.map((video) => {
    //     return (<VideoCard
    //       {...video}
    //       key={video.id}
    //      />)
    //     })
    //     return videos
    // }

    // switch (tab) {
    //   case "all":
    //     let videos = this.props.filteredByAll.map((video) => {
    //       return (<VideoCard
    //         {...video}
    //         key={video.id}
    //        />)
    //       })
    //       return videos
    //     break;
    //   case "band":
    //     videos = this.props.filteredByAll.filter( video => video.band.toLowerCase().includes(query) )
    //       this.props.getVideos(filteredVideos);
    //       break;
    //   case "songTitle":
    //     filteredVideos = this.props.filteredByAll.filter(function(video) {
    //       return video.songs.some(function(song) {
    //         return song.title.toLowerCase().includes(query);
    //       });
    //     });
    //     this.props.getVideos(filteredVideos);
    //     break;
    //   case "songLyrics":
    //     filteredVideos = this.props.filteredByAll.filter(function(video) {
    //       return video.songs.some(function(song) {
    //         return song.lyrics.toLowerCase().includes(query);
    //       });
    //     });
    //     this.props.getVideos(filteredVideos);
    //     break;
    //   default:
    //     this.props.getVideos(filteredVideos);
    //   }




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



