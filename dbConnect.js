const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const URL = process.env.MONGO_URI;
const mongo_connect = async() =>{
    try{
        mongoose.connect("mongodb+srv://shaikmahiz56:shaikmahiz56@cluster0.wxmke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connected");
    }
    catch(e){
        console.log(e);
    }
}
module.exports = mongo_connect;