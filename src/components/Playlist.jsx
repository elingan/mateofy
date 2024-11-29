import { useEffect } from 'react'
import { useState } from 'react'
import Track from './Track'

export default function SpotifyWeb() {
  const [playlists, setPlaylists] = useState([])
  const [playlist, setPlaylist] = useState('5KzWdtfdZEsBHLp3VrmD6B')
  const [tracks, setTracks] = useState([])

  // useEffect(() => {
  //   async function getPlaylists() {
  //     const response = await fetch('/api/playlists')
  //     const playlists = await response.json()
  //     setPlaylists(playlists)
  //   }
  //   getPlaylists()
  // }, [])

  useEffect(() => {
    async function getTracks() {
      const response = await fetch(`/api/tracks?playlist=${playlist}`)
      const tracks = await response.json()
      console.log(tracks)
      setTracks(tracks)
    }
    if (playlist) {
      console.log(playlist)
      getTracks()
    }
  }, [playlist])

  async function handlePlaylist(id) {
    setPlaylist(id)
  }


  return (
    <div className='p-4 columns-2 gap-8'>
      {tracks.map((track) => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  )
}
