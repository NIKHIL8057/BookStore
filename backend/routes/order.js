import express from "express"
import { userOrder } from "../models/order.js"
import { User } from "../models/user_model.js"
import { books } from "../models/book.js"
import { authenticatetoken } from "./userAuth.js"

export const orderRouter = express.Router()

// place order
orderRouter.post("/place-order",authenticatetoken, async(req,res) => {
    try {
       const {id} = req.headers;
       const {order} = req.body;
    
       for(const orderData of order) {
        const newOrder = new Order({user: id, book: orderData._id})
        const orderDataDB = await newOrder.save()

        // saving order in userModel
        await User.findByIdAndUpdate(id, { $push: { order: orderDataDB._id }, })

        // clearing cart
        await User.findByIdAndUpdate(id, { $pull: { cart: orderDataDB._id }, })
       }
       
       return res.status(200).json({success:true,message: "Order place successfully"})

    } catch (error) {
       return res.status(400).json({success:false,message:"Interenal server error"})
    }
})

// get user history of a particular user
orderRouter.get("/get-order",authenticatetoken, async(req,res) => {
    try {
       const {id} = req.headers;
       const userData = await User.findById(id).populate({
        path : "order",
        populate: {path : "book"},
       })   

      const orderData = userData.orders.reverse()
      return res.status(200).json({success:true,orderData})

    } catch (error) {
       return res.status(400).json({success:false,message:"Interenal server error"})
    }
})

// get all orders --- admin
orderRouter.get("/get-all-order",authenticatetoken, async(req,res) => {
    try {
       const userData = await userOrder.find(id).populate({
        path : "book",
       }).populate({
         path: "user",
       }).sort({
        createdAt: -1
       });

       return res.status(200).json({success:true,userData})

    } catch (error) {
       return res.status(400).json({success:false,message:"Interenal server error"})
    }
})

// update order --- admin
orderRouter.put("/update-order/:id",authenticatetoken, async(req,res) => {
    try {
       const {id} = req.params;
       await userOrder.findByIdAndUpdate(id, {status: req.body.status})

       return res.status(200).json({success:true,message:"status updated successfully"})

    } catch (error) {
       return res.status(400).json({success:false,message:"Interenal server error"})
    }
})