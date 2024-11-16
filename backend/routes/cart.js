import express from "express"
import { User } from "../models/user_model.js"
import { authenticatetoken } from "./userAuth.js"

export const cartRouter = express.Router()

// add to cart 
cartRouter.put("/add-cart",authenticatetoken, async(req,res) => {
     try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id)
        const isBookcart = userData.cart.includes(bookid)

        if(isBookcart) {
            return res.json({seccess:true,message:"Book is alrdeady in cart"})
        }

        await User.findByIdAndUpdate(id, {$push: {cart : bookid},})
        
        return res.status(200).json({success:true,message:"Book add to cart"})

     } catch (error) {
        return res.status(400).json({success:false,message:"Interenal server error"})
     }
})

// remove to cart 
cartRouter.put("/remove-cart/:bookid",authenticatetoken, async(req,res) => {
    try {
       const {bookid} = req.params;
       const {id} = req.params;

       await User.findByIdAndUpdate(id, {$pull: {cart : bookid},})
       
       return res.status(200).json({success:true,message:"Book remove from cart"})

    } catch (error) {
       return res.status(400).json({success:false,message:"Interenal server error"})
    }
})

// get cart of a particular user 
cartRouter.get("/get-cart",authenticatetoken, async(req,res) => {
    try {
       const {id} = req.headers;
       const userData = await User.findById(id).populate("cart")
       const cart = userData.cart.reverse()
       
       return res.status(200).json({success:true,cart})

    } catch (error) {
       return res.status(400).json({success:false,message:"Interenal server error"})
    }
})