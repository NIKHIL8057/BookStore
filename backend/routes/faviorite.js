import express from "express"
import { User } from "../models/user_model.js"
import { authenticatetoken } from "./userAuth.js"

export const favrouter = express.Router()

// add book to favorite 
favrouter.put("/add-book-fav", authenticatetoken, async (req,res) => {
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id)
        const isBookfav = userData.favourites.includes(bookid)

        if(isBookfav) {
            return res.status(200).json({success:true,message:"Book is already in favourite"})
        }
        await User.findByIdAndUpdate(id, {$push: { favourites:bookid }})
        return res.status(200).json({success:true,message:"Book added to favourite"})

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// Delete book to favorite 
favrouter.put("/delete-book-fav", authenticatetoken, async (req,res) => {
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id)
        const isBookfav = userData.favourites.includes(bookid)

        if(isBookfav) {
            await User.findByIdAndUpdate(id, {$pull: { favourites:bookid }})
        }
        return res.status(200).json({success:true,message:"Book remove to favourite"})

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// get favorite books of a particular user 
favrouter.get("/get-book-fav", authenticatetoken, async (req,res) => {
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("favourites")
        const favouriteBook = userData.favourites

        return res.status(200).json({success:true,favouriteBook})

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})