export default function Track({ track, onSelect }) {
  function handleClick() {
    console.log('clicked')
    onSelect(track)
  }

  return (
    <div className='card bg-100 shadow-xl mb-4'>
      <figure className='rounded-md'>
        <img src={track.image} alt='Shoes' />
      </figure>
      <div className='card-body w-full bg-black bg-opacity-50 absolute bottom-0 p-2 flex-row justify-between'>
        <h2 className='card-title text-sm text-ellipsis'>{track.name}</h2>
        <div className='card-actions justify-end'>
          <button className='btn btn-circle btn-primary' onClick={handleClick}>
            <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24'>
              <g fill='none' stroke='currentColor' strokeWidth={1.5}>
                <path strokeLinecap='round' d='M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2'></path>
                <path
                  strokeDasharray='4 3'
                  strokeLinecap='round'
                  d='M12 22C6.477 22 2 17.523 2 12S6.977 2 12.5 2'
                  opacity={0.5}
                ></path>
                <path d='M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059z'></path>
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
    // <div className='flex items-center justify-center h-screen'>
    //   <h1 className='text-4xl font-bold'>{track.title}</h1>
    // </div>
  )
}
