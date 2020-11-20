
import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Line from '../components/Line';
import itunes from '../itunes.svg';
import tinyletter from '../tinyletter.svg';
import youtube from '../youtube.svg';
import instagram from '../instagram.svg';
import spotify from '../spotify.svg';

export default class MyFooter extends Component {

  handleSubmit = () => {
    window.open('https://tinyletter.com/SaicoTherapy', 'popupwindow', 'scrollbars=yes,width=800,height=600')
    return true;
  }

  render() {
    return (
      <div className="my-footer sticky-bottom text-center">  
        <Line color="white" />
        <Container className="newsletter-wrapper text-center">
          <Form className="newsletter-form"
            action="https://tinyletter.com/SaicoTherapy" 
            method="post" 
            target="popupwindow" 
            onSubmit={this.handleSubmit}>
            <Form.Row className="justify-content-md-center text-center">
              <Form.Label className="newsletter-prompt text-center"
                htmlFor="tlemail">Your monthly dose of Saicophonic Medicine ↓
              </Form.Label>
            </Form.Row>

            <Form.Row className="justify-content-md-center text-center">
              <Col md={8}>
                <Form.Control type="text" name="email" id="tlemail" />
                <Form.Control type="hidden" value="1" name="embed"/>
              </Col>
              <Col md={4}>
                <Button type="submit" className="sign-up-newsletter">SIGN UP</Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>  

      <Line color="white" />
        <Navbar color="dark" dark="true">
          <Container>
            <Col>
              <Row>
              <div className="mx-auto social-logos-div">
                <a href="https://tinyletter.com/SaicoTherapy" target="_blank" rel="noopener noreferrer">
                  <img src={tinyletter} className="social-logos" id="tinyletter-logo" alt="tinyletter-logo" />
                </a>
                <a href="https://music.apple.com/us/playlist/the-night-is-on-my-mind/pl.u-aZb0N69T1GB9l2q" target="_blank" rel="noopener noreferrer">
                  <img src={itunes} className="social-logos" id="apple-music-logo" alt="apple-music-logo" />
                </a>
                <a href="https://www.youtube.com/channel/UC2nfaz7gRu7EqkJZRT__3Rw/playlists?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                <img src={youtube} className="social-logos" id="youtube-logo" alt="youtube-logo" />
                </a>
                <a href="https://www.instagram.com/saicophonic.medicine/" target="_blank" rel="noopener noreferrer">
                <img src={instagram} className="social-logos" id="instagram-logo" alt="instagram-logo" />
                </a>
                <a href="https://open.spotify.com/user/pygtquli592t34f702bbvclbu?si=v0gdGE8BTtu10QWgt8C5PA" target="_blank" rel="noopener noreferrer">
                <img src={spotify} className="social-logos" id="spotify-logo" alt="spotify-logo" />
                </a>
                </div>
              </Row>

              <Row>
                <Navbar.Brand className="mx-auto parent footer-site-title">© 2020 Saicophonic Medicine</Navbar.Brand>
              </Row>
            </Col>
          </Container>
        </Navbar>
      </div>
    )
  }
}