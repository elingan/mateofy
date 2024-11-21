'use client'

import { useEffect } from 'react'

export default function SpotifyWeb() {

  useEffect(() => {
    console.log('Spotify Web')

    const fetchSpotify = async () => {
      const response = await fetch('/api/spotify')
      const data = await response.json()
      console.log(data)
      // const response = await fetch('https://api.spotify.com/v1/me', {
      //   headers: {
      //     'Authorization': 'Bearer ' + ''
      //   }
      // })
      // const data = await response.json()
      // console.log(data)
    }

    fetchSpotify()
      .then(() => {
        console.log('Spotify Web')
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        console.log('Finally Spotify Web')
      })

  })

  return (
    <div>
      <h1>Spotify Web</h1>
    </div>
  )
}