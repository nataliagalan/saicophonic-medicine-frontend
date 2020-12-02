import React, { useState, useEffect } from 'react';
import { usePaginatedQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { getVideos } from '../actions/videos';
import { thunkFetchUser } from '../actions/auth';
import { setFilter } from '../actions/setFilter';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-bootstrap/Pagination';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import VideoContainer from '../components/VideoContainer';
import { ChevronRightIcon, ChevronLeftIcon } from '@primer/octicons-react';
import BkImage from '../components/BkImage';

const VideoDashboard = (props) => {
  // const API_ENDPOINT = 'http://localhost:3001/api/v1';
  const API_ENDPOINT = "https://saicophonic-api.herokuapp.com/api/v1";

	const VIDEOS_URL = `${API_ENDPOINT}/videos`;

	//useSelector is similar to setStateToProps
	const videos = useSelector((state) => state.videos);
	const filteredByAll = useSelector((state) => state.filteredByAll);
	const filteredByBand = useSelector((state) => state.filteredByBand);
	const filteredBySong = useSelector((state) => state.filteredBySong);
	const filteredByLyrics = useSelector((state) => state.filteredByLyrics);
	const filter = useSelector((state) => state.setFilter);
	const showTabs = useSelector((state) => state.toggleTabs.showTabs);

	const dispatch = useDispatch();

	const fetchVideos = async (key, page) => {
		const res = await fetch(`${VIDEOS_URL}?page=${page}`);
		const videos = await res.json();
		dispatch(getVideos(videos));
		return videos;
	};

	const [page, setPage] = useState(1);

	const { resolvedData, latestData, status } = usePaginatedQuery(['videos', page], fetchVideos);

	useEffect(() => {
		// code to run on component mount
		// both resolvedData and latestDate are always undefined here
    const token = localStorage.getItem('myAppToken');
    // debugger
		// if (token) {
		// 	dispatch(thunkFetchUser());
		// }
	}, []);

	const displayFilterTabs = () => {
		return (
			<>
				<Nav fill variant='tabs' defaultActiveKey='all'>
					<Nav.Item>
						<Nav.Link eventKey='all' title='all' onClick={() => handleTabClick('all')}>
							ALL/TAGGED ({filteredByAll.length})
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={() => handleTabClick('bands')} title='bands' eventKey='band'>
							ARTIST/BAND ({filteredByBand.bands.length})
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={() => handleTabClick('songs')} title='songs' eventKey='songs'>
							SONG ({filteredBySong.songs.length})
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link onClick={() => handleTabClick('lyrics')} title='lyrics' eventKey='lyrics'>
							LYRICS ({filteredByLyrics.lyrics.length})
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<div className='custom-spacer'></div>
			</>
		);
	};

	const findVideos = () => {
		switch (filter) {
			case 'none':
				if (status === 'success') {
					return videos;
				}
			case 'all':
				return filteredByAll;
			case 'bands':
				return filteredByBand.bands;
			case 'songs':
				return filteredBySong.songs;
			case 'lyrics':
				return filteredByLyrics.lyrics;
			default:
				return videos;
		}
	};

	const handleTabClick = (tab) => {
		dispatch(setFilter(tab));
	};

	const renderPagination = () => {
		let isSearched = showTabs === 'true';
		// let totalPages = isSearched ? Math.ceil(filteredByAll.length / 8) : videos[0].number_of_pages
		// let totalPages = videos[0].number_of_pages
		let totalPages = 0;
		if (videos[0]) {
			totalPages = videos[0].number_of_pages;
		} else {
			totalPages = 0;
		}

		let paginationArray = [];

		for (let i = 0; i < totalPages; i++) {
			paginationArray.push(
				<Pagination.Item id={page === i + 1 ? 'active-pagination-btn' : null} className='pagination-btn' key={i + 1} onClick={() => setPage(i + 1)}>
					{i + 1}
				</Pagination.Item>
			);
		}

		if (isSearched) {
			return;
		} else {
			return (
				<div className='pagination-wrapper'>
					<Pagination>
						<Pagination.Prev onClick={() => setPage((old) => Math.max(old - 1, 1))} disabled={page === 1}>
							<ChevronLeftIcon size={24} />
						</Pagination.Prev>
						{paginationArray}
						<Pagination.Next onClick={() => setPage((old) => (!latestData ? old : old + 1))} disabled={page === totalPages}>
							<ChevronRightIcon size={24} />
						</Pagination.Next>
					</Pagination>
				</div>
			);
		}
	};

	return (
		<>
			<BkImage />
			<Container fluid style={showTabs === 'true' ? { top: '90px' } : { top: '780px' }} className='main-wrapper' id='video-dashboard'>
				<h5 className='header-subtext text-center animated animatedFadeInUp fadeInUp'>An expanding library of live music sessions</h5>
				<Row>
					<Col className='main-wrapper-col'>
						{/* <Container fluid> */}
						<div className='page-content-wrapper'>
							{showTabs === 'true' ? displayFilterTabs() : null}
							<VideoContainer videos={findVideos()} />
							{/* <Line color='#EBDFF7' height={0.5} /> */}
							{/* {showTabs === "true" ? renderTabsPagination() : null}  */}
							{/* {status === "success" ? renderPagination() : null} */}
							{status === 'success' && renderPagination()}
						</div>
						{/* </Container> */}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default VideoDashboard;
