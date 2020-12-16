import history from '../history';
import Axios from 'axios';

// const API_ENDPOINT = 'http://localhost:3001/api/v1';
const API_ENDPOINT = 'https://saicophonic-api.herokuapp.com/api/v1';
const VIDEOS_URL = `${API_ENDPOINT}/videos`;
const TAGGED_URL = `${API_ENDPOINT}/videos/tagged`;

export const getVideos = (videos) => {
	return {
		type: 'GET_VIDEOS',
		videos: videos,
	};
};

export const addVideo = (videos) => {
	return {
		type: 'ADD_VIDEO',
		videos: videos,
	};
};

export const updateVideo = (videos) => {
	return {
		type: 'UPDATE_VIDEO',
		videos: videos,
	};
};

export const deleteVideo = (videos) => {
	return {
		type: 'DELETE_VIDEO',
		videos: videos,
	};
};

export const getTaggedVideos = (videos) => {
	return {
		type: 'GET_TAGGED_VIDEOS',
		videos: videos,
	};
};

export const thunkAddVideo = (videoToAdd, id) => async (dispatch, getState) => {
	const reqObj = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			id: `${id}`,
		},
		body: JSON.stringify(videoToAdd),
	};
	const res = await fetch(`https://saicophonic-api.herokuapp.com/api/v1/videos`, reqObj);
	const newVideo = await res.json();
	if (newVideo.error) {
		console.log(newVideo.error);
	} else {
		const { videos } = getState();
		const allVideos = [...videos, newVideo];
		dispatch(addVideo(allVideos));
		history.push(`/videos/${newVideo.id}`);
	}
};

export const thunkUpdateVideo = (videoToUpdate, id) => async (dispatch, getState) => {
	const reqObj = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: JSON.stringify(videoToUpdate),
	};
	const res = await fetch(`${VIDEOS_URL}/${id}`, reqObj);
	const updatedVideo = await res.json();
	if (res.status === 200) {
		const { videos } = getState();
		const prevVideos = videos.filter((video) => video.id !== id);
		const allVideos = [...prevVideos, updatedVideo];
		dispatch(updateVideo(allVideos));
		history.push(`/videos/${id}`);
	}
};

export const thunkDeleteVideo = (id) => async (dispatch, getState) => {
	const res = await fetch(`${VIDEOS_URL}/${id}`, {
		method: 'DELETE',
	});
	const data = await res.json();
	if (data.status === 200) {
		const { videos } = getState();
		const updatedVideos = videos.filter((video) => video.id !== id);
		dispatch(deleteVideo(updatedVideos));
		history.push('/');
	}
};

export const thunkFetchTaggedVideos = (tag) => async (dispatch, getState) => {
	const res = await fetch(`${TAGGED_URL}/${tag}`);
	const filteredVideosByTag = await res.json();
	if (filteredVideosByTag.error) {
		console.log(filteredVideosByTag.error, 'error in thunkFetchTaggedVideos ');
	} else {
		dispatch(getTaggedVideos(filteredVideosByTag));
		history.push(`/tagged/${tag}`);
	}
};
