export default async function handler(request, response) {
  response.setHeader('Set-Cookie', [
    `access_token=; Path=/; HttpOnly; Secure; SameSite=None`,
    `refresh_token=; Path=/; HttpOnly; Secure; SameSite=None`,
    'miCookie=; Path=/; Secure; SameSite=Strict'
  ])
  return response.redirect('/')
}
