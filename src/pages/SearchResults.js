import React, { Component } from 'react'
import { connect } from 'react-redux';
import VideoDashboard from './VideoDashboard'

class SearchResults extends Component {

  render() {
    // console.log(this.props,"======search results page========");
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


export default connect(setStateToProps, null)(SearchResults);


