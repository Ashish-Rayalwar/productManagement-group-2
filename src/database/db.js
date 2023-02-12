const { default: mongoose } = require("mongoose");




const dbconnection = async (url)=>{
    try {
     await mongoose.connect(url,{useNewUrlParser:true})
     console.log("Database connect");
    } catch (error) {
     console.log("error while db connection", error.message);
    }
 }

 module.exports = {dbconnection}