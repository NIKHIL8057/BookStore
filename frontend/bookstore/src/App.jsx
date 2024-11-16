import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Allbooks from './pages/Allbooks'
import Cart from './pages/Cart'
import ViewBookDetails from './components/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './Store/auth'
import Profile from './pages/Profile'
import Favourites from './components/Favourites'
import OrderHistory from './components/OrderHistory'
import Settings from './components/Settings'

const App = () => {

 const dispatch = useDispatch()
 const role = useSelector((state) => state.auth.role)

 useEffect(()=>{
    if(
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
 },[])
 
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/all-books' element={<Allbooks/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/all-books' element={<Allbooks/>}/>
        <Route path='/profile' element={<Profile/>}>
        <Route index element={<Favourites/>} />
        <Route path='/profile/orderhistory' element={<OrderHistory/>} />
        <Route path='/profile/settings' element={<Settings/>} />
        </Route>
        <Route path='/view-book-details/:id' element={<ViewBookDetails/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App