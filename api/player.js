export default async function handler(request, response) {
  const access_token = request.cookies?.access_token
  if (!access_token) {
    return response.status(401).redirect('/')
  }

  try {
    const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${request.body.deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      body: JSON.stringify({
        // device_ids: [request.body.deviceId],
        // play:true
        context_uri: request.body.playlist,
        offset: {
          uri: request.body.track
        }
      })
    })

    console.log(res);    

    if (res.status === 204) {
      return response.status(204)
    } 

    return response.status(204)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ error: 'Something went wrong' })
  }
}
