export async function GET(request: Request) {
  console.log('GET /api/auth/token', request.body)
  return Response.json({ access_token: 'access_token' })
}