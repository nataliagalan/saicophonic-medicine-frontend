import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';


export default class SearchForm extends Component {

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

    }));
    console.log(options,"--------OPTIONSOBJ---------");

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
    {/* <Form inline> */}


      <AsyncTypeahead
        {...this.state}
        id="async-pagination-example"
        labelKey="band"
        maxResults={10}
        minLength={2}
        onInputChange={this._handleInputChange}
        // onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        placeholder="Search by Artist/Band, Song or Lyrics..."
        options={this.state.options}
        renderMenuItemChildren={option => (
          <div key={option.id}>
            {option.band}
          </div>
        )}
     
        useCache={false}
      /> 











    {/* </Form> */}
    </>



    )
  }
}
