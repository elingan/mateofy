import { useEffect } from 'react'
import { useState } from 'react'
import Track from './Track'
import Player from './Player'

export default function SpotifyWeb({ tracks, onSelect }) {
  return (
    <div className='p-4 columns-2 gap-4'>
      {tracks.map((track) => (
        <Track key={track.id} track={track} onSelect={onSelect} />
      ))}
    </div>
  )
}
