import React, { Component } from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

class VideoCard extends Component {
  render() {
    return (
      <>
        <ResponsiveEmbed aspectRatio="16by9">
          <iframe src="https://www.youtube.com/embed/VEUe1J0c2k4" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
          </iframe>
        </ResponsiveEmbed>
      </>
    )
  }
}

export default VideoCard 