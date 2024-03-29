import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { thunkFetchUser } from '../actions/auth';
import { thunkAddVideo, addVideo } from '../actions/videos';
import { clearTags } from '../actions/tags';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import ReactPlayer from 'react-player/lazy';
import { GrabberIcon, PlusIcon, DashIcon } from '@primer/octicons-react';
import AddTagsBox from '../components/AddTagsBox';
import Line from '../components/Line';

class New extends Component {
	state = {
		id: '',
		url: '',
		band: '',
		songs: [
			{
				title: '',
				lyrics: '',
				timestamp: '',
			},
		],
		tags: [
			{
				name: '',
			},
		],
		played: 0,
		seeking: false,
		duration: 0,
		inputToUpdate: 0,
		editMode: false,
	};

	componentDidMount() {
    ReactDOM.findDOMNode(this).scrollIntoView();
		const token = localStorage.getItem('myAppToken');
		if (!token) {
			this.props.history.push('/admin');
		} else {
			this.props.thunkFetchUser();
		}
	}

	handleChange = (e, i) => {
		const { name, value } = e.target;
		const list = [...this.state.songs];
		list[i][name] = value;
		this.setState((prevState) => ({ songs: list }));
	};

	handleVideoInputChange = (e) => {
		this.setState({ url: e.target.value });
	};

	handleBandInputChange = (e) => {
		this.setState({ band: e.target.value });
  };
  
  prepareSubmit = (e) => {
    e.preventDefault();
    let videoToAdd = {
      id: this.state.id,
      url: this.state.url,
      band: this.state.band,
      songs: this.state.songs,
      tags: this.props.updatedTags
    }
    let id = this.props.auth.id
    this.props.thunkAddVideo(videoToAdd, id);
    this.props.clearTags();
  }

	handleAddInput = () => {
		this.setState((prevState) => ({ songs: [...prevState.songs, { title: '', lyrics: '', timestamp: '' }] }));
	};

	handleRemoveInput = (i) => {
		let songs = [...this.state.songs];
		songs.splice(i, 1);
		this.setState({
			songs: songs,
		});
	};

	//SLIDER METHODS
	//format (and pad) takes seconds, returns 00:00 to display
	format = (seconds) => {
		const date = new Date(seconds * 1000);
		const hh = date.getUTCHours();
		const mm = date.getUTCMinutes();
		const ss = this.pad(date.getUTCSeconds());
		if (hh) {
			return `${hh}:${this.pad(mm)}:${ss}`;
		}
		return `${mm}:${ss}`;
	};
	pad = (string) => {
		return ('0' + string).slice(-2);
	};

	handleSeekMouseDown = (e) => {
		this.setState({ seeking: true });
	};

	handleSeekChange = (e) => {
		this.setState({ played: parseFloat(e.target.value) });
		let timeToDisplay = this.format(this.state.duration * e.target.value);
		const updatedSongArr = this.state.songs.map((song, i) => {
			if (i === this.state.inputToUpdate) {
				return {
					...song,
					timestamp: timeToDisplay,
				};
			} else {
				return song;
			}
		});
		this.setState({ songs: updatedSongArr });
	};

	handleSeekMouseUp = (e) => {
		this.setState({ seeking: false });
		const { duration, played } = this.state;
		let secondsForSeekTo = Math.round(duration * played);
		this.player.seekTo(secondsForSeekTo);
	};

	handleDuration = (d) => {
		// d corresponds to video length in seconds
		this.setState({ duration: d });
	};

	handleFocus = (e, i) => {
		this.setState({ inputToUpdate: i });
	};
	// END OF SLIDER METHODS

	ref = (player) => {
		this.player = player;
	};

	// DRAGGABLE METHODS
	onDragEnd = (params) => {
		if (!params.destination) return;
		const srcI = params.source.index;
		const desI = params.destination.index;
		// const list = this.state.songs;
		const list = Array.from(this.state.songs);
		list.splice(desI, 0, list.splice(srcI, 1)[0]);

		this.setState((prevState) => ({ songs: list }));
	};

