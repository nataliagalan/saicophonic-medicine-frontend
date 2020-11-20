import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { getVideo } from "../actions/video";
import { getTaggedVideos } from '../actions/videos';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';
import { filteredByAll } from '../actions/filteredByAll';
import { filteredByBand } from '../actions/filteredByBand';
import { filteredBySong } from '../actions/filteredBySong';
import { filteredByLyrics } from '../actions/filteredByLyrics';
import { XIcon, SearchIcon } from '@primer/octicons-react'
import Button from 'react-bootstrap/Button';
import { AsyncTypeahead, Menu, MenuItem, Highlighter } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class SearchForm extends Component {

  state = {
    isLoading: false,
    open: false,
    options: [],
    query: '',
  };

  //removed page 1 from argument below for testing
  makeAndHandleRequest = async (query) => {
    //page number 0
    const res = await fetch(`http://localhost:3001/api/v1/videos/search/${query}`);
    const filteredVideos = await res.json();

    if(filteredVideos.error) {
      console.log(`====${filteredVideos.error}====`)
      this.setState({
        isLoading: false,
      }); 
    } else {
      // TODO dispatch here  
      //set data and page number to 0
      
      this.props.filteredByAll(filteredVideos);
      this.props.filteredByBand(filteredVideos, query);
      this.props.filteredBySong(filteredVideos, query);
      this.props.filteredByLyrics(filteredVideos, query);

    const options = filteredVideos.map((video, idx) => ({
      one: idx,
      band: video.band,
      id: video.id,
      songs: video.songs
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
    this.props.history.push(`/videos/search/${query}`)
    this.typeahead.clear();
  }

  handleInputChange = query => {
    if (query === ""){
      //HIDE TABS
      this.setState({ open: false });
      this.props.setFilter("none");
      this.props.toggleTabs("false");
    } else {
      //SHOW TABS
      this.setState({ query: query, open: true });
      this.props.setFilter("all");
      this.props.toggleTabs("true");
    }
  }

  handleSearch = query => {
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

  fetchTaggedVideos = async (tag) => {
    this.typeahead.clear();
    this.closeDropdown()
    const res = await fetch(`http://localhost:3001/api/v1/videos/tagged/${tag}`);
    const filteredVideosByTag = await res.json();
    if(filteredVideosByTag.error) {
      console.log("error");
    } else {
      this.props.getTaggedVideos(filteredVideosByTag);
      this.props.history.push(`/videos/tagged/${tag}`)
    }
  }

 
  render() {
    return (
    <>
      <AsyncTypeahead
        {...this.state}
        ref={typeahead => this.typeahead = typeahead}
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
        clearButton={true}
        onInputChange={this.handleInputChange}
        // onPaginate={this._handlePagination}
        onSearch={this.handleSearch}
        paginate
        placeholder="Search by artist, band, song or lyrics"
        promptText="Type to search"
        searchText={`Searching for ${this.state.query}`}
        options={this.state.options}
        onBlur={this.closeDropdown} 
        onKeyDown={this.handleKeyDown}
        filterBy={() => true}
      
        renderMenu={(options, menuProps) => {
          return (
            <Menu {...menuProps} className="tag-search-menu rbt-menu">
            {options.map((opt, ind) => 
              <MenuItem option={opt} key={ind} position={ind} onClick={() => this.fetchVideo(opt.id)}>
                <div>
                  <Highlighter search={this.state.query}>
                    {`${opt.band} ${opt.song1} ${opt.lyrics1} `}
                  </Highlighter>
                </div>
              </MenuItem>
            )}
            <MenuItem option={options[0]} 
            onClick={() => this.handleAllResults(this.state.query)}
            >
              <div className="bold-menu">
                {`See all results`}
              </div>
            </MenuItem>
            <MenuItem option={options[0]} 
            onClick={() => this.fetchTaggedVideos(this.state.query)}
            >
              <div className="bold-menu">
                {`Videos tagged with ${this.state.query}`}
              </div>
            </MenuItem>
          </Menu>
          );
        }}
        open={this.state.open}
        useCache={false}
      > 
        {({ onClear, selected }) => (
          <div className="search-form-icons">
            {!!selected.length && 
            (<Button aria-label="Clear" className="close rbt-close" >
              <div onClick={onClear}>
              <span style={{color: "#EBDFF7"}} aria-label="clear-menu" id="clear-menu"><XIcon size={20} /></span>
              </div></Button>)}
            {!selected.length && <span style={{color: "#EBDFF7"}}aria-label="magnifier" id="magnifier"><SearchIcon size={16}/></span>}
          </div>
        )}
      </AsyncTypeahead>
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
  setFilter,
  getTaggedVideos
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(SearchForm));
