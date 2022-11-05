const initialValue = {
	lyrics: [],
	query: '',
};
const videos = (state = initialValue, action) => {
	switch (action.type) {
		case 'GET_FILTERED_LYRICS':
			let query = action.payload.query.toLowerCase();
			//split the query into an array
			if (action.payload.lyrics) {
				let filteredVideos = action.payload.lyrics.query.filter(function (video) {
					return video.songs.some(function (song) {
						return song.lyrics.toLowerCase().includes(query);
					});
				});
				return { ...state, lyrics: filteredVideos, query: action.payload.query };
			}
		default:
			return state;
	}
};

export default videos;

// const initialValue = {
//   lyrics: [],
//   query: ""
// }
// const videos = (state = initialValue, action) => {
//   switch (action.type) {
//     case "GET_FILTERED_LYRICS":
//       let query = action.payload.query.toLowerCase()
//       //split the query into an array
//       let filteredVideos = action.payload.lyrics.filter(function(video) {
//         return video.songs.some(function(song) {
//           return song.lyrics.toLowerCase().includes(query);
//         });
//       });
//       return {...state,
//         lyrics: filteredVideos,
//         query: action.payload.query
//       }
//     default:
//       return state;
//   }
// }

// export default videos
