import React, { Component } from 'react';
import { connect } from 'react-redux';
import { thunkFetchUser } from '../actions/auth';
import { thunkUpdateVideo } from '../actions/videos';
import { getVideo } from '../actions/video';
import { clearTags } from '../actions/tags';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import ReactPlayer from 'react-player/lazy';
import { GrabberIcon, PlusIcon, DashIcon } from '@primer/octicons-react';
import AddTagsBox from '../components/AddTagsBox';
import Line from '../components/Line';

// const API_ENDPOINT = 'http://localhost:3001/api/v1';
const API_ENDPOINT = "https://saicophonic-api.herokuapp.com/api/v1";
const VIDEOS_URL = `${API_ENDPOINT}/videos`;
class Edit extends Component {
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
		editMode: true,
	};

	componentDidMount() {
		const path = this.props.location.pathname.split('/');
		const id = parseInt(path[path.length - 1]);
		this.setInitialState(id);
		const token = localStorage.getItem('myAppToken');
		// if (!token) {
		// 	this.props.history.push('/admin');
		// } else {
		// 	this.props.thunkFetchUser();
		// }
	}
 

	setInitialState = async (id) => {
		const res = await fetch(`${VIDEOS_URL}/${id}`);
		const video = await res.json();
		this.setState({ id: id, songs: video.songs, tags: video.tags, url: video.url, band: video.band });
		this.props.getVideo(video);
	};

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
		let videoToUpdate = {
			id: this.state.id,
			url: this.state.url,
			band: this.state.band,
			songs: this.state.songs,
			tags: this.props.video.tags,
		};
		// this.handleSubmit(videoToUpdate)
		this.props.thunkUpdateVideo(videoToUpdate, this.state.id);
		this.props.clearTags();
	};

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
		//e.target.value is this.state.played
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

	// DRAGGABLE METHOD
	onDragEnd = (params) => {
		if (!params.destination) return;
		const srcI = params.source.index;
		const desI = params.destination.index;
		// const list = this.state.songs;
		console.log(this.state.songs, '==BEFORE=');
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
											// <input
											custom
											type='range'
											min={0}
											max={0.999999}
											step='any'
											value={this.state.played}
											onMouseDown={this.handleSeekMouseDown}
											onChange={this.handleSeekChange}
											onMouseUp={this.handleSeekMouseUp}
											// />
										/>
									</Form.Group>
								</Form>

								{/* what gets displayed is the length of video times played (float)
            those seconds get passed as input to duration and it converts them
            to 00:00 format, then they get displayed
            */}
								{/* <div className="duration-seconds">
            <Duration seconds={this.state.duration * this.state.played}/>
            </div> */}

								{/* !VIDEO WRAPPER DIV */}
							</div>
						</Col>

						<Col md={6} sm={6}>
							<DragDropContext onDragEnd={this.onDragEnd}>
								<Form onSubmit={this.prepareSubmit} className='edit-and-new-form'>
									<Form.Row>
										<Col>
											<Form.Control name='url' defaultValue={this.state.url} onChange={(e) => this.handleVideoInputChange(e)} placeholder='Url' />
										</Col>
									</Form.Row>
									<br></br>
									<Form.Row>
										<Col>
											<Form.Control name='band' defaultValue={this.state.band} onChange={(e) => this.handleBandInputChange(e)} placeholder='Artist/Band' />
										</Col>
									</Form.Row>
									<br></br>

									{/* DROPPABLE DIV */}
									<Droppable key={this.state.id} droppableId='droppable-1'>
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
																						value={song.timestamp}
																						//handleFocus sets inputToUpdate with corresponding index
																						onFocus={(e) => this.handleFocus(e, i)}
																						placeholder='00:00'
																					/>
																				</Col>
																				<Col xs={8}>
																					<Form.Control
																						name='title'
																						label='title'
																						defaultValue={song.title}
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
																				defaultValue={song.lyrics}
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

									<div className='custom-spacer'></div>
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
	thunkUpdateVideo,
	thunkFetchUser,
	getVideo,
	clearTags,
};

export default connect(setStateToProps, setDispatchToProps)(Edit);
