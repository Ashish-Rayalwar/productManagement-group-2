const  jwt  = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const validator = require("validator");
const userModel = require("../models/userModel");
require("dotenv").config()


const verifyToken = async (req,res,next)=>{

    try {
        let token = req.headers["authorization"]
     
    if(!token) return res.status(400).send({status:false,message:"Token is mandatory"})
    token = token.slice(7, token.length)

    if(token){
        let jwt_Secret_Key = process.env.JWT_SECRET_KEY
        jwt.verify(token, jwt_Secret_Key ,(err,tokenDetails)=>{
        if(err) return res.status(403).send({status:false,message:err.message})
        req.tokenDetails = tokenDetails
        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyToken", error.message)
    }
   
}



const verifyTokenAndAuthorization = async(req,res,next)=>{
    try {
        verifyToken(req,res,async()=>{
            let userId = req.params.userId;
            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
            if(req.tokenDetails.userId == userId){
                next()
            }else{
                res.status(403).send({status:false,message:"you are not authorized to perform this task"})
            }
        })
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyTokenAndAuthorization", error.message)
    }
}






module.exports = {verifyToken,verifyTokenAndAuthorization}