import express from "express"
import { User } from "../models/user_model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { authenticatetoken } from "./userAuth.js"

export const router = express.Router()

// sign up
router.post("/signup", async (req,res) => {
    try {
        const {username,email,password,address} = req.body;

        // chack username length more then 3 
        if(username.length < 4) {
           return res.status(500).json({success:false,message:"userName length should be greater then 3"})
        }

        // check username already exit 
        const existUsername = await User.findOne({username})

        if (existUsername) {
          return res.status(500).json({success:false,message:"userName already exist"})
        }

         // check email already exit 
         const existEmail = await User.findOne({email})

         if (existEmail) {
            return res.status(500).json({success:false,message:"Email already exist"})
         }
 
         const hashPassword = await bcrypt.hash(password,10)

       const newUser = new User({
        username:username,
        email: email,
        password:hashPassword,
        address:address,
       })

       await newUser.save()

       return res.status(200).json({success:true,message:"signUp successfully"})

    } catch (error) {
      return res.status(500).json({success:false,message:"Internal server error"})
    }
})

// sign in
router.post("/signin",async (req,res) => {
     try {
        const {username,password} = req.body;

        const existingUser = await User.findOne({username})
 
        if(!existingUser) {
           return res.status(400).json({success:false,message:"invalid credentials"})
        }
    
        await bcrypt.compare(password,existingUser.password,(err,data) => {
            if (data) {

               const authClaims = [
                  {name: existingUser.username},
                  {role: existingUser.role},
                  ]
                 const token = jwt.sign({authClaims},"bookStore123",{
                  expiresIn: "30d",
                 })
                 res.status(200).json({
                  success:true,
                  id:existingUser._id,
                  role: existingUser.role,
                  token: token,
               })
            } else {
                res.status(400).json({success:false,message:"invalid credentials"})
            }
        })
      
     } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error"})
     }
})

// get user infromation 
router.get("/getInfo",authenticatetoken, async (req,res) => {
   try {
      const {id} = req.headers;
      const data = await User.findById(id).select('-password');
      return res.status(200).json(data)
   } catch (error) {
      return res.status(500).json({success:false,message:"Internal server error"})
   }
})

// update address
router.put("/update-address",authenticatetoken, async (req,res) => {
    try {
      const {id} = req.headers;
      const {address} = req.body;
      await User.findByIdAndUpdate(id, {address} )
      return res.status(200).json({success:false,message:"Address update successfully"})
    } catch (error) {
      return res.status(500).json({success:false,message:"Internal server error"})
    }
})