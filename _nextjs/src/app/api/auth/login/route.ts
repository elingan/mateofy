import { redirect } from 'next/navigation'

function generateRandomString(length: number) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
};

export async function GET() {

  const clientId = process.env.SPOTIFY_CLIENT_ID!
  const redirectURI = process.env.SPOTIFY_REDIRECT_URI!

  const scope = "streaming user-read-email user-read-private"
  const state = generateRandomString(16)

  if (!clientId || !redirectURI) {
    throw new Error('Missing Spotify client ID or redirect URI')
  }

  const authQueryParameters = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectURI,
    state: state
  })

  redirect('https://accounts.spotify.com/authorize/?' + authQueryParameters.toString())
}