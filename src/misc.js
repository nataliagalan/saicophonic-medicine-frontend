
/* hide togglegrid button at any screen less than 375 */

@media screen and (max-width: 414px) {
  #toggle-grid-btn { 
    display: none;
 }
 
}
@media screen and (max-width: 766px) {
  .header-text { 
    font-size: 3em; 
 }
  .header-subttext { 
    font-size: 1rem; 
 }
 
}


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



  <Navbar className="main white nav-margins" expand="lg">
  <Col>
    <Navbar.Brand as={Link} to="/videos" href="/videos">
      <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} alt="logo that looks like a yin yang symbol inside a pill"/> 
    </Navbar.Brand>
  </Col>
  <Col>
    <Nav.Item> 
      <SearchForm /> 
    </Nav.Item>
  </Col>

  <Col>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto parent">
        <Nav.Link style={{cursor: 'pointer'}} onClick={handleToggleGrid}>
          <GridIcon color={"white"}/>
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/videos"
          href="/videos" 
          id="menu-toggle" 
          className="nav-font-style">
            Videos
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/random"
          href="/random" 
          id="menu-toggle" 
          className="nav-font-style">
            Random
        </Nav.Link>
        <Nav.Link 
          as={Link} 
          to="/videos/new"
          href="/videos/new" 
          id="menu-toggle" 
          className="nav-font-style">
            Add
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Col>
  <Col className="text-right">
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
  </Col>
</Navbar>


<Navbar className="nav-bg" fixed="top" >

<Row>
  

{/* <Col> */}
  <Navbar.Brand as={Link} to="/videos" href="/videos">
    <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} alt="logo that looks like a yin yang symbol inside a pill"/> 
  </Navbar.Brand>
{/* </Col> */}



<Col>
  <Nav.Item> 
    <SearchForm /> 
  </Nav.Item>
</Col>



{/* <Col> */}
  <Nav.Item style={{cursor: 'pointer'}} onClick={handleToggleGrid}>
    <GridIcon color={"white"}/>
  </Nav.Item>
{/* </Col> */}


  
</Row>
</Navbar>

<Col>
{
  video.id && props.location.pathname !== "/videos" ? 
  null
  :
  (
  showGrid ? 
  (<Nav.Item style={{cursor: 'pointer'}} onClick={handleToggleGrid}> 
    <span style={{color: "white"}}><ThreeBarsIcon size={16} /></span> 
  </Nav.Item>)
  :
  (<Nav.Item style={{cursor: 'pointer'}} onClick={handleToggleGrid}>< GridIcon color={"white"}/></Nav.Item>)
  )
}
</Col>


<Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />

        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
        <Col>
          <Nav.Link 
            as={Link} 
            to="/videos"
            href="/videos" 
            id="menu-toggle" 
            className="nav-font-style">
              Videos
          </Nav.Link>
        </Col>
        <Col>
          <Nav.Link 
            as={Link} 
            to="/random"
            href="/random" 
            id="menu-toggle" 
            className="nav-font-style">
              Random
          </Nav.Link>
        </Col>
        <Col>
          {
            auth.id && (<Nav.Link 
              as={Link} 
              to="/videos/new"
              href="/videos/new" 
              id="menu-toggle" 
              className="nav-font-style">
                Add
            </Nav.Link>)
          }
        </Col>
        </Nav>
      </Navbar.Collapse>


import React from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logoutSuccess } from '../actions/auth'
import { toggleGrid } from '../actions/toggleGrid'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {Link} from 'react-router-dom';
import logo from '../logo.png'
import SearchForm from './SearchForm';
import GridIcon from './GridIcon';
import { OrganizationIcon, ThreeBarsIcon } from '@primer/octicons-react'

