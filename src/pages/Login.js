import React from 'react'
import { connect  } from 'react-redux';
import { loginSuccess } from '../actions/auth'
import { logoutSuccess } from '../actions/auth'
import { currentUser } from '../actions/auth'
import {Link} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {

  state = {
    username: 'ursula2',
    password: '2', 
    error: null
  }

  componentDidMount() {
    const token = localStorage.getItem('myAppToken') 
    if(!token){
      this.props.history.push('/admin')
    } else {
      this.fetchData()
    }
  }

  fetchData = async () => {
    const token = localStorage.getItem('myAppToken') 
    const reqObj = {
      method: 'GET',
      headers: {
      'Authorization': `Bearer ${token}`
      }
    }
    const res = await fetch('http://localhost:3001/api/v1/current_user', reqObj);
    const data = await res.json();
    if(data.error) {
      this.props.history.push('/admin')
    } else {
      //need to store the user (data) in store state
      this.props.currentUser(data)
    }
  }

  handleLogout = () => {
    localStorage.removeItem('myAppToken')
    this.props.logoutSuccess()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const reqObj = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    // /auth is a custom route on rails backend that triggers auth#create 
    const res = await fetch('http://localhost:3001/api/v1/auth', reqObj);
    const data = await res.json();
    if(data.error){
      this.setState({error: data.error});
    } else {
      // console.log(data, "------------");
      localStorage.setItem('myAppToken', data.token)
      this.props.loginSuccess(data)
      this.props.history.push('/videos')
    }
  }

  render() {

  return (
    <div className="login-page-content-wrapper">
    <Form onSubmit={this.handleSubmit}>
      { this.state.error && <h4 style={{ color: 'red'}}>{this.state.error}</h4> }
      {
        (!this.props.auth.id) ?
        (<Form.Row>
          <Col>
            <Form.Control 
              name="username"
              label="username" 
              onChange={this.handleChange}
              value={this.state.username}
              // placeholder="username" 
              />
          </Col>
          <Col>
            <Form.Control
              name="password"
              label="password" 
              type="password" 
              onChange={this.handleChange} 
              value={this.state.password}
              // placeholder="pw" 
              />
          </Col>
          <Button 
            variant="primary" 
            type="submit">
            Login
          </Button>
        </Form.Row>)
        :
        (<>
        <Button 
          as={Link}
          to='/admin'
          onClick={ this.handleLogout }
          variant="primary">
        Logout
        </Button>

        <Button 
          as={Link}
          to='/videos/new'
          variant="primary" 
          type="submit">
        Add Video
        </Button>
      </>)
 
      }

    </Form>
    </div>
    );
  }
}





//what gets returned here becomes available as props within this component
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = {
  currentUser,
  loginSuccess,
  logoutSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
