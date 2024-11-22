import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {

  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  const searchParams = new URLSearchParams(request.nextUrl.searchParams)
  const code = searchParams.get('code')

  const postResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(`code=${code}&redirect_uri=${redirectUri}&grant_type=authorization_code`)
  })

  const { access_token } = await postResponse.json()

  console.log('access_token', access_token)

  return Response.json({ access_token })
}