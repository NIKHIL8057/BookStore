import jwt from "jsonwebtoken"

export const authenticatetoken = (req,res,next) => {
      const authHeader = req.headers["authorization"]
      const token = authHeader && authHeader.split(" ")[1];

      if (token == null) {
         return res.status(401).json({success:false,message:"Authentication token required"})
      }

      jwt.verify(token,"bookStore123",(err,user) => {
        if(err) {
            return res.status(403).json({success:false,message:"Token expired , please signin again"})
        }
        req.user = user;
        next();
      })
}

