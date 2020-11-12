import React, { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useDispatch, useSelector  } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';
import { setFilter } from '../actions/setFilter';
// import { filteredByAll } from '../actions/filteredByAll';
// import { toggleTabs } from '../actions/toggleTabs';

import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Nav from 'react-bootstrap/Nav';
import VideoContainer from '../components/VideoContainer';
import { ChevronRightIcon, ChevronLeftIcon } from '@primer/octicons-react'
import Line from '../components/Line';


const VideoDashboard = (props) => {
  
  //useSelector is similar to setStateToProps
  const videos = useSelector(state => state.videos);
  // const auth = useSelector(state => state.auth);
  const filteredByAll = useSelector(state => state.filteredByAll);
  const filteredByBand = useSelector(state => state.filteredByBand);
  const filteredBySong = useSelector(state => state.filteredBySong);
  const filteredByLyrics = useSelector(state => state.filteredByLyrics);
  const filter = useSelector(state => state.setFilter);
  const showTabs = useSelector(state => state.toggleTabs.showTabs);
  // const showGrid = useSelector(state => state.toggleGrid);
  
  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();

 
  // makeAndHandleRequest = async (query) => {
    //dispatch
    //update the page number
    //update the array

    // this.props.filteredByAll(filteredVideos);
    // this.props.filteredByBand(filteredVideos, query);
    // this.props.filteredBySong(filteredVideos, query);
    // this.props.filteredByLyrics(filteredVideos, query);

  const fetchVideos = async (key, page) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos?page=${page}`);

    //if something do a new request
    // const res = await fetch(`http://localhost:3001/api/v1/videos`);
    const videos = await res.json();
    dispatch(getVideos(videos));
    // return res.json();
    return videos
  };

  const [ page, setPage ] = useState(1);

  
  const { resolvedData, latestData, status } = usePaginatedQuery(['videos', page], fetchVideos);

  useEffect(() => {
    //both resolvedData and latestDate are always undefined here
    // code to run on component mount
    const token = localStorage.getItem('myAppToken')

    const fetchUser = async () => {
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
        props.history.push('/admin')
      } else {
        //need to store the user (data) in store state
        dispatch(currentUser(data));
      }
    }

    // if(!token){
    //   fetchVideos()
    // } else {
    //   fetchUser()
    //   fetchVideos()
    // }
    if(token){
      fetchUser()
    } 
  }, [])

  const displayFilterTabs = () => {
    return (
      <Nav fill variant="tabs" defaultActiveKey="all">
        <Nav.Item>
          <Nav.Link 
            eventKey="all"
            title="all"
            onClick={() => handleTabClick("all") }
          >
              All({filteredByAll.length})
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => handleTabClick("bands") }
            title="bands"
            eventKey="band">Artist/Bands({filteredByBand.bands.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => handleTabClick("songs")}
            title="songs"
            eventKey="songs">Songs({filteredBySong.songs.length})</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link 
            onClick={() => handleTabClick("lyrics")}
            title="lyrics"
            eventKey="lyrics">Lyrics({filteredByLyrics.lyrics.length})</Nav.Link>
        </Nav.Item>
      </Nav> )
  }

  const findVideos = () => {
    switch (filter) {
      case "none":
        if(status === 'success'){
        return videos
        }
      case "all":
        return filteredByAll
      case "bands":
        return filteredByBand.bands 
      case "songs":
        return filteredBySong.songs
      case "lyrics":
        return filteredByLyrics.lyrics
      default:
        return videos
    }
  }

  const handleTabClick = (tab) => {
    dispatch(setFilter(tab));
  }


  const renderPagination = () => {
  //TODO feature in progress: pagination for search results
    let isSearched = showTabs === "true"
    // let totalPages = isSearched ? Math.ceil(filteredByAll.length / 8) : videos[0].number_of_pages
    // let totalPages = videos[0].number_of_pages
    let totalPages = 0
    if(videos[0]){
      totalPages = videos[0].number_of_pages
    }else{
      totalPages = 0
    }

    let paginationArray = []

    for(let i = 0; i < totalPages; i++){
      paginationArray.push(<Pagination.Item
        className="pagination-btn" 
        key={i + 1}
        onClick={() => setPage(i + 1)}
      >{ i + 1 }</Pagination.Item>)
    }
    if(isSearched){
      return
    } else {
      return (
        <div className="pagination-wrapper">
        <Pagination >
          <Pagination.Prev 
            onClick={() => setPage(old => Math.max(old - 1, 1))}
            disabled={page === 1}
          ><ChevronLeftIcon size={24} /></Pagination.Prev>
          {paginationArray}
          <Pagination.Next 
            onClick={() => setPage(old => (!latestData ? old : old + 1))}
            disabled={page === totalPages }
          ><ChevronRightIcon size={24} /></Pagination.Next>

        </Pagination>
        </div>
      );
    }
  }


  
  return ( 
    <Container fluid>
    <div className="page-content-wrapper">
      {props.hideHeader ?
        null
        :
      (<div className="dashboard-header">
        <div className="dashboard-header-title"><h1 className="header-text">Saicophonic Medicine</h1></div>
        <h5 className="header-subtext">An expanding library of live music sessions</h5>
      </div>)
      }
      {showTabs === "true" ? displayFilterTabs() : null}
      <VideoContainer videos={findVideos()} />
      <Line color="#EBDFF7" height={0.5}/>
      {/* {showTabs === "true" ? renderTabsPagination() : null}  */}
      {/* {status === "success" ? renderPagination() : null} */}
      {status === "success" && renderPagination()}
      {/* {status === "success" && !props.hideHeader ? renderPagination() : null} */}

    </div>
    </Container>
  );
}
 
export default VideoDashboard;