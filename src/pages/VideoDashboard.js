import React, { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useDispatch, useSelector  } from 'react-redux';
import { getVideos } from '../actions/videos';
import { currentUser } from '../actions/auth';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';

import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Nav from 'react-bootstrap/Nav';
import VideoContainer from '../components/VideoContainer';


const VideoDashboard = (props) => {
  
  //useSelector is similar to setStateToProps
  const videos = useSelector(state => state.videos);
  const auth = useSelector(state => state.auth);
  const filteredByAll = useSelector(state => state.filteredByAll);
  const filteredByBand = useSelector(state => state.filteredByBand);
  const filteredBySong = useSelector(state => state.filteredBySong);
  const filteredByLyrics = useSelector(state => state.filteredByLyrics);
  const filter = useSelector(state => state.setFilter);
  const showTabs = useSelector(state => state.toggleTabs.showTabs);
  
  //useDispatch is similar to setDispatchToProps
  const dispatch = useDispatch();
  
  const fetchVideos = async (key, page) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos?page=${page}`);
    // const res = await fetch(`http://localhost:3001/api/v1/videos`);
    const videos = await res.json();
    dispatch(getVideos(videos));
    
    // return res.json();
    
    return videos
  };

  const [ page, setPage ] = useState(1);
  
  const { resolvedData, latestData, status } = usePaginatedQuery(['videos', page], fetchVideos);
  // console.log(resolvedData, "==resolvedData under usePaginatedQuery==");

//componentdidupdate
  
  useEffect(() => {

    //both resolvedData and latestDate are always undefined here
    // console.log(resolvedData, "==resolveddata in useeffect====");
    // console.log(latestData, "==latestdata in useffect====");

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
    console.log(resolvedData, "==resolvedData under findVideos==");
    console.log(latestData, "==latestData under findVideos==");
    
    switch (filter) {
      case "none":
        //here return resolvedData if status === 'success'
        if(status === 'success'){
        return resolvedData } else {
          return videos
        }
    
        // return videos
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


  
  return ( 
    <Container fluid>
      {/* {test()} */}
      {/* {status === 'success' ? dispatch(getVideos(resolvedData)) : null} */}
    <div className="page-content-wrapper">
      <div className="dashboard-header">
        <div className="dashboard-header-title"><h1 className="header-text">Saicophonic Medicine</h1></div>
        <h5 className="header-subtext">An expanding library of live music sessions</h5>
      </div>
      {showTabs === "true" ? displayFilterTabs() : null}
      <VideoContainer videos={findVideos()} />
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Next />
      </Pagination>

    </div>
    </Container>
  );
}
 
export default VideoDashboard;