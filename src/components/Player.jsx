export default function Player({ track }) {
  return (
    <div className='flex items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>{track.name}</h1>
    </div>
  )
}
