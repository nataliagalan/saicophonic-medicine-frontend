import React, { Component } from 'react'
import { withRouter } from 'react-router';
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
        options: options,
        isLoading: false
        });  
      }
        
  }

  closeDropdown = () => {
    this.setState({ open: false });
    

  }
  
  
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
    if(videoToShow.error) {
      console.log('video not found')
    } else {
      this.props.getVideo(videoToShow);
      this.props.history.push(`/videos/${id}`)
    }
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
        maxResults={6}
        minLength={2}
        onInputChange={this._handleInputChange}
        // onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        placeholder="Search by artist, band, song or lyrics."
        options={this.state.options}
        onBlur={this.closeDropdown} 
        onKeyDown={this.handleKeyDown}
        filterBy={() => true}
        
        renderMenu={(options, menuProps) => {
          return (

            <Menu {...menuProps} >
              {options.map((opt, ind) => 
                <MenuItem option={opt} key={ind} position={ind} onClick={() => this.fetchVideo(opt.id)}>
                  <div>
                    <Highlighter search={this.state.query}>
                      {`${opt.band} ${opt.song1} ${opt.lyrics1} `}
                    </Highlighter>
                  </div>
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