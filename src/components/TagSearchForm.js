import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { connect } from "react-redux";
import { SearchIcon } from '@primer/octicons-react'
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
      event.preventDefault()
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
 
  render() {
    return (
    <>
      <AsyncTypeahead
        {...this.state}
        ref={typeahead => this.typeahead = typeahead}
        className="tag-search-form"
        id="tag-search-typeahead"
        labelKey="name"
        maxResults={10}
        minLength={2}
        onInputChange={this._handleInputChange}
        // onPaginate={this._handlePagination}
        onSearch={this._handleSearch}
        paginate
        placeholder="Filter tags or press enter to add"
        promptText="Type to search tags"
        emptyLabel={`Press enter to add "${this.state.query}"`}
        options={this.state.options}
        onBlur={this.closeDropdown} 
        onKeyDown={this.handleKeyDown}
        filterBy={() => true}
        
        renderMenu={(options, menuProps) => {
          return (
            <Menu {...menuProps} className="tag-search-menu rbt-menu" id="tag-search-menu"> 
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
      >
        {({ selected }) => (
          <div className="search-form-icons" id="tag-search-form-icon">
            {!selected.length && <span style={{color: "#EBDFF7"}} aria-label="magnifier" id="tags-magnifier"><SearchIcon size={16} verticalAlign='middle'/></span>}
          </div>
        )}
      </AsyncTypeahead> 
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
