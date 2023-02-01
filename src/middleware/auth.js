const  jwt  = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const validator = require("validator");
const userModel = require("../models/userModel");







const verifyToken = async (req,res,next)=>{

    let token = req.headers["authorization"]
    if(!token) return res.status(400).send({status:false,message:"Token is mandatory"})
    token = token.slice(7, token.length)
    console.log(token)

    // if(!validator.isJWT(token)) return res.status(400).send({status:false,msg:"Token is invalid"})

    if(token){

    jwt.verify(token, "group2project-5",(err,tokenDetails)=>{
        if(err) return res.status(403).send({status:false,message:err.message})
        req.tokenDetails = tokenDetails
        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
   
}



const verifyTokenAndAuthorization = async(req,res,next)=>{
    verifyToken(req,res,async()=>{
        let userId = req.params.userId;
      
        if(req.tokenDetails.userId == userId){
            next()
        }else{
            res.status(403).send({msg:"you are not authorized to perform this task"})
        }
    })
}






module.exports = {verifyToken,verifyTokenAndAuthorization}