const MyNavbar = (props) => {
    //useSelector is similar to setStateToProps
    const auth = useSelector(state => state.auth);
    const video = useSelector(state => state.video);
    const showGrid = useSelector(state => state.toggleGrid);
    //useDispatch is similar to setDispatchToProps
    const dispatch = useDispatch();

   

    const handleLogout = () => {
      localStorage.removeItem('myAppToken')
      dispatch(logoutSuccess())
    }
    const handleToggleGrid = () => {
      // console.log(props,"==========CLICKED==========");
      dispatch(toggleGrid())
    }
    
    // console.log(props.location,"==========MY NAVBAR PROPS==========");

    return (
      <>

    <Navbar fluid="true" collapseOnSelect expand="lg" className="nav-bg" fixed="top" >
      <Container fluid >
        <Row>


        <Navbar.Brand as={Link} to="/videos" href="/videos">
          <img src={logo} className="imgFluid" style={{maxWidth: '50px'}} alt="logo that looks like a yin yang symbol inside a pill"/> 
        </Navbar.Brand>
        <Nav.Item> 
          <SearchForm /> 
        </Nav.Item>

        {
          video.id && props.location.pathname !== "/videos" ? 
          null
          :
          (
          showGrid ? 
          (<Nav.Item style={{cursor: 'pointer'}} onClick={handleToggleGrid}> 
            <span style={{color: "white"}}><ThreeBarsIcon size={16} /></span> 
          </Nav.Item>)
          :
          (<Nav.Item style={{cursor: 'pointer'}} onClick={handleToggleGrid}>< GridIcon color={"white"}/></Nav.Item>)
          )
        }
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle" />
      </Container>
  
      <Container fluid >
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link 
              as={Link} 
              to="/videos"
              href="/videos" 
              id="menu-toggle" 
              className="nav-font-style">
                Videos
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/random"
              href="/random" 
              id="menu-toggle" 
              className="nav-font-style">
                Random
            </Nav.Link>
            {
              auth.id && (<Nav.Link 
                as={Link} 
                to="/videos/new"
                href="/videos/new" 
                id="menu-toggle" 
                className="nav-font-style">
                  Add
              </Nav.Link>)
            }
            

          </Nav>
        </Navbar.Collapse>


          
        </Row>
      </Container>
    </Navbar>
 
      </>
    );
  
}

export default withRouter(MyNavbar);










import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import VideoContainer from '../components/VideoContainer';


class VideoDashboard extends Component {

  componentDidMount() {
    const token = localStorage.getItem('myAppToken') 
    if(!token){
      this.fetchVideos()
    } else {
      this.fetchUser()
    }
    this.fetchVideos()
  }

  fetchVideos = async () => {
    const res = await fetch('http://localhost:3001/api/v1/videos');
    const videos = await res.json();
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
    return (
      <Nav fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Nav.Link 
            eventKey="all"
            title="all"
            onClick={() => this.handleTabClick("all") }
          >
              All({this.props.filteredByAll.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.handleTabClick("bands") }
            title="bands"
            eventKey="band">Artist/Bands({this.props.filteredByBand.bands.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.handleTabClick("songs")}
            title="songs"
            eventKey="songs">Songs({this.props.filteredBySong.songs.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => this.handleTabClick("lyrics")}
            title="lyrics"
            eventKey="lyrics">Lyrics({this.props.filteredByLyrics.lyrics.length})</Nav.Link>
        </Nav.Item>
      </Nav> )
  }

  findVideos = () => {
    switch (this.props.filter) {
      case "none":
        return this.props.videos
      case "all":
        return this.props.filteredByAll
      case "bands":
        return this.props.filteredByBand.bands 
      case "songs":
        return this.props.filteredBySong.songs
      case "lyrics":
        return this.props.filteredByLyrics.lyrics
      default:
        return this.props.videos
    }
  }

  handleTabClick = (tab) => {
    this.props.setFilter(tab)
  }


  render() {
    const videosToDisplay = this.findVideos()
    // console.log(this.props, "======VIDEO DASHBOARD=====");
    return (
      <Container fluid>
      <div className="page-content-wrapper">
        <div className="dashboard-header">
          <div className="dashboard-header-title"><h1 className="header-text">Saicophonic Medicine</h1></div>
          <h5 className="header-subtext">An expanding library of live music sessions</h5>
        </div>
        {this.props.showTabs === "true" ? this.displayFilterTabs() : null}
        <VideoContainer videos={videosToDisplay} />
      </div>
      </Container>
    )
  }
}

const setStateToProps = (state) => {
  return {
    videos: state.videos,
    filteredByAll: state.filteredByAll,
    filteredByBand: state.filteredByBand,
    filteredBySong: state.filteredBySong,
    filteredByLyrics: state.filteredByLyrics,
    filter: state.setFilter,
    showTabs: state.toggleTabs.showTabs,
    //note to self: naming the key setFilter here will not work because the props already have a key called setFilter pointing to the reducer
    //setFilter: state.setFilter,
    auth: state.auth
  };
};

const setDispatchToProps = {
  currentUser,
  getVideos,
  setFilter,
  toggleTabs
  
};

export default connect(setStateToProps, setDispatchToProps)(VideoDashboard);








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



