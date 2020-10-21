import React, { Component } from 'react'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'

import ReactPlayer from 'react-player'

class VideoCard extends Component {
  render() {
    const { url } = this.props
    return (
      <>
        <ResponsiveEmbed aspectRatio="16by9">
          <ReactPlayer 
          width='100%'
          height='100%'
          url={url} />
        </ResponsiveEmbed>
      </>
    )
  }
}

export default VideoCard 