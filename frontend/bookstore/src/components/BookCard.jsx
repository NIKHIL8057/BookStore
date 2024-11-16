import React from 'react'
import { Link } from "react-router-dom"

const BookCard = ({data}) => {
  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
      <div className=' p-4 rounded flex flex-col'>
      <div className='bg-zinc-900 rounded items-center justify-center'>
        <img src={data.url} alt="/" className='h-[30vh]'/>
      </div>
      <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
      <p className='mt-2 text-zinc-400 font-semibold'>by {data.author}</p>
      <p className='mt-2 text-zinc-400 font-semibold text-xl'>{data.price} rs</p>
      </div>
      </Link> 
    </>
  )
}

export default BookCard
