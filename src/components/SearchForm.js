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

  render() {
    // console.log(this.props, "search form");

    return (

      

    <Form inline>

      <AsyncTypeahead
        // {...this.state}
        id="async-pagination-example"
        labelKey="login"
        // maxResults={PER_PAGE - 1}
        minLength={2}
        // onInputChange={this._handleInputChange}
        // onPaginate={this._handlePagination}
        // onSearch={this._handleSearch}
        paginate
        placeholder="Search for a Github user..."
        // renderMenuItemChildren={option => (
        //   <div key={option.id}>
        //     <img
        //       alt={option.login}
        //       src={option.avatar_url}
        //       style={{
        //         height: '24px',
        //         marginRight: '10px',
        //         width: '24px',
        //       }}
        //     />
        //     <span>{option.login}</span>
        //   </div>
        //)}
        useCache={false}
      />  








      {/* <FormControl 
        name="query"
        type="text" 
        // onChange={(event) => this.props.searchSongs(event) }
        placeholder="Search" 
        className="mr-sm-2" />
      <Button variant="outline-success">Search</Button> */}


    </Form>



    )
  }
}
