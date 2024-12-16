import { useEffect } from 'react'
import { useState } from 'react'
import Track from './Track'
import { getPlaylist } from '../services/playlists'
import Alert from './Alert'
import Playback from './Playback'

export default function Playlist() {
  const [tracks, setTracks] = useState([])
  const [error, setError] = useState()
  const [selectedTrack, setSelectedTrack] = useState()

  useEffect(() => {
    const playlistId = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID
    getPlaylist({ playlistId })
      .then(({ playlist, tracks }) => {
        // setPlaylist(playlist)
        setTracks(tracks)
      })
      .catch(({ message }) => {
        setError(message)
      })
  }, [])

  useEffect(() => {
    if (selectedTrack) {
      console.log('selected track:', selectedTrack)
    }
  }, [selectedTrack])

  return (
    <>
      {error && <Alert type='error'>{error}</Alert>}
      {selectedTrack && <Playback track={selectedTrack} />}
      {!selectedTrack && (
        <div className='p-4'>
          {tracks.map((track) => (
            <Track key={track.id} track={track} onSelect={setSelectedTrack} />
          ))}
        </div>
      )}
    </>
  )
}
