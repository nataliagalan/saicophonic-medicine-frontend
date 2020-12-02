import React from 'react';
import { connect } from 'react-redux';
import { loginSuccess, logoutSuccess, currentUser, thunkFetchUser, thunkLogin } from '../actions/auth';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
	state = {
		username: '',
		password: '',
		error: null,
	};

	componentDidMount() {
    // this.props.thunkFetchUser()
  }

	handleLogout = () => {
		localStorage.removeItem('myAppToken');
		this.props.logoutSuccess();
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};


	render() {
		return (
			<div className='login-page-content-wrapper text-center'>
				<Container fluid>
					<Form onSubmit={(e) => this.props.thunkLogin(e, this.state)} className='login-page'>
					{/* <Form onSubmit={this.handleSubmit} className='login-page'> */}
						{this.state.error && <h5 style={{ color: '#fda292' }}>{this.state.error}</h5>}
						{!this.props.auth.id ? (
							<>
								<Form.Row>
									<Col>
										<Form.Control name='username' label='username' onChange={this.handleChange} value={this.state.username} />
									</Col>
								</Form.Row>

								<Form.Row>
									<Col>
										<Form.Control name='password' label='password' type='password' onChange={this.handleChange} value={this.state.password} />
									</Col>
								</Form.Row>

								<Form.Row>
									<Col>
										<br></br>
										<Button variant='primary' type='submit'>
											Login
										</Button>
									</Col>
								</Form.Row>
							</>
						) : (
							<>
								<Button as={Link} to='/admin' onClick={this.handleLogout} variant='primary'>
									Logout
								</Button>
							</>
						)}
					</Form>
				</Container>
			</div>
		);
	}
}

//what gets returned here becomes available as props within this component
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
	};
};

const mapDispatchToProps = {
  thunkFetchUser,
  thunkLogin,
	currentUser,
	loginSuccess,
	logoutSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
