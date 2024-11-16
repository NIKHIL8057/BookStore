import React from 'react'
import hero from "../assets/hero.png"

const Hero = () => {
  return (
    <div className='h-[75vh] flex'>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center'>
      <h1 className='text-6xl font-semibold text-yellow-100'>Discover Your Next Great Read</h1>
      <p className='mt-4 text-xl text-zinc-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi repudiandae at aperiam, totam sequi</p>
      <div className='mt-8'>
      <button className='text-yellow-100 text-2xl font-semibold border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover Books</button>
      </div>
      </div>
      <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
      <img src={hero} alt="" />
      </div>
    </div>
  )
}

export default Hero
