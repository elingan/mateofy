export default async function handler(request, response) {
  const access_token = request.cookies?.access_token
  if (!access_token) {
    return response.status(401).redirect('/')
  }

  const url = `https://api.spotify.com/v1/me/playlists`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const data = await res.json()
    let items = []

    if (data.items) {
      items = data.items.map((item) => {
        return {
          id: item.id,
          name: item.name,
          // image: item.images[0]?.url,>
          uri: item.uri
        }
      })
    }
    return response.json(items)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: 'Something went wrong' })
  }
}
