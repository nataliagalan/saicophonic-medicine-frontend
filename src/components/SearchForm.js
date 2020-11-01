import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


export default class SearchForm extends Component {
  render() {
    // console.log(this.props, "search form");
    //turn into functional component
    return (
    <Form inline>
      <FormControl 
        name="query"
        type="text" 
        // onChange={(event) => this.props.searchSongs(event) }
        placeholder="Search" 
        className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
    )
  }
}
