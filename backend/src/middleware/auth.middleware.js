const jwt =require("jsonwebtoken")
const blackListTokenModel = require("../models/blacklist.model");

async function authUser(req,res,next){
    const token =req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Token Not Provided"
        })   
    }
    const isTokenBlacklisted=await blackListTokenModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is blacklisted. Please login again."
        })
    }
   try {
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
     req.user=decoded
     next()

   } catch (error) {
    return res.status(401).json({
        message:"Invalid Token."
    })
   }
}
module.exports={authUser}