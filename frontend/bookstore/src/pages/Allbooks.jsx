import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader'
import BookCard from '../components/BookCard'
import axios from "axios"

const Allbooks = () => {

  const [Data,setData] = useState()

  useEffect(() => {
     const fetch = async () => {
     const response = await axios.get("http://localhost:5000/api/book/get-recent")
     setData(response.data)
     }
     fetch()
  }, [])

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
       <h1 className='text-3xl text-yellow-100'>All Books</h1>
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
      { !Data && 
        <div className='flex items-center justify-center my-8'>
        <Loader/>{" "}
        </div> 
      }
        { Data && 
            Data.map((items,index)=>
            <div key={index}>
                <BookCard data={items}/>{" "}
            </div>  )
        }
    </div>
    </div>
  )
}

export default Allbooks