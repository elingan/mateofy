export default async function handler(request, response) {
  const access_token = request.cookies?.access_token
  if (!access_token) {
    return response.status(401).redirect('/')
  }

  const playlistId = request.query.playlist
  console.log({playlistId})

  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const data = await res.json()

    console.log(data)

    let tracks = []

    if (data.items) {
      tracks = data.items.map((item) => {
        return {
          id: item.track.id,
          name: item.track.name,
          // artist: item.track.artists[0].name,
          image: item.track.album.images[0].url,
          preview_url: item.track.preview_url,
          uri: item.track.uri
        }
      })
    }
    return response.json(tracks)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: 'Something went wrong' })
  }
}
