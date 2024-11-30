import './index.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Playlist from './components/Playlist'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Playback from './components/Playback.jsx'

function App() {
  const [token, setToken] = useState('')
  const [playlist, setPlaylist] = useState({})
  const [tracks, setTracks] = useState([])
  const [track, setTrack] = useState(undefined)

  // useEffect(() => {
  //   async function loading() {
  //     console.log('Loading...');
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     console.log('Loaded!')
  //   }
  //   loading()
  // })

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/api/auth/token')
      const token = await response.text()
      setToken(token)
    }
    getToken()
  }, [])

  useEffect(() => {
    async function getTracks() {
      const response = await fetch(`/api/playlist`)
      const playlist = await response.json()
      setPlaylist(playlist)
      setTracks(playlist.tracks)
    }
    getTracks()
  }, [token])

  useEffect(() => {
    console.log('Track:', track)
  }, [track])

  function renderPlayer() {
    if (tracks.length > 0 && track === undefined) {
      return <Playlist tracks={tracks} onSelect={setTrack} />
    } else if (track !== undefined) {
      return <Playback playlist={playlist.uri} track={track} token={token} />
    }
  }

  function renderBody() {
    if (token === '') {
      return <Login />
    } else {
      return (
        <div>
          <Navbar />
          {renderPlayer()}
        </div>
      )
    }
  }

  return <>{renderBody()}</>
}

export default App
