export default async function handler(request, response) {
  return response.send(`Hello from ${process.env.VERCEL_REGION}!`)
}
