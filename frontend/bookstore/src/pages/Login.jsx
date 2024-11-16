import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { authActions } from '../Store/auth'
import { useDispatch } from 'react-redux'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value,setValue] = useState({
    username:"",
    password:"",
  })

  const change = (e) => {
    const { name, value: inputValue } = e.target;
    setValue(prevValue => ({ ...prevValue, [name]: inputValue }));
  }

  const submit = async () => {
      try {
        
     if(value.username === "" || value.password === "") {
        alert("All fields are required")
     } else {
       const response = await axios.post("http://localhost:5000/api/user/signin",value)

       console.log(response.data)
      
       dispatch(authActions.login())
       dispatch(authActions.changeRole(response.data.role))
       localStorage.setItem("id",response.data.id)
       localStorage.setItem("token",response.data.token)
       localStorage.setItem("role",response.data.role)
       navigate("/profile") 
     }

      } catch (error) {
        alert(error.response.data.message)
      }
  }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
    <div className='bg-zinc-800 rounded-lg px-8 py-5'>
      <p className='text-zinc-200 text-xl'>Login</p>
      <div className='mt-4'>
        <div>
          <label className='text-zinc-400' htmlFor="">UserName</label>
          <input type="text" name='username' required
          value={value.username}
          onChange={change}
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
        </div>
      </div>
      <div className='mt-4'>
        <div>
          <label className='text-zinc-400' htmlFor="">Password</label>
          <input type="password" name='password' required 
          value={value.password}
          onChange={change}
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none'/>
          <div className='mt-4'>
        <button onClick={submit} className='w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-black hover:text-white transition-all duration-500'>Login</button>
        </div>
        <p className='flex mt-4 items-center justify-center font-semibold text-zinc-200'>Or</p>
        <p className="flex mt-4 items-center justify-center font-semibold text-zinc-200">Do not have an account ? 
          <Link className='hover:text-blue-500' to='/signup'> SignUp</Link>
        </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
