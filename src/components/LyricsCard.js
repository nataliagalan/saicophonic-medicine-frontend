import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { thunkDeleteVideo } from '../actions/videos';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tags from './Tags';
import { TrashIcon, PencilIcon, ShareIcon, RocketIcon, ChevronDownIcon, ChevronUpIcon, XIcon, PlusIcon } from '@primer/octicons-react';

const LyricsCard = (props) => {
	// useSelector is similar to setStateToProps
	const auth = useSelector((state) => state.auth);
	const showGrid = useSelector((state) => state.toggleGrid);
	// useDispatch is similar to setDispatchToProps
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const copyUrlToClipboard = (id) => {
		let base = window.location.origin.toString();
		navigator.clipboard.writeText(`${base}/videos/${id}`);
		setShow(true);
	};

	const [songAccordionPlusExpanded, setSongAccordionPlusExpanded] = useState(false);
	const [plusExpanded, setPlusExpanded] = useState(true);
	const [chevronExpanded, setChevronExpanded] = useState(true);

	const handleSongAccordionPlusClick = (e, i) => {
		setSongAccordionPlusExpanded(!songAccordionPlusExpanded);
	};

	const handlePlusClick = (e) => {
		props.hidePreview(e);
		setPlusExpanded(!plusExpanded);
	};

	const handleChevronClick = (e) => {
		setChevronExpanded(!chevronExpanded);
	};

	const { id, songs, tags, band, bandcamp } = props;

	return (
		<>
			<Accordion className='song-accordion'>
				<Card className='parent-song-accordion'>
					{/* <Card.Header> */}
					<Accordion.Toggle className='song-toggle' onClick={(e) => handlePlusClick(e)} as={Card.Header} eventKey='0'>
						{band}
						{plusExpanded ? (
							<span className='plus-toggle-btn'>
								<PlusIcon size={16} />
							</span>
						) : (
							<span className='x-toggle-btn'>
								<XIcon size={16} />
							</span>
						)}
					</Accordion.Toggle>
					{/* </Card.Header> */}
					<Accordion.Collapse eventKey='0'>
						<Card.Body className='lyrics-card-body'>
							<Accordion>
								{
									// first time around songs are undefined. if that's the case, don't do anything. else, iterate over songs
									!songs
										? null
										: songs.map((song, i) => {
												return (
													<Card className='song-accordion' key={i}>
														<Accordion.Toggle
															onClick={(e) => handleSongAccordionPlusClick(e, i)}
															className='text-left song-card-header'
															eventKey={i + 1}
														>
															<Row className='time-title-row'>
																<Col xs={4}>
																	{/* TODO ADD PLUS AND X ICONS HERE */}
																	{/* {songAccordionPlusExpanded ? (
																		<span className='song-accordion-plus-toggle-btn'>
																			<PlusIcon size={16} />
																		</span>
																	) : (
																		<span className='song-accordion-plus-toggle-btn'>
																			<XIcon size={16} />
																		</span>
																	)} */}
																	<span onClick={(e) => props.handlePlay(e)} className='accordion-time-title text-left grid-text-overflow'>
																		{song.timestamp}
																	</span>
																</Col>
																<Col xs={8} className='song-title-col'>
																	<span
																		onClick={(e) => props.handleTitlePlay(e)}
																		className={
																			showGrid
																				? 'text-left accordion-time-title song-title grid-text-overflow'
																				: 'text-left accordion-time-title song-title'
																		}
																	>
																		{song.title}
																	</span>
																</Col>
															</Row>
														</Accordion.Toggle>
														<Accordion.Collapse eventKey={i + 1}>
															<Card.Body
																className='overflow-auto accordion-lyrics'
																scrollable='true'
																style={{
																	whiteSpace: 'pre-line',
																}}
															>
																{song.lyrics}
															</Card.Body>
														</Accordion.Collapse>
													</Card>
												);
										  })
								}
							</Accordion>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Button className='support-artist' href={bandcamp} target='_blank'>
					Support Artist
					<svg
						xmlns='http://www.w3.org/2000/svg'
						class='icon icon-tabler icon-tabler-arrow-up-right'
						width='20'
						height='20'
						viewBox='0 0 24 24'
						stroke-width='2'
						stroke='currentColor'
						fill='none'
						stroke-linecap='round'
						stroke-linejoin='round'
					>
						<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
						<line x1='17' y1='7' x2='7' y2='17'></line>
						<polyline points='8 7 17 7 17 16'></polyline>
					</svg>
				</Button>
			</Accordion>

			{/* Edit and Delete buttons */}
			<Accordion className='tag-accordion '>
				<Card className='plus-accordion-card'>
					<Accordion.Toggle
						className='plus-accordion'
						style={{ cursor: 'pointer' }}
						as={Card.Header}
						// as={Button}
						onClick={(e) => handleChevronClick(e)}
						eventKey='1'
					>
						{chevronExpanded ? <ChevronDownIcon size={24} /> : <ChevronUpIcon size={24} />}
					</Accordion.Toggle>
					<Accordion.Collapse eventKey='1'>
						<Card.Body className='plus-accordion'>
							<Row>
								<div className='tags-wrapper' id='tags-wrapper'>
									<Tags tags={tags} />
								</div>
							</Row>

							<Row>
								<Col>
									{' '}
									{auth.id ? (
										<>
											<Button className='lyrics-card-icons' as={Link} to={`/videos/edit/${id}`}>
												<span role='img' aria-label='edit'>
													<PencilIcon size={24} />
												</span>
											</Button>
											<Button className='lyrics-card-icons' onClick={() => dispatch(thunkDeleteVideo(id))}>
												<span role='img' aria-label='delete'>
													<TrashIcon size={24} />
												</span>
											</Button>
										</>
									) : null}
									<Button className='lyrics-card-icons' onClick={() => copyUrlToClipboard(id)}>
										<span role='img' aria-label='share'>
											<ShareIcon size={24} />
										</span>
									</Button>
									<Modal show={show} onHide={() => setShow(false)} dialogClassName='modal-90w' aria-labelledby='copy-success'>
										<Modal.Header>
											<Container fluid>
												<Modal.Title id='copy-success'>
													<div className='justify-content-md-center text-center'>
														<RocketIcon size={24} />
														<span>&nbsp;&nbsp;</span>
														Link copied to clipboard!
													</div>
												</Modal.Title>
											</Container>
										</Modal.Header>
										<Modal.Body></Modal.Body>
									</Modal>
								</Col>
							</Row>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
};

export default withRouter(LyricsCard);
