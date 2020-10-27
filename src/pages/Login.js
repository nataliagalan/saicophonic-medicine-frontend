import React from 'react'
import { connect  } from 'react-redux';
import { loginSuccess } from '../actions/auth'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Login extends React.Component {
  state = {
    username: 'ursula',
    password: '1', 
    error: null
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

    const res = await fetch('http://localhost:3001/api/v1/auth', reqObj);
    const data = await res.json();
    if(data.error){
      this.setState({error: data.error});
    } else {
      this.props.loginSuccess(data)
      this.props.history.push('/videos/new')

    }

  }

  render() {
console.log(this.props, 'login');
  return (
    <div className="login-page-content-wrapper">
    <Form onSubmit={this.handleSubmit}>
    { this.state.error && <h4 style={{ color: 'red'}}>{this.state.error}</h4> }
      <Form.Row>
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
      </Form.Row>
    </Form>
    </div>
    );
  }
}

const mapDispatchToProps = {
  loginSuccess
}

export default connect(null, mapDispatchToProps)(Login)
