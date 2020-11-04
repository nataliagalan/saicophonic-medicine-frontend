import React, { Component } from 'react'
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { getVideo } from "../actions/video";
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';
import { filteredByAll } from '../actions/filteredByAll';
import { filteredByBand } from '../actions/filteredByBand';
import { filteredBySong } from '../actions/filteredBySong';
import { filteredByLyrics } from '../actions/filteredByLyrics';


// import { AsyncTypeahead, Menu, MenuItem, Highlighter, TypeaheadMenu, useItem } from 'react-bootstrap-typeahead';
import { AsyncTypeahead, Menu, MenuItem, Highlighter  } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../SearchForm.css';


class SearchForm extends Component {

  state = {
    isLoading: false,
    open: false,
    options: [],
    query: '',
  };



  //removed page 1 from argument below for testing
  makeAndHandleRequest = async (query) => {

    const res = await fetch(`http://localhost:3001/api/v1/videos/search/${query}`);
    const filteredVideos = await res.json();

    if(filteredVideos.error) {

      console.log(`====${filteredVideos.error}====`)
      this.setState({
        isLoading: false,
      }); 
    } else {
      //dispatch here    
      this.props.filteredByAll(filteredVideos);
      this.props.filteredByBand(filteredVideos, query);
      this.props.filteredBySong(filteredVideos, query);
      this.props.filteredByLyrics(filteredVideos, query);
    const options = filteredVideos.map(i => ({
      band: i.band,
      id: i.id,
      songs: i.songs
    }));

    //useful for displaying highlighted options
    filteredVideos.forEach((video, videoIndex) => {
      video.songs.forEach((song, songIndex) => {
        songIndex ++
        options[videoIndex][`song${songIndex}`] = song.title
        options[videoIndex][`lyrics${songIndex}`] = song.lyrics
      })
    })

    this.setState({
          isLoading: false,
          options: options
        });  
      }

    
        
  }

  closeDropdown = () => {
    this.setState({ open: false });
    

  }
  
  //CURRENTLY NOT USING THIS, USING THIS.PROPS.FETCHVIDEOS
  handleAllResults = async (query) => {
    this.setState({ open: false });
    
    const res = await fetch(`http://localhost:3001/api/v1/videos/search/${query}`);
    const filteredVideos = await res.json();

    this.props.filteredByAll(filteredVideos);
   
  }

  _handleInputChange = query => {
    if (query === ""){
      this.setState({ open: false });
      this.props.setFilter("none");
      this.props.toggleTabs("false");
      //HIDE TABS
      
    } else {
      //SHOW TABS
      this.setState({ query: query, open: true });
      this.props.setFilter("all");
      this.props.toggleTabs("true");
    }
  }




  _handleSearch = query => {
    //double check this 3 lines below
    // if (this._cache[query]) {
    //   this.setState({ options: this._cache[query].filteredVideos });
    //   return;
    // }
    
    this.setState({ isLoading: true  });

    this.makeAndHandleRequest(query)
  };

  handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      this.handleAllResults(this.state.query, "all");
    }
  }

  fetchVideo = async (id) => {
    this.setState({ open: false });
    const res = await fetch(`http://localhost:3001/api/v1/videos/${id}`);
    const videoToShow = await res.json();
    this.props.getVideo(videoToShow);
  }

 



  
  render() {
    // console.log(this.props, "============SEARCH FORM=========");

    return (

    <>
      <AsyncTypeahead
        {...this.state}
        className="searchForm"
        id="video-archive-typeahead"
        //labelkey determines the option keys that get searched
        labelKey={
          option => {
            let songString = option.songs.map(song => song.title).join(' ')
            let lyricsString = option.songs.map(song => song.lyrics).join(' ')
            return `${option.band} ${songString} ${lyricsString}`
          }
        }
        maxResults={10}
        minLength={2}
        onInputChange={this._handleInputChange}
        // onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        placeholder="Search by artist, band, song, lyrics..."
        options={this.state.options}
        onBlur={this.closeDropdown} 
        onKeyDown={this.handleKeyDown}
        
        renderMenu={(options, menuProps) => {
          return (

            <Menu {...menuProps} >
              <MenuItem>
                <Link 
                // "/videos/search/:query"
                  to={`/videos/search/${this.state.query}`}
                  onClick={() => { 
                    this.handleAllResults(this.state.query, "all");
                    this.closeDropdown(); 
                  }} 
                  // and also/ OR INSTEAD: onClick={() => this.props.fetchVideos("all")}
                  // activeClassName="active"
                  >
                {`See all results for "${this.state.query}"`}
                </Link>
              </MenuItem>
              {options.map((opt, ind) => 
                <MenuItem option={opt} key={ind} position={ind} >
                  <Link 
                    to={`/videos/${opt.id}`}
                    // activeClassName="active"
                    onClick={() => this.fetchVideo(opt.id)}
                    >

                      <Highlighter search={this.state.query}>
                        {`${opt.band} ${opt.song1} ${opt.lyrics1} `}
                       
                      </Highlighter>

                  </Link>
                </MenuItem>
              )}
            </Menu>

          );
        }}
        
        open={this.state.open}
        useCache={false}
      /> 

    </>



    )
  }
}


const setStateToProps = (state) => {
  return {
    video: state.video,
    videos: state.videos,
    filteredByAll: state.filteredByAll,
    filteredByBand: state.filteredByBand,
    filteredBySong: state.filteredBySong,
    filteredByLyrics: state.filteredByLyrics,
    filter: state.setFilter,
    showTabs: state.toggleTabs.showTabs
  };
};

const setDispatchToProps = {
  getVideo,
  filteredByAll,
  filteredByBand,
  filteredBySong,
  filteredByLyrics,
  toggleTabs,
  setFilter
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(SearchForm));
// export default withRouter(SearchForm);