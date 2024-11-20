import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from "react-router-dom"


const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [Total,setTotal] = useState(0);
  const navigate = useNavigate()

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/get-cart", { headers });
        setCartData(response.data.cart);
      } catch (err) {
        console.error("Error fetching cart data:", err.response?.data || err.message);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/remove-cart/${bookid}`,
        {}, 
        { headers }
      );
      alert("Item removed:", response.data);

      setCartData(cartData.filter((cart) => cart._id !== bookid));
    } catch (err) {
      alert("Error deleting item:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
     if(cartData && cartData.length > 0) {
      let total = 0;
      cartData.map((cart) => {
        total = total + cart.price;
      })
      setTotal(total);
      total = 0;
     }
  },[cartData])

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/place-order",
        { order: cartData },
        { headers }
      );
      
      alert(response.data.message);
      navigate("/profile/orderhistory")
    } catch (error) {
      alert(error.message);
    }
  };
  


  return (
    <div className='bg-zinc-900 px-12 h-[100%] py-8'>
      {!cartData && <Loader />}
      {cartData && cartData.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex justify-center items-center flex-col'>
            <h1 className='text-zinc-100 text-5xl lg:text-6xl fonst-semibold'>Empty Cart</h1>
          </div>
        </div>
      )}
      {cartData && cartData.length > 0 && (
        <>
          <h1 className='text-2xl font-semibold mb-5 text-white'>Your Cart</h1>
          {cartData.map((cart) => (
            <div
              className='bg-zinc-800 text-white w-full flex flex-col p-4 my-4 rounded md:flex-row justify-between items-center'
              key={cart._id}
            >
              <img className='h-[20vh] md:h-[20vh] object-cover' src={cart.url} alt={cart.title} />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl font-semibold'>{cart.title}</h1>
                <p className='text-zinc-100 text-normal mt-2 hidden lg:block'>
                  {cart.desc.slice(0, 100)}...
                </p>
                <p className='text-zinc-100 text-normal mt-2 hidden md:block lg:hidden'>
                  {cart.desc.slice(0, 65)}...
                </p>
                <p className='text-zinc-100 text-normal mt-2 block lg:hidden'>
                  {cart.desc.slice(0, 100)}...
                </p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='font-semibold text-2xl flex'>{cart.price} rs</h2>
                <button
                  onClick={() => deleteItem(cart._id)}
                  className='bg-red-100 p-2 ms-12 text-red-700 rounded'
                >
                  Remove Cart
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cartData && cartData.length > 0 && (
          <div className='mt-4 w-full flex items-center justify-end'>
            <div className='p-4 bg-zinc-800 rounded'>
              <h1 className='text-3xl text-zinc font-semibold'>Total Amount</h1>
              <div className='mt-3 flex items-center text-xl justify-between text-zinc-200'>
               <h2>{cartData.length} Books<h2>{Total} rs</h2></h2>
              </div>
              <div>
                <div className='w-[100%] mt-3'>
                 <button onClick={placeOrder} className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:text-white hover:bg-zinc-600 transition-all duration-300'
                 >
                  Place order
                 </button>
                </div>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default Cart;
