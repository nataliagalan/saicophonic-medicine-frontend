import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from "react-redux";

import { AsyncTypeahead, Menu, MenuItem, Highlighter  } from 'react-bootstrap-typeahead';
import { tags } from '../actions/tags'
import { getVideo } from '../actions/video'

import 'react-bootstrap-typeahead/css/Typeahead.css';



class TagSearchForm extends Component {

  state = {
    isLoading: false,
    open: false,
    options: [],
    query: '',
  };

  //removed page 1 from argument below for testing
  makeAndHandleRequest = async (query) => {
    const res = await fetch(`http://localhost:3001/api/v1/tags/search/${query}`);
    const filteredTags = await res.json();

    if(filteredTags.error) {
      console.log(`====${filteredTags.error}====`)
      this.setState({
        isLoading: false,
      }); 
    } else {

    const options = filteredTags.map(tag => ({
      name: tag.name,
      id: tag.id
    }));


    this.setState({
        options: options,
        isLoading: false
        });  
      }
        
  }

  closeDropdown = () => {
    this.setState({ open: false });
  }
  

  _handleInputChange = query => {
    if (query === ""){
      this.setState({ open: false });   
    } else {
      this.setState({ query: query, open: true });
    }
  }

  _handleSearch = query => {
    this.setState({ isLoading: true  });
    this.makeAndHandleRequest(query)
  };

  handleKeyDown = (event) => {
    let newTag = event.target.value.trim()
    if(event.key === 'Enter'){
      this.handleClick(newTag)
    }
  }

  handleClick = (tagNameToAdd) => {
    if (tagNameToAdd !== "") {
      if(this.props.video.id){
        this.props.tags(tagNameToAdd);
        this.props.video.tags = [...this.props.video.tags, {name: tagNameToAdd}]
        this.props.getVideo(this.props.video);
      } else {
        //adds this to array in store
        this.props.tags(tagNameToAdd);
      }
    }
    this.closeDropdown()
    this.typeahead.clear();
  }

//NEW VIDEO
  // this.props.tags(tagNameToAdd);

  // this.closeDropdown()
  // this.typeahead.clear();
//EDIT VIDEO
  // this.props.video.tags = [...this.props.video.tags, {name: tagNameToAdd}]
  // this.props.getVideo(this.props.video);

  // this.closeDropdown()
  // this.typeahead.clear();
 
  render() {

    return (

    <>
      <AsyncTypeahead
        {...this.state}
        ref={typeahead => this.typeahead = typeahead}
        className="TagSearchForm"
        id="video-archive-typeahead"
        labelKey="name"
        maxResults={10}
        minLength={2}
        onInputChange={this._handleInputChange}
        // onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        placeholder="Search tags or press enter"
        options={this.state.options}
        onBlur={this.closeDropdown} 
        onKeyDown={this.handleKeyDown}
        filterBy={() => true}
        
        renderMenu={(options, menuProps) => {
          return (
            <Menu {...menuProps} >
              {options.map((opt, ind) => 
                <MenuItem option={opt} key={ind} position={ind} 
                onClick={() => this.handleClick(opt.name)}
                >
                  <div>
                    <Highlighter search={this.state.query}>
                      {`${opt.name}`}
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
    video: state.video
  };
};

const setDispatchToProps = {
  tags,
  getVideo
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(TagSearchForm));
// export default withRouter(SearchForm);