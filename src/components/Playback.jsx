import { useState } from 'react'
import { useEffect } from 'react'
import PrevIcon from './icons/prev.jsx'
import NextIcon from './icons/next.jsx'
import PlayIcon from './icons/play.jsx'
import PauseIcon from './icons/pause.jsx'

export default function Playback({ track, playlist }) {
  const [currentTrack, setCurrentTrack] = useState(undefined)
  const [player, setPlayer] = useState(undefined)
  const [isPaused, setPaused] = useState(false)
  const [isActive, setActive] = useState(false)

  // useEffect(() => {
  //   const script = document.createElement('script')
  //   script.src = 'https://sdk.scdn.co/spotify-player.js'
  //   script.async = true

  //   document.body.appendChild(script)

  //   window.onSpotifyWebPlaybackSDKReady = () => {
  //     console.log('Spotify Web Playback SDK Ready')

  //     const spotifyPlayer = new window.Spotify.Player({
  //       name: 'Mateofy Web Playback',
  //       getOAuthToken: (cb) => {
  //         cb(token)
  //       },
  //       volume: 0.5
  //     })

  //     setPlayer(spotifyPlayer)

  //     spotifyPlayer.addListener('ready', async ({ device_id }) => {
  //       console.log('Ready with Device ID', device_id)
  //       // await fetch('/api/player', {
  //       //   method: 'POST',
  //       //   headers: {
  //       //     'Content-Type': 'application/json'
  //       //   },
  //       //   body: JSON.stringify({
  //       //     deviceId: device_id,
  //       //     playlist: playlist,
  //       //     track: track.uri
  //       //   })
  //       // })
  //     })

  //     spotifyPlayer.addListener('not_ready', ({ device_id }) => {
  //       console.log('Device ID has gone offline', device_id)
  //     })

  //     spotifyPlayer.addListener('player_state_changed', (state) => {
  //       if (!state) {
  //         return
  //       }

  //       console.log('Player State Changed', state)

  //       setCurrentTrack(state.track_window.current_track)
  //       // setPaused(state.paused)

  //       spotifyPlayer?.getCurrentState().then((state) => {
  //         !state ? setActive(false) : setActive(true)
  //       })
  //     })

  //     spotifyPlayer.connect()
  //   }
  // }, [])

  function handleNext() {
    console.log('Next Track')
    // console.log(player)
    // player.nextTrack()
  }

  return (
    <div
      className='hero'
      style={{
        backgroundImage: `url(${currentTrack?.album?.images[0].url})`
      }}
    >
      <div className='hero-overlay'></div>
      <div className='hero-content text-neutral-content w-full text-center absolute bottom-0'>
        <div className=''>
          <h2 className='text-lg font-bold'>{currentTrack?.name}</h2>
          <p className='mb-5 text-base'>{currentTrack?.artist}</p>
          <div className='flex gap-1'>
            <button
              className='btn btn-circle btn-lg'
              onClick={() => {
                player.previousTrack()
              }}
            >
              <PrevIcon />
            </button>
            <button className='btn btn-circle btn-lg btn-outline'
              onClick={() => {
                player.togglePlay()
              }}
            >
              {isPaused ? <PlayIcon /> : <PauseIcon />}
            </button>
            <button className='btn btn-lg btn-circle' onClick={handleNext}>
              <NextIcon className='w-20 h-20' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
