// import { SignedOut, SignIn } from '@clerk/nextjs'

export default async function Home() {

  return (
    <main className="min-h-screen flex flex-col items-center p-8">
      <a className="btn-spotify" href="/api/auth/login" >
        Login with Spotify
      </a>
      {/* <SignedOut>
        <SignIn />
      </SignedOut> */}
    </main>
  )
}
