import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import VideoCard from '../components/VideoCard';


class VideoDashboard extends Component {

  componentDidMount() {
    const token = localStorage.getItem('myAppToken') 
    if(!token){
      this.fetchVideos()
    } else {
      this.fetchUser()
    }

    this.fetchVideos()

    //TODO change this and use store
    // if(this.props.resultCount){
    //   this.props.fetchVideos(this.props.query, "all")
    // } else {
    //   this.fetchVideos()
    // }
    

  }


  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
    // this.props.getVideos(videos, "all");
    this.props.getVideos(videos);
  };

  fetchUser = async () => {
    const token = localStorage.getItem('myAppToken') 
    const reqObj = {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    const res = await fetch('http://localhost:3001/api/v1/current_user', reqObj);
    const data = await res.json();
    if(data.error) {
      this.props.history.push('/admin')
    } else {
      //need to store the user (data) in store state
      this.props.currentUser(data)
    }
  }

  
  displayFilterTabs = () => {
    // console.log(this.props.query, "============query video dashboard===========");
    const { query } = this.props
    return (
      <Nav fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Nav.Link 
            eventKey="all"
            title="all"
            onClick={() => this.videosToshow("all")}
          >
              All({this.props.filteredByAll.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.videosToshow("bands")}
            title="band"
            // eventKey="link-2">Artist/Bands({this.props.bands})</Nav.Link>
            eventKey="band">Artist/Bands({this.props.filteredByBand.bands.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.videosToshow("songs")}
            title="songTitle"
            eventKey="songTitle">Songs({this.props.songCount})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.videosToshow("lyrics")}
            title="songLyrics"
            eventKey="songLyrics">Lyrics({this.props.lyricsCount})</Nav.Link>
        </Nav.Item>
      </Nav> )
  }

  videosToshow = (tab) => {
    //check a boolean in state
    if(tab === "all") {
      let videos = this.props.filteredByAll.map((video) => {
        return (<VideoCard
          {...video}
          key={video.id}
         />)
        })
        return videos
    } 
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

  }


  render() {
    // console.log(this.props, "======VIDEO DASHBOARD=====");
    return (
      <div className="page-content-wrapper">
        <div className="dashboard-header">
          <h1 className="header-text">Saicophonic Medicine</h1>
          <h5 className="header-subtext">An expanding library of live music sessions</h5>
        </div>
        {
          this.props.resultCount ?
          (<><h3>{this.props.resultCount}</h3><br></br></>)
          :
          (null)
        }
        {/* <Container fluid> */}

        {/* {
          this.props.resultCount ?
          (this.displayFilterTabs())
          :
          (null)
        } */}
        {this.displayFilterTabs()}
        {this.videosToshow()}
          
        {/* </Container> */}


      </div>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    filteredByAll: state.filteredByAll,
    filteredByBand: state.filteredByBand,
    // videos: state.videos.videos,
    // all: state.videos.all,
    // bands: state.videos.bands,
    // songs: state.videos.songs,
    // lyrics: state.videos.lyrics,
    auth: state.auth
  };
};

const setDispatchToProps = {
  currentUser,
  getVideos
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);