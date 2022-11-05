import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { thunkFetchVideo } from '../actions/video';
import { thunkFetchTaggedVideos } from '../actions/videos';
import { setFilter } from '../actions/setFilter';
import { toggleTabs } from '../actions/toggleTabs';
import { filteredByAll } from '../actions/filteredByAll';
import { filteredByBand } from '../actions/filteredByBand';
import { filteredBySong } from '../actions/filteredBySong';
import { filteredByLyrics } from '../actions/filteredByLyrics';
import { XIcon, SearchIcon } from '@primer/octicons-react';
import Button from 'react-bootstrap/Button';
import { AsyncTypeahead, Menu, MenuItem, Highlighter } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// const API_ENDPOINT = 'http://localhost:3000/api/v1';
const API_ENDPOINT = "https://saicophonic-api.herokuapp.com/api/v1";
const SEARCH_URL = `${API_ENDPOINT}/videos/search`;
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
		const res = await fetch(`${SEARCH_URL}/${query}`);
		const filteredVideos = await res.json();

		if (filteredVideos.error) {
			console.log(`====${filteredVideos.error}====`);
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

			const options = filteredVideos.query.map((video, idx) => ({
				one: idx,
				band: video.band,
				id: video.id,
				songs: video.songs,
			}));

			//useful for displaying highlighted options
			filteredVideos.query.forEach((video, videoIndex) => {
				video.songs.forEach((song, songIndex) => {
					songIndex++;
					options[videoIndex][`song${songIndex}`] = song.title;
					options[videoIndex][`lyrics${songIndex}`] = song.lyrics;
				});
			});

			this.setState({
				options: options,
				isLoading: false,
			});
		}
	};

	closeDropdown = () => {
		this.setState({ open: false });
	};

	handleInputChange = (query) => {
		if (query === '') {
			//HIDE TABS
			this.setState({ open: false });
			this.props.setFilter('none');
			this.props.toggleTabs('false');
		} else {
			//SHOW TABS
			this.setState({ query: query, open: true });
			this.props.setFilter('all');
			this.props.toggleTabs('true');
		}
	};

	handleSearch = (query) => {
		this.setState({ isLoading: true });
		this.makeAndHandleRequest(query);
	};

	handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			this.setState({ query: '' });
			this.setState({ open: false });
			this.typeahead.clear();
			this.props.history.push(`/`);
		}
	};

	fetchVideo = async (id) => {
		this.setState({ query: '' });
		this.typeahead.clear();
		this.setState({ open: false });
		this.props.thunkFetchVideo(id);
	};

	fetchTaggedVideos = (tag) => {
		this.typeahead.clear();
		this.closeDropdown();
		this.props.thunkFetchTaggedVideos(tag);
	};

	handleClear = () => {
		// dispatch(setFilter('none'));
		// dispatch(toggleTabs('false'));
		this.typeahead.clear();
		this.props.setFilter('none');
		this.props.toggleTabs('false');
		this.setState({ query: '' });
	};

	render() {
		return (
			<>
				<AsyncTypeahead
					{...this.state}
					ref={(typeahead) => (this.typeahead = typeahead)}
					className='searchForm'
					id='video-archive-typeahead'
					//labelkey determines the option keys that get searched
					labelKey={(option) => {
						let songString = option.songs.map((song) => song.title).join(' ');
						return `${option.band} - ${songString}`;
					}}
					maxResults={6}
					minLength={2}
					clearButton={true}
					onInputChange={this.handleInputChange}
					// onPaginate={this._handlePagination}
					onSearch={this.handleSearch}
					// paginate
					placeholder='Saicophonic Search'
					promptText='Type to search'
					searchText={`Searching for ${this.state.query}`}
					options={this.state.options}
					onBlur={this.closeDropdown}
					onKeyDown={this.handleKeyDown}
					filterBy={() => true}
					renderMenu={(options, menuProps) => {
						return (
							<Menu {...menuProps} className='tag-search-menu rbt-menu'>
								{options.map((opt, ind) => (
									<MenuItem option={opt} key={ind} position={ind} className='main-menu-item' onClick={() => this.fetchVideo(opt.id)}>
										<div>
											<Highlighter search={this.state.query}>{`${opt.band} - ${opt.song1}`}</Highlighter>
										</div>
									</MenuItem>
								))}
								<MenuItem className='main-menu-item' option={options[0]} onClick={() => this.fetchTaggedVideos(this.state.query)}>
									<div className='bold-menu'>{`Tagged with "${this.state.query}"`}</div>
								</MenuItem>
							</Menu>
						);
					}}
					open={this.state.open}
					useCache={false}
				>
					{({ onClear, selected }) => (
						<div className='search-form-icons'>
							{this.state.query === '' ? (
								<span style={{ color: '#EBDFF7' }} aria-label='magnifier' id='magnifier'>
									<SearchIcon size={16} />
								</span>
							) : (
								<Button aria-label='Clear' className='close rbt-close'>
									{/* <div onClick={onClear}> */}
									<div onClick={this.handleClear}>
										<span style={{ color: '#EBDFF7' }} aria-label='clear-menu' id='clear-menu'>
											<XIcon size={20} />
										</span>
									</div>
								</Button>
							)}
						</div>
					)}
				</AsyncTypeahead>
			</>
		);
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
		showTabs: state.toggleTabs.showTabs,
	};
};

const setDispatchToProps = {
	thunkFetchVideo,
	filteredByAll,
	filteredByBand,
	filteredBySong,
	filteredByLyrics,
	toggleTabs,
	setFilter,
	thunkFetchTaggedVideos,
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(SearchForm));
