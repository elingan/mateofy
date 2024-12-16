export async function getAccessToken() {
  const response = await fetch('/api/auth/token')
  if (!response.ok) {
    throw new Error('Failed to fetch token')
  }
  const { accessToken } = await response.json()
  return accessToken
}
