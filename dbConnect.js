const { default: mongoose } = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const URL = process.env.MONGO_URI;
const mongo_connect = async() =>{
    try{
        mongoose.connect(URL);
    console.log("Connected");
    }
    catch(e){
        console.log(e);
    }
}
module.exports = mongo_connect;