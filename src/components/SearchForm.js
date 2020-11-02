import React, { Component } from 'react'
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';

// import { AsyncTypeahead, Menu, MenuItem, Highlighter, TypeaheadMenu, useItem } from 'react-bootstrap-typeahead';
import { AsyncTypeahead, Menu, MenuItem  } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';


class SearchForm extends Component {

  state = {
    isLoading: false,
    options: [],
    query: '',
  };

  _cache = {};

  //removed page 1 from here for testing
  makeAndHandleRequest = async (query) => {
    const res = await fetch(`http://localhost:3001/api/v1/videos/search/${query}`);
    const filteredVideos = await res.json();
    const options = filteredVideos.map(i => ({
      band: i.band,
      id: i.id,
      songs: i.songs
    }));

    //currently not using this but maybe useful for displaying purposes
    // filteredVideos.forEach((video, videoIndex) => {
    //   video.songs.forEach((song, songIndex) => {
    //     songIndex ++
    //     options[videoIndex][`song${songIndex}`] = song.title
    //   })
    // })

    // console.log(options,"--------OPTIONSOBJ---------");

    // this._cache[query] = filteredVideos

    this.setState({
          isLoading: false,
          options: options,
        });  
  }

  _handleInputChange = query => {
    this.setState({ query });
  };

  _handleSearch = query => {
    //double check this 3 lines below
    // if (this._cache[query]) {
    //   this.setState({ options: this._cache[query].filteredVideos });
    //   return;
    // }

    this.setState({ isLoading: true });

    this.makeAndHandleRequest(query)
  };

 
  
  render() {
    // console.log(this.props, "search form");

    return (

    <>
      <AsyncTypeahead
        {...this.state}
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
        placeholder="Search by Artist/Band, Song or Lyrics..."
        options={this.state.options}
        // renderMenuItemChildren={option => (
        //   <>
        //   <div key={option.id}>
        //     <Link 
        //       to={`/videos/${option.id}`}
        //       //without this activeClassName video embed does not load without refresh
        //       activeClassName="active">
        //       {option.band}
        //     </Link>
        //   </div>
        //   </>
        // )}     

        renderMenu={(options, menuProps) => {
          return (
            <Menu {...menuProps}>
              <MenuItem>
              <Link 
              // "/videos/search/:query"
                to={`/videos/search/${this.state.query}`}
               // without this activeClassName video embed does not load without refresh
                activeClassName="active">
              {`See all results for "${this.state.query}"`}
              </Link>
              </MenuItem>
              {options.map((opt, ind) => 
                <MenuItem option={opt} key={ind} position={ind} >
              <Link 
                to={`/videos/${opt.id}`}
               // without this activeClassName video embed does not load without refresh
                activeClassName="active">
                  {opt.band}
              </Link>
                </MenuItem>
              )}
            </Menu>
          );
        }}

        useCache={false}
      /> 

    </>



    )
  }
}

export default withRouter(SearchForm);