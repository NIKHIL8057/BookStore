import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  return (
    <div className='flex bg-zinc-800 text-white text-2xl items-center justify-between px-8 py-4'>
      <div className='font-semibold'>
        <h1>BookHeaven</h1>
      </div>
      <div className='flex gap-5 text-sm items-center'>
        <Link className='hover:text-blue-300 transition-all duration-300' to='/'><p>Home</p></Link>
        <Link className='hover:text-blue-300 transition-all duration-300' to='/all-books'><p>All Books</p></Link>

        {isLoggedIn && (
          <>
            <Link className='hover:text-blue-300 transition-all duration-300' to='/cart'><p>Cart</p></Link>
            <Link className='hover:text-blue-300 transition-all duration-300' to='/profile'><p>Profile</p></Link>
          </>
        )}
       { isLoggedIn === false && 
           <div className='flex gap-5'>
           {!isLoggedIn ? (
             <>
               <Link to='/login' className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300'>LogIn</Link>
               <Link to='/signup' className='px-2 py-1 border border-blue-500 rounded bg-blue-500 text-white hover:bg-white hover:text-black transition-all duration-300'>SignUp</Link>
             </>
           ) : (
             <Link to='/logout' className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-black transition-all duration-300'>LogOut</Link>
           )}
         </div>
       }
      </div>
    </div>
  )
}

export default Navbar
