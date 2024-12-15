import './index.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Playlist from './components/Playlist'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Playback from './components/Playback.jsx'

function App() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()
  const [playlist, setPlaylist] = useState({})
  const [tracks, setTracks] = useState([])
  const [track, setTrack] = useState()

  // useEffect(() => {
  //   async function loading() {
  //     console.log('Loading...');
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     console.log('Loaded!')
  //   }
  //   loading()
  // })

  useEffect(() => {
    fetch('/api/auth/token')
      .then((response) => {
        if (!response.ok) {
          // handle error
          // throw new Error('Failed to fetch token')
        }
        return response.json()
      })
      .then((data) => {
        setToken(data.accessToken)
        setError(data.error)
      })
  }, [])

  useEffect(() => {
    if (!token) {
      return
    }
    fetch(`/api/playlist`)
      .then((response) => {
        if (!response.ok) {
          // handle error
          // throw new Error('Failed to fetch playlist')
        }
        return response.json()
      })
      .then((data) => {
        setPlaylist(data.playlist)
        setTracks(data.tracks)
        setError(data.error)
      })
  }, [token])

  useEffect(() => {
    if (!track) {
      return
    }
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
    if (!token) {
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
