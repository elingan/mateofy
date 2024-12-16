import PlayCircleIcon from './icons/play-circle.jsx'

export default function Track({ track, onSelect }) {
  function handleClick() {
    console.log('clicked')
    onSelect(track)
  }

  return (
    <div className='card bg-100 shadow-xl mb-4'>
      <figure className='rounded-md'>
        <img src={track.image} alt={track.name} />
      </figure>
      <div className='card-body w-full bg-black bg-opacity-75 absolute bottom-0 p-2 flex-row justify-between'>
        <h2 className='card-title text-sm overflow-hidden'>{track.name}</h2>
        <div className='card-actions justify-end'>
          <button className='btn btn-circle btn-gost ' onClick={handleClick}>
            <PlayCircleIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
