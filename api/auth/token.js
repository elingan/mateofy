/** @type {Request, Response}  */
export default async function handler(request, response) {
  const token = request.cookies?.access_token || ''
  return response.send(token)
}
