export async function getPlaylist({ playlistId }) {
  if (!playlistId) {
    throw new Error('No playlist ID provided')
  }

  const response = await fetch(`/api/playlist?id=${playlistId}`)
  if (!response.ok) {
    throw new Error('Failed to fetch playlist')
  }
  const { playlist, tracks } = await response.json()
  return { playlist, tracks }
  // setPlaylist(data.playlist)
  // setTracks(data.tracks)
  // setError(data.error)
}
