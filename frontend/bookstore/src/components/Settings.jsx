import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

const Settings = () => {

  const [Value,setValue] = useState({address: ""});
  const [ProfileData,setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5000/api/user/getInfo",{headers})
      setProfileData(response.data)
      setValue({ address: response.data.address })
    } 
    fetch();
  }, [])
  
  const change = (e) => {
    const { name , value } = e.target;
    setValue({...Value , [name]: value})
  }

  const submitAddress = async () => {
     const fetch = async () => {
       const response = await axios.put("http://localhost:5000/api/user/update-address",Value,{headers})
       alert(response.data.message)
     } 
     fetch();   
  }

  return (
    <>
      { ProfileData && (
         <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>Settings</h1>
          <div className='flex gap-12'>
           <div>
           <label htmlFor="">UserName</label>
           <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.username}</p>
           </div>
           <div>
           <label htmlFor="">Email</label>
           <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>{ProfileData.email}</p>
           </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor="">Address</label>
            <textarea className='p-2 rounded mt-2 font-semibold bg-zinc-800' value={Value.address} name="address" placeholder='Address' rows="5"
            onChange={change}></textarea>
           </div>
           <div className='mt-4 flex justify-end'>
           <button onClick={submitAddress} className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded'>
            Update
           </button>
           </div>
         </div>
      )}
    </>
  )
}

export default Settings