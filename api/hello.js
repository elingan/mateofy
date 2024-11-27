export default async function handler(request, response) {

  console.log(request.query); 

  return response.send(`Hello from ${process.env.VERCEL_REGION}!`)
}
