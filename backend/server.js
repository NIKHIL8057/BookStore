import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.js"
import { router } from "./routes/user.js"
import { bookrouter } from "./routes/book.js"
import { favrouter } from "./routes/faviorite.js"
import { cartRouter } from "./routes/cart.js"
import { orderRouter } from "./routes/order.js"
import cors from "cors"
 
const app = express()
dotenv.config()


const port = process.env.PORT || 3000

// Database Connection 
ConnectDB()
app.use(express.json())
app.use(cors())

// routers
app.use("/api/user",router)
app.use("/api/book",bookrouter)
app.use("/api/fav",favrouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/",(req,res)=>{
    res.send("Server is Ready...")
})

app.listen(port,()=>{
    console.log("Server is running Port ",port);
})
