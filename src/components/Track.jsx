export default function Track({ track }) {
  return (
    <div className='card bg-100 card-compact shadow-xl mb-8'>
      <figure>
        <img src={track.image} alt='Shoes' />
      </figure>
      <div className='card-bodyw-full '>
        <h2 className='card-title'>{track.name}</h2>
        <div className='card-actions justify-end'>
          <button className='btn btn-primary'>Play</button>
        </div>
      </div>
    </div>
    // <div className='flex items-center justify-center h-screen'>
    //   <h1 className='text-4xl font-bold'>{track.title}</h1>
    // </div>
  )
}
