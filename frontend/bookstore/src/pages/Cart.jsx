import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cart/get-cart", { headers });

        setCartData(response.data.cart);
      } catch (err) {
        console.error("Error fetching cart data:", err);
      }
    };

    fetchCart();
  }, []);

  const deleteItem = async (bookid) => {
    const response = await axios.put("http://localhost:5000/api/cart/remove-cart", {bookid}, { headers })
    console.log(response.data)
  }
   
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
          {cartData.map((cart, index) => (
            <div className='bg-zinc-800 text-white w-full flex flex-col p-4 my-4 rounded md:flex-row justify-between items-center' key={index}>
              <img className='h-[20vh] md:h-[20vh] object-cover' src={cart.url} alt="" />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl font-semibold '>{cart.title}</h1>
                <p className='text-zinc-100 text-normal mt-2 hidden lg:block'>{cart.desc.slice(0, 100)}...</p>
                <p className='text-zinc-100 text-normal mt-2 hidden md:block lg:hidden'>{cart.desc.slice(0, 65)}...</p>
                <p className='text-zinc-100 text-normal mt-2 block lg:hidden'>{cart.desc.slice(0, 100)}...</p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='font-semibold text-2xl flex'>{cart.price} rs</h2>
                <button className='bg-red-100 p-2 ms-12 text-red-700 rounded' onClick={() => deleteItem(cartData._id)}>Remove Cart</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Cart;
