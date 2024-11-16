import express from "express"
import { books } from "../models/book.js"
import { User } from "../models/user_model.js"
import { authenticatetoken } from "./userAuth.js"

export const bookrouter = express.Router()

bookrouter.post("/add-book",authenticatetoken, async (req,res) => {
    try {
        const {id} = req.headers;
        const user = await User.findById(id)

        if(user.role !== "admin") {
            return res.status(400).json({success:false,message:"you are not having access to admin work"})
        }

        const book = new books ({
           url: req.body.url,
           title: req.body.title,
           author: req.body.author,
           price: req.body.price,
           desc: req.body.desc,
           language: req.body.language,
        })
        await book.save()

        return res.status(200).json({success:true,message:"Book add successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// update book 
bookrouter.put("/update-book",authenticatetoken, async (req,res) => {
    try {
        const { bookid } = req.headers;

        await books.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })

        return res.status(200).json({success:true,message:"Book update successfully"}) 

    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// delete book
bookrouter.delete("/delete-book",authenticatetoken,async (req,res) => {
    try {
        const {bookid} = req.headers;
        await books.findByIdAndDelete(bookid)
        return res.status(200).json({success:true,message:"Book delete successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// get all books
bookrouter.get("/get-books", async (req,res) => {
    try {
        const allbook = await books.find().sort({createdAt: -1})
        return res.status(200).json(allbook)
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// get recently add books
bookrouter.get("/get-recent",async (req,res) => {
    try {
        const recentlyBook = await books.find().sort({createdAt: -1}).limit(4)
        return res.status(200).json(recentlyBook)
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// get book by id
bookrouter.get("/get-book-id/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const bookid = await books.findById(id)
        return res.status(200).json(bookid)
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
    }
})