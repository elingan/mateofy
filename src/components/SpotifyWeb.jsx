import { useEffect } from 'react'
import { useState } from 'react'

export default function SpotifyWeb() {
  const [playlists, setPlaylists] = useState([])
  const [playlist, setPlaylist] = useState('')
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    async function getPlaylists() {
      const response = await fetch('/api/playlists')
      const playlists = await response.json()
      setPlaylists(playlists)
    }
    getPlaylists()
  }, [])

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

  function renderTracks() {
    return tracks.map((track) => (
      <li key={track.id}>
        <img src={track.image} alt={track.name} />
        <a href={track.preview_url}>{track.name}</a>
      </li>
    ))
  }

  return (
    <div>
      <h1>SpotifyWeb</h1>
      <div>
        {playlists.map((item) => (
          <button key={item.id} onClick={() => handlePlaylist(item.id)}>
            {item.name}
          </button>
        ))}
      </div>
      <hr />
      <ul>{renderTracks()}</ul>
      <hr />
      <a href='/api/auth/logout'>Logout</a>
    </div>
  )
}
