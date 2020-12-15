import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteVideo } from '../actions/videos';
import { thunkFetchVideo } from '../actions/video';
import { thunkFetchUser } from '../actions/auth';
import { toggleGrid } from '../actions/toggleGrid';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import VideoCard from '../components/VideoCard';

class Show extends Component {
	componentDidMount() {
		if (this.props.showGrid) {
			this.props.toggleGrid();
		}
		const id = parseInt(this.props.match.params.id);
		this.props.thunkFetchVideo(id);
		this.props.thunkFetchUser();
	}

	render() {
		const { video } = this.props;
		return (
			<>
				{
					<Container fluid>
						<div className='new-and-edit-video-page'>
							<br></br>
							{video === [] ? null : (
								<Row>
									<VideoCard {...video} />
								</Row>
							)}
						</div>
					</Container>
				}
			</>
		);
	}
}

const setStateToProps = (state) => {
	return {
		video: state.video,
		auth: state.auth,
		showGrid: state.toggleGrid,
	};
};

const setDispatchToProps = {
	deleteVideo,
	thunkFetchVideo,
	thunkFetchUser,
	toggleGrid,
};

export default withRouter(connect(setStateToProps, setDispatchToProps)(Show));
