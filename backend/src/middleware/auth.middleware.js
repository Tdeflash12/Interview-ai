const jwt = require("jsonwebtoken");
const blackListTokenModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
    const bearerToken = req.headers.authorization;
    const tokenFromHeader = bearerToken && bearerToken.startsWith("Bearer ")
        ? bearerToken.slice(7)
        : bearerToken;
    const token = req.cookies?.token || tokenFromHeader || req.headers["x-access-token"] || req.body?.token;
    if(!token){
        return res.status(401).json({
            message:"Token not found. Send it as a cookie, Authorization header, x-access-token header, or token form field."
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