// This file is used to get the token from the cookie and send it back to the client
export default async function handler(request, response) {
  const token = request.cookies?.access_token || ''
  return response.send(token)
}