	render() {
		const { songs } = this.state;
		return (
			<Container fluid>
				<div className='new-and-edit-video-page'>
					<Row>
						<Col md={6} sm={6}>
							<div className='video-wrapper'>
								<ResponsiveEmbed aspectRatio='16by9'>
									<ReactPlayer
										className='react-player'
										placement='top'
										ref={this.ref}
										onDuration={this.handleDuration}
										width='100%'
										height='100%'
										controls={true}
										url={this.state.url}
									/>
								</ResponsiveEmbed>

								<Form>
									<Form.Group controlId='formBasicRangeCustom'>
										<Form.Control
											custom
											type='range'
											min={0}
											max={0.999999}
											step='any'
											value={this.state.played}
											onMouseDown={this.handleSeekMouseDown}
											onChange={this.handleSeekChange}
											onMouseUp={this.handleSeekMouseUp}
										/>
									</Form.Group>
								</Form>
								{/* !VIDEO WRAPPER DIV */}
							</div>
						</Col>

						<Col md={6} sm={6}>
							<DragDropContext onDragEnd={this.onDragEnd}>
								{/* <Form onSubmit={this.prepareSubmit} className='edit-and-new-form'> */}
								<Form onSubmit={this.prepareSubmit} className='edit-and-new-form'>
									<Form.Row>
										<Col>
											<Form.Control name='url' value={this.state.url} onChange={(e) => this.handleVideoInputChange(e)} placeholder='Url' />
										</Col>
									</Form.Row>
									<br></br>
									<Form.Row>
										<Col>
											<Form.Control name='band' value={this.state.band} onChange={(e) => this.handleBandInputChange(e)} placeholder='Artist/Band' />
										</Col>
									</Form.Row>
									<br></br>

									{/* DROPPABLE DIV */}
									{/* <Droppable key={this.state.id} droppableId='droppable-1'> */}
									<Droppable key={1} droppableId='droppable-1'>
										{(provided, snapshot) => (
											<div
												className='droppable-input-div'
												ref={provided.innerRef}
												style={{ backgroundColor: snapshot.isDraggingOver ? '#241e2f2f' : 'transparent' }}
												{...provided.droppableProps}
											>
												{songs.map((song, i) => {
													return (
														<Draggable key={i} draggableId={`draggable-${i}`} index={i}>
															{(provided, snapshot) => (
																<div className='draggable-input-div' key={i} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
																	<Row key={i} noGutters>
																		<Col xs={1}>
																			<span style={{ color: '#EBDFF7' }}>
																				<GrabberIcon size={26} />
																			</span>
																		</Col>

																		<Col>
																			<Form.Row>
																				<Col>
																					<Form.Control
																						name='timestamp'
																						autoComplete='off'
																						label='timestamp'
																						defaultValue={song.timestamp}
																						// value={song.timestamp}
																						//handleFocus sets inputToUpdate with corresponding index
																						onFocus={(e) => this.handleFocus(e, i)}
																						// defaultValue={this.state.played}
																						// onChange={(e) => this.handleChange(e, i)}
																						placeholder='00:00'
																					/>
																				</Col>
																				<Col xs={8}>
																					<Form.Control
																						name='title'
																						label='title'
																						// defaultValue={song.title}
																						value={song.title}
																						onChange={(e) => this.handleChange(e, i)}
																						placeholder='Song Title'
																					/>
																				</Col>
																			</Form.Row>
																			<br></br>
																			<Form.Control
																				as='textarea'
																				name='lyrics'
																				label='lyrics'
																				// defaultValue={song.lyrics}
																				value={song.lyrics}
																				onChange={(e) => this.handleChange(e, i)}
																				placeholder='Lyrics'
																				rows={6}
																			/>

																			{songs.length - 1 === i && (
																				<Button value='add' className='dynamic-input-btn' onClick={this.handleAddInput} variant='primary'>
																					<PlusIcon size={24} />
																				</Button>
																			)}
																			{songs.length !== 1 && (
																				<Button value='remove' className='dynamic-input-btn' onClick={() => this.handleRemoveInput(i)} variant='primary'>
																					<DashIcon size={24} />
																				</Button>
																			)}
																		</Col>
																	</Row>
																</div>
															)}
														</Draggable>
													);
												})}
												{provided.placeholder}
											</div>
										)}
									</Droppable>
									{/* !DROPPABLE DIV */}

									<Line color={'#EBDFF7'} />
									<AddTagsBox editMode={this.state.editMode} />
									<Line color={'#EBDFF7'} />
									<Button className='save-video' variant='primary' type='submit'>
										SAVE
									</Button>
								</Form>
							</DragDropContext>
						</Col>
					</Row>

					{/* !new-and-edit-video-page closing div */}
				</div>
			</Container>
		);
	}
}

const setStateToProps = (state) => {
	return {
		videos: state.videos,
		auth: state.auth,
		video: state.video,
		updatedTags: state.tags,
	};
};

const setDispatchToProps = {
  thunkAddVideo,
  addVideo,
	thunkFetchUser,
	clearTags,
};

export default connect(setStateToProps, setDispatchToProps)(New);
