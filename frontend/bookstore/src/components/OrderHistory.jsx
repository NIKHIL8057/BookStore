import React, { useState,useEffect } from 'react'
import axios from 'axios';

const OrderHistory = () => {

  const [orderHistory,setOrderHistory] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
      const fetch = async () => {
        const response = await axios.get("http://localhost:5000/api/order/get-order",{headers});
        
        console.log(response.data)
      }
      fetch();
  }, [])
  

  return (
    <div>
      order
    </div>
  )
}

export default OrderHistory