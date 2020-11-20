import React, { Component } from 'react'
import { connect } from 'react-redux';
import VideoDashboard from './VideoDashboard'
import Container from 'react-bootstrap/Container';


class SearchResults extends Component {

  render() {
    let query = this.props.location.pathname.split('/')[3]
    return (
      <>
        <Container fluid>
          <div className="page-content-wrapper">
            <div className="dashboard-header">
            <h5 className="header-subtext">All results for "{query}"</h5>
            </div>
            <VideoDashboard hideHeader={true}/> 
          </div>
        </Container>
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
    //naming the key setFilter here will not work because the props already have a key called setFilter pointing to the reducer
    //setFilter: state.setFilter,
    auth: state.auth
  };
};


export default connect(setStateToProps, null)(SearchResults);


