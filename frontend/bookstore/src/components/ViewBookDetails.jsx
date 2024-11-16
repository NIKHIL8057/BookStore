import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import axios from "axios"
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ViewBookDetails = () => {

    const { id } = useParams()
    const [Data,setData] = useState()
    const isLogged = useSelector((state) => state.auth.isLoggedIn)
    const role = useSelector((state) => state.auth.role)
   

    useEffect(() => {
        const fetch = async () => {
        const response = await axios.get(`http://localhost:5000/api/book/get-book-id/${id}`)
        setData(response.data)
        }
        fetch()
     }, [])

     const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
      bookid: id,
    }

     const handleFav = async () => {
       const response = await axios.put("http://localhost:5000/api/fav/add-book-fav",{},{headers})
       alert(response.data.message)
     } 

     const handlecart = async () => {
       const response = await axios.put("http://localhost:5000/api/cart/add-cart",{},{headers})
       alert(response.data.message)
     }

  return (
     <>
     { Data &&     <div className='px-12 py-8 bg-zinc-900 flex gap-8'> 
      <div className='h-[88vh] w-3/6 flex items-center justify-center gap-8'>{" "}
     <div className='flex justify-around bg-zinc-800 p-8 rounded'>
     <img className='h-[70vh]' src={Data?.url} />
      { isLogged === true  &&
         <div className='flex md:flex-col p-5'>
         <button onClick={handleFav} className='bg-zinc-900 text-white rounded-full text-1xl p-2 hover:bg-white hover:text-black'>Favorite</button>
         <button onClick={handlecart} className='bg-zinc-900 text-white rounded-full text-1xl p-2 mt-4 hover:bg-white hover:text-black'>Cart</button>
      </div>
      } 
       { isLogged === true  && role === "admin" &&
         <div className='flex md:flex-col p-5'>
         <button className='bg-zinc-900 text-white rounded-full text-1xl p-2 hover:bg-white hover:text-black'>Edit</button>
         <button className='bg-zinc-900 text-white rounded-full text-1xl p-2 mt-4 hover:bg-white hover:text-black'>Delete</button>
      </div>
      } 
     </div>
      </div>
      <div className='p-4 w-3/6'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{Data?.title}</h1>
      <p className='text-zinc-400 mt-1'>{Data?.author}</p>
      <p className='text-zinc-500 mt-4 text-xl'>{Data?.desc}</p>
      <p className='flex items-center justify-center text-zinc-400 mt-4'>{Data?.language}</p>
      <p className='text-zinc-100 mt-4 text-3xl font-semibold'>Price : {Data?.price} rs</p>
      </div>
    </div> }
    { !Data && <div className='bg-zinc-900 h-screen flex items-center justify-center'><Loader/></div> }
     </>
  )
}

export default ViewBookDetails
