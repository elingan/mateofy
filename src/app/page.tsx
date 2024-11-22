import SpotifyWeb from '@/components/spotify-web'
// import { SignedIn, UserButton } from '@clerk/nextjs'

export default async function Home() {

  return (
    <main className="flex flex-col items-center p-8">
      <SpotifyWeb />
    </main>
  )
}
