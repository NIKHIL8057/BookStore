import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

const Profile = () => {
  const [profile, setProfile] = useState(null)

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/getInfo", { headers })
        setProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white'>
      {!profile ? (
        <div className='w-full flex h-[100%] items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='w-full md:w-1/6'>
            <Sidebar data={profile} />
          </div>
          <div className='w-full md:w-5/6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
