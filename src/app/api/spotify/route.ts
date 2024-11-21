import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'


async function fetchSpotifyAPI(endpoint: string, method: string, accessToken: string) {
  const url = `https://api.spotify.com/${endpoint}`
  const response = await fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify(body)
  })
  return await response.json()
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`)
  })

  const { access_token } = await response.json()
  return access_token
}

export async function GET() {

  const { getToken } = await auth()

  const token = await getToken()
  // console.log('token', token)

  if (!token) {
    return redirect('/')
  }

  try {

    const accessToken = await getAccessToken()
    console.log(accessToken)
    const endpoint = 'v1/me/top/tracks?time_range=long_term&limit=5'
    const spotifyResponse = await fetchSpotifyAPI(endpoint, 'GET', accessToken)
    console.log('spotifyResponse', spotifyResponse)
  } catch (error) {
    console.error(error)
  }




  // const clientId = process.env.SPOTIFY_CLIENT_ID
  // const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  // const redirectUri = process.env.SPOTIFY_REDIRECT_URI
  // console.log('clientId', clientId);


  return Response.json({ message: 'Hello Spotify' })
}