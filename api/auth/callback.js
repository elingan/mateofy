// Callback endpoint for Spotify OAuth2.0
export default async function handler(request, response) {
  console.log('/api/auth/callback')
  
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI

  const code = request.query.code
  const state = request.query.state

  if (state === null) {
    return response.redirect('/?error=state_mismatch')
  }

  const authOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
    },
    body: new URLSearchParams({
      code: code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri
    })
  }

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', authOption)

  if (!tokenResponse.ok) {
    return response.redirect('/?error=token_retrieval_failed')
  }
  const jsonResponse = await tokenResponse.json()

  response.setHeader('Set-Cookie', [
    `access_token=${jsonResponse.access_token}; Path=/; HttpOnly; Secure; SameSite=None`,
    `refresh_token=${jsonResponse.refresh_token}; Path=/; HttpOnly; Secure; SameSite=None`,
    'miCookie=valor123; Path=/; Secure; SameSite=Strict'
  ])

  response.redirect('/')
}
