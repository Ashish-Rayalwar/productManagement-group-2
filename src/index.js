const express = require("express")
const  mongoose  = require("mongoose")
mongoose.set('strictQuery', false);
require("dotenv").config()
const cors =require("cors")
const route = require("./routes/route.js")
const { dbconnection } = require("./database/db.js");

const multer = require("multer");
const PORT = process.env.PORT || 3000
const url = process.env.dbLink

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(multer().any())

app.use("/", route)


dbconnection(url)

app.listen(PORT ,()=>{
    console.log(`server start on port ${PORT}`);
})