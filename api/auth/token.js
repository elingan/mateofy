/**
 * This file is used to get the token from the cookie and send it back to the client
 * @param {Request} request
 * @param {Response} response
 * @returns
 */
export default async function handler(request, response) {
  try {
    const accessToken = request.cookies?.access_token
    if (!accessToken) {
      return response.status(401).json({ error: 'No access token' })
    }
    return response.json({ accessToken })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ error: 'Something went wrong' })
  }
}
