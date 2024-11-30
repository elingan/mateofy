import { useState } from 'react'
import { useEffect } from 'react'

export default function Playback({ track, playlist, token }) {
  const [currentTrack, setCurrentTrack] = useState(undefined)
  const [player, setPlayer] = useState(undefined)
  const [isPaused, setPaused] = useState(false)
  const [isActive, setActive] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'Mateofy Web Playback',
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume: 0.5
      })

      setPlayer(spotifyPlayer)

      spotifyPlayer.addListener('ready', async ({ device_id }) => {
        console.log('Ready with Device ID', device_id)
        await fetch('/api/player', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            deviceId: device_id,
            playlist: playlist,
            track: track.uri
          })
        })
      })

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
      })

      spotifyPlayer.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }

        console.log('Player State Changed', state)

        setCurrentTrack(state.track_window.current_track)
        setPaused(state.paused)

        spotifyPlayer?.getCurrentState().then((state) => {
          !state ? setActive(false) : setActive(true)
        })
      })

      spotifyPlayer.connect()
    }
  }, [])

  function handleNext() {
    console.log('Next Track');
    console.log(player);    
    
    player.nextTrack()
  }

  return (
    <div
      className='hero min-h-screen'
      style={{
        backgroundImage: `url(${currentTrack?.album?.images[0].url})`
      }}
    >
      <div className='hero-overlay'></div>
      <div className='hero-content text-neutral-content w-full text-center absolute bottom-0'>
        <div className=''>
          <h2 className='text-lg font-bold'>{currentTrack?.name}</h2>
          <p className='mb-5 text-base'>{currentTrack?.artist}</p>
          <div className='flex gap-4'>
            <button
              className='btn btn-circle btn-lg btn-primary'
              onClick={() => {
                player.previousTrack()
              }}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 20L9 12l10-8zM5 19V5'
                ></path>
              </svg>{' '}
            </button>
            <button
              className='btn btn-circle btn-lg  btn-primary'
              onClick={() => {
                player.togglePlay()
              }}
            >
              {isPaused ? (
                <svg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 24 24'>
                  <path
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m6 3l14 9l-14 9z'
                  ></path>
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 24 24'>
                  <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
                    <rect width={4} height={16} x={14} y={4} rx={1}></rect>
                    <rect width={4} height={16} x={6} y={4} rx={1}></rect>
                  </g>
                </svg>
              )}
            </button>
            <button
              className='btn btn-circle btn-lg  btn-primary'
              onClick={handleNext}
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='2em' height='2em' viewBox='0 0 24 24'>
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m5 4l10 8l-10 8zm14 1v14'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
