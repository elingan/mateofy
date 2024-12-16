export default async function handler(request, response) {
  const access_token = request.cookies?.access_token
  if (!access_token) {
    return response.status(401).redirect('/')
  }

  const playlistId = request.query.id 

  try {
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    if (!res.ok) {
      return response.status(res.status).json({ error: 'Failed to fetch playlist' })
    }

    const data = await res.json()

    let playlist = {
      id: data.id,
      name: data.name,
      uri: data.uri,
      tracks: []
    }

    if (data.tracks) {
      playlist.tracks = data.tracks.items.map((item) => {
        return {
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists.map((_artist) => _artist.name).join(', '),
          image: item.track.album.images[0].url,
          preview_url: item.track.preview_url,
          uri: item.track.uri
        }
      })
    }
    return response.json(playlist)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: 'Something went wrong' })
  }
}
