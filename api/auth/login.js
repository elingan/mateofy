// This file is responsible for redirecting the user to the Spotify login page
function generateRandomString(length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export default async function handler(request, response) {
  console.log('/api/auth/login')
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI
  const state = generateRandomString(16)
  const scope = 'streaming user-read-private user-read-email'

  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  })

  return response.redirect(`https://accounts.spotify.com/authorize?${authQueryParameters.toString()}`)
}
