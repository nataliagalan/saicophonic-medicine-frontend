import React from 'react'
import LyricsCard from './LyricsCard'

export default function SongContainer(props) {
  // console.log(props, "songcontainer");
  return (
    <div>
      <LyricsCard {...props}/>
    </div>
  )
}
