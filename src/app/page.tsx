// import Image from "next/image";

import SpotifyPlayback from '@/components/SpotifyPlayback'

export default function Home() {


  return (
    <main>
      <h1>Mateofy - Spotify Web Playback SDK Quick Start</h1>
      <ul>
        <li>Login</li>
        <li>Cover</li>
        <li>Playlist</li>
        <li>Music Player</li>
      </ul>
      <SpotifyPlayback />
    </main>
  )
}